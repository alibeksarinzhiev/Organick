import {addCart} from "./pages/cart/cart.js";
let cart = []



let cards = document.querySelector('.products__cards')
let showBtn = document.querySelector('.products__btnbox button')
let btncart = document.querySelector('.cart')
let cartshow = document.querySelector('.cartshow')
let closecart = document.querySelector('.cartshow h1')

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
<a href="pages/single/single.html#${el.id}">
  <img src="${el.image}" alt="">
</a>
          
            <h2>${el.title}</h2>
            <div class="card__bottom">
            <p><span class="old__price"><s>$20.00</s></span> $${el.price}.00 USD</p>
            </div>
            <button data-id=${el.id} class="addcart">Купить</button>
            </div>
                `

            })
            let addbtncart = document.querySelectorAll('.addcart')
            Array.from(addbtncart).forEach((item)=>{
                item.addEventListener('click',()=>{
                   cart = [...cart,json.find((one)=>{
                       return one.id === +item.dataset.id
                   })]
                    console.log(cart)

                })
            })

        })
}
getproducts()
btncart.addEventListener('click',()=>{
cartshow.classList.toggle('active')
})
closecart.addEventListener('click',()=>{
    cartshow.classList.toggle('active')
})


