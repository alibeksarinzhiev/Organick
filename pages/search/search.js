let box = document.querySelector('.box')
let input = document.querySelector('input')
let btn = document.querySelector('button')


let getAll = ()=>{
box.innerHTML =''
    fetch(`http://localhost:3000/products`)
        .then((res)=>res.json())
        .then((json)=>{
            json.filter((el)=>{
                if (el.title.toLocaleLowerCase().split(' ').includes(input.value.toLocaleLowerCase())){
                    return el
                }
            }).forEach((el)=>{
                box.innerHTML+=`
                <h2>${el.title}</h2>
                `
            })
            btn.addEventListener('click',()=>{
                getAll()
            })
        })
}


getAll()

