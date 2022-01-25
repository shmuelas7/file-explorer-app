const path = require("path");

const buildBreadcrumb = pathname => {
    const pathChunks= pathname.split('/').filter(elment => elment!=='')

    let breadcrumb = `<li class="breadcrumb-item">
                        <a href="/">home</a>
                     </li>`
    let link = '/'
    pathChunks.forEach((item,index) => {
        link = path.join(link,item)
        if(index !== pathChunks.length - 1 ){
            breadcrumb += `<li class="breadcrumb-item">
                            <a href="${link}">${item}</a>
                        </li>`
        }else{
            breadcrumb += `<li class="breadcrumb-item active" aria-current="page">${item}</li>`
        }
    });
    return breadcrumb
}

module.exports= buildBreadcrumb