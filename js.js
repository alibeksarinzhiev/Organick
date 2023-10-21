let cards = document.querySelector('.products__cards')
let showBtn = document.querySelector('.products__btnbox button')


let count = 8
showBtn.addEventListener('click',()=>{
if (count === 8){
    count = 1000
    showBtn.textContent='Скрыть'
    getproducts()
}else if (count ===1000){
    count=8
    getproducts()
}

})

let getproducts = ()=>{
    cards.innerHTML = ''
    fetch('http://localhost:3000/products')
        .then((res)=>res.json())
        .then((json)=>{
            json.filter((el,idx)=>{
                if (idx<count){
                    return el
                }
            })
                .forEach((el)=>{
                cards.innerHTML+=`
                <div class="card">
            <button>${el.category}</button>
            <img src="${el.image}" alt="">
            <h2>${el.title}</h2>
            <div class="card__bottom">
            <p><span class="old__price"><s>$20.00</s></span> $${el.price}.00 USD</p>
            
            </div>
            </div>
                `
            })
        })
}
getproducts()
