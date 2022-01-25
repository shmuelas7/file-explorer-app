const  fs = require("fs")
const path = require("path")


//require files
const calculateSizeD =  require('./calculateSizeD')
const calculateSizeF = require('./calculateSizeF')

const buildMainContent = (fullStaticPath,pathname) =>{
    let mainContent = ''
    let items ;
    // loop through the element inside the folder
    //name and link
    try{
        items = fs.readdirSync(fullStaticPath)
        console.log(items)
    }catch(err){
        console.log(`readdirSync error : ${err}`)
        return `<div> class="alert alert-danger">Internal Server Error</div>`
    }
    items.forEach(item => {

        //store item details in an object
        let itemDetails = {}
        //name
        itemDetails.name = item
        //link
        const link = path.join(pathname, item)

        //icon

        
        const itemFullStaticPath = path.join(fullStaticPath,item)
        try{
            itemDetails.stats = fs.statSync(itemFullStaticPath)
        } catch(err){
            console.log(`statSync error: ${err}`)
            mainContent = `<div class= "alert alert-danger">Internal server error</div>`
            return false
        }
        

        if(itemDetails.stats.isDirectory()){
            itemDetails.icon='<ion-icon name="folder"></ion-icon>'

          // [itemDetails.size , itemDetails.sizeByte] = calculateSizeD(fullStaticPath)
        }else if(itemDetails.stats.isFile()){
            itemDetails.icon='<ion-icon name="document"></ion-icon>'

            //[itemDetails.size , itemDetails.sizeByte] = calculateSizeF(itemDetails.stats)
        }

            //when was the file last change?(unix timestamp)
            itemDetails.timeStamp = parseInt(itemDetails.stats.mtimeMs)

            //conver timestamp to a data
            itemDetails.date = new Date(itemDetails.timeStamp)
            itemDetails.date = itemDetails.date.toLocaleString()
            console.log(itemDetails.Date)
        mainContent += `
        <tr data-name="${itemDetails.name}" data-size="${itemDetails.sizeByte}" data-tim="${itemDetails.timeStamp}">
            <td>${itemDetails.icon}<a href="${link}">${item}</a></td>
            <td>10m</td>
            <td>${itemDetails.date}</td>
        </tr>`
        
    });
    


    return mainContent
}

module.exports = buildMainContent