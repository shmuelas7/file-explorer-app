
//require node modules
const url = require('url')
const path = require ('path')
const fs = require('fs')

//file imports
const buildBreadcumb = require('./breadcrumb.js')
const buildMainContent = require('./mainContent.js')
const getMineType = require('./getMineType.js')





let staticBasePath = path.join(__dirname, '..','static')

const respond =( request , response)=>{
    console.log("respond")

     

    let pathname = url.parse(request.url,true).pathname;

    if(pathname === '/favicon.ico'){
        return false;
    }

    pathname = decodeURIComponent(pathname)
    
    const fullStaticPath = path.join(staticBasePath,pathname)

    if(! fs.existsSync(fullStaticPath)){
        console.log(`${fullStaticPath} does not exist`)
        response.write('404: file not found')
        response.end()
        return
    }
    let stats
    try{
        stats = fs.lstatSync(fullStaticPath)
    }catch(err){
        console.log(`lastatSync Errore: ${err} `)
    }

    if(stats.isDirectory()){
        let data = fs.readFileSync(path.join(staticBasePath, '../project_files/index.html'),'utf-8')
        
        pathElement= pathname.split('/').reverse()
        pathElement = pathElement.filter(element => element !== '')
        let folderName = pathElement[0]
        if(folderName === undefined)
        folderName = 'Home'
        

        const breadcrumb = buildBreadcumb(pathname)

        const mainContent = buildMainContent(fullStaticPath, pathname)

        data = data.replace('page_title',folderName)

        data=data.replace('pathname',breadcrumb)
        data = data.replace('mainContent',mainContent)

        response.statusCode = 200
        response.write(data)
        return response.end()
    }
    if(!stats.isFile()){
        response.statusCode = 401
        response.write('401: Access denied! ')
        return response.end()
    }

    let fileDetails={}
    //get the file extension
    fileDetails.extname = path.extname(fullStaticPath)

    let stat
    try{
        stat = fs.statSync(fullStaticPath)
    }catch(err){
        console.log(`error: ${err}`)
    }

    fileDetails.size = stat.size

    getMineType(fileDetails.extname)
    .then(mine =>{
      // store headers here
      let head = {}
      let options ={}
      // response status code

      let statusCode = 200

      //set "content-Type" for all file types
      head['content-Type'] = mine

      //pdf file -> display in browser
      if(fileDetails.extname === '.pdf'){
          head['Content-Disposition'] = 'inline'
      }

      //audio / video file
      if(RegExp('audio').test(mine) || RegExp('video').test(mine)){
            head['Accept-Ranges'] = 'bytes'

          const range = request.headers.range
          if(range){
              const start_end = range.replace(/bytes=/,"").split('-')
              const start = parseInt(start_end[0])
              const end = start_end[1]? parseInt(start_end[1]):filesize - 1

    
              head[Content-Range] = `${stat}-${end}/${fileDetails.size}`
              head[Content-Length] =  end - start + 1
              statusCode = 206 
              //options
              options = {start, end}

          }


      }

      //reading the file using fs.readfile
      fs.promises.readFile(fullStaticPath, 'utf-8')
        .then( data =>{
                response.writeHead(statusCode, head)
                response.write(data)
                return response.end()
        })
        .catch(err =>{
            console.log(err)
            response.statusCode = 404
            response.write ('404: File reading error!')
            return response.end()
        })
        //streaming method
        const fileStream = fs.createReadStream(fullStaticPath,options)

        //stream chunks to your response object
        response.writeHead(statusCode,head)
        fileStream.pipe(response)

        //events
        fileStream.on('close',() =>{
            return response.end()
        })
        fileStream.on('error', error =>{
            console.log(error)
            response.statusCode = 404
            response.write ('404: FileStream error!')
            return response.end()
        })
    })
    .catch(err => {
        response.statusCode = 500
        response.write('500: Internal server errore!')
        console.log(`promise error: ${err}`)
        return response.end()

    })
}

module.exports = respond