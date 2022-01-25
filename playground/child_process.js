const {execSync} = require('child_process')

try{
    const result = execSync(`du -v"/Users/shmue/Desktop/projects/file\ explorer\ app"`).toString()
    console.log(result)
}catch(err){
    console.log(`Error: ${err}`)
}