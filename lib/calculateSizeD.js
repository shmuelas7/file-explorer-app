const {execSync} = require('child_process')

const calculateSizeD = itemFullStaticPath =>{

    const itemFullStaticPathCleand = itemFullStaticPath.replace(/\s/g, '\ ')

    const commandOutput = execSync(`du -v"${itemFullStaticPathCleand}"`).toString()

    console.log(commandOutput)
    //remove spaces, tabs etc
    const filesize = commandOutput.replace(/\s/g, '')
    //split filesize uising the '/' separator
    filesize = filesize.split('/')

    //humen size is the first item of the array
    filesize = filesize[0]
    console.log(filesize)

    //uint
    const filesizeUnit = filesize.replace(/\d|\./g,'')
    console.log (filesizeUnit)

    //size number

    const filesizeNumber =parseFloat(filesize.replace(/[a-z]/i,''))
    console.log(filesizeNumber)

    const units = "BKMGT"

    const filesizeBytes = filesizeNumber * Math.pow(1000, units.indexOf(filesizeUnit)) 
    return [filesize,filesizeBytes]
}
module.exports = calculateSizeD