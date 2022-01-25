

const children = $('tbody').children()

//convert children to an array
let children_array = []
for (let i =0; i < children.length; i++){
    children_array.push(children[i])
}

const items =[]
children_array.forEach(element =>{

    const rowDetails = {
        name: element.getAttribute('data-name'),
        size: parseInt(element.getAttribute('data-size')),
        time: parseInt(element.getAttribute('data-time')),
        html: element.outerHTML
    }
    items.push(rowDetails)
})

// order status
const sortStatu= {
    name:'none',
    size:'none',
    time:'none'
}

const sort = (items,options,type) =>{
    
    items.sort((item1, item2)=>{
        let value1 , value2
        if(type === 'name'){
             value1 = item1.name.toUpperCase()
             value2= item2.name.toUpperCase()
        }else if(type === 'size'){
            value1 = item1.size
            value2= item2.size

                }else if(time){
                    value1 = item1.time
                    value2= item2.time
                }

            if(value1 < value2){
                return -1
            }
            if(value1 > value2){
                return 1
            }
            //eqwal value
            return 0
    })
    if(options === 'down'){
        items.reverse()
    }
}


    const sort_name_down = items =>{
        sort_name_up(items)
        items.reverse()
    }

    //fill table
    const fill_table_body = items =>{
        const content  = items.map(element =>element.html).join('')
        $('tbody').html(content)
    }

    //event listeners
    document.getElementById('table_head_row').addEventListener('click', event=>{
        if(event.target){
            //clear icons
            $('ion-icon').remove()
                if(['none', 'down'].includes(sortStatu[event.target.id]) ){
                    //sort in ascending order
                    sort(items, 'up',event.target.id)
                    sortStatu[event.target.id] = 'up'
                    //add icon
                    event.target.innerHTML += '<ion-icon name="arrow-up-outline"></ion-icon>'
                }
                else if(sortStatu[event.target.id] === 'up'){
                    //sort in descending order
                    sort(items, 'down',event.target.id)
                    sortStatu[event.target.id] = 'down'
                    //add icon
                    event.target.innerHTML += '<ion-icon name="arrow-down-outline"></ion-icon>'
                }
                fill_table_body(items)
        }
    })



        


