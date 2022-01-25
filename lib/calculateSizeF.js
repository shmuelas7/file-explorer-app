const {execSync} = require('child_process')

const calculateSizeF = stats =>{

    //size in bytes
    const filesizeBytes = stats.size

    const units = "BKMGT"

    
    const index = Math.floor(log10(filesizeBytes)/3)

    const filesizeHuman = (filesizeBytes/Math.pow(1000, index)).toFixed(1)

    const unit = units[index]

    filesize = `${filesizeHuman}${unit}`

    return [filesize,filesizeBytes]
}
module.exports = calculateSizeF