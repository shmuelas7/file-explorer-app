const https = require('https')

const minURL= 'https://gist.githubusercontent.com/AshHeskes/6038140/raw/27c8b1e28ce4c3aff0c0d8d3d7dbcb099a22c889/file-extension-to-mime-types.json'


const getMineType = extension =>{
    return new Promise((resolve, reject)=> {
        https.get(minURL, response =>{
            if(response.statusCode < 200 || response.statusCode >299){
                reject(`Error: Failed to load mine types json file:${response.statusCode}`)
                console.log(`Error: Failed to load mine types json file:${response.statusCode}`)
                return false
            }

            let data = ''

            
            response.on ('data', chunk => {
                data += chunk
            })

            response.on('end', ()=>{
                resolve(JSON.parse(data)[extension])
            })

        }).on('error', (e)=> {
            console.error(e)
        })
    })

}
module.exports = getMineType