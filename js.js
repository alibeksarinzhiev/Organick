import {addCart} from "./pages/cart/cart.js";

let cart = []


let cards = document.querySelector('.products__cards')
let showBtn = document.querySelector('.products__btnbox button')
let btncart = document.querySelector('.cart')
let cartshow = document.querySelector('.cartshow')
let closecart = document.querySelector('.image__exit img')
let cartTov = document.querySelector('.cart__tov')

let count = 8
showBtn.addEventListener('click', () => {
    if (count === 8) {
        count = 1000
        showBtn.textContent = 'Скрыть'
        getproducts()
    } else if (count === 1000) {
        count = 8
        getproducts()
    }

})

let getproducts = () => {
    cards.innerHTML = ''
    fetch('http://localhost:3000/products')
        .then((res) => res.json())
        .then((json) => {
            json.filter((el, idx) => {
                if (idx < count) {
                    return el
                }
            })
                .forEach((el) => {
                    cards.innerHTML += `
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
            let cartfunc = ()=>{
                cartTov.innerHTML = ''
                cart.forEach((el) => {
                    cartTov.innerHTML += `
                           <div class="content__cart">
                                <div class="bay__cart">
                                    <img src="${el.image}" alt="Name product">
                                    <h4>${el.category}</h4> 
                                    <p>${el.price}.00 USD</p>
                                </div>
                                <div class="text__cart__products">
                                    <h2>${el.title}</h2>
                                    <h3>${el.description}</h3>
                                    <button data-id=${el.id} class="deleteone">удалить</button>
                                    <div class="bay__cart-count">
                                    <button>-</button>
                                    <p>1</p>
                                    <button>+</button>
</div>
                                </div>
                           </div>
                           `
                })
                let alldelete = document.querySelectorAll('.deleteone')
                console.log(alldelete)
                Array.from(alldelete).forEach((item)=>{
                    item.addEventListener('click',()=>{
                        cart = cart.filter((one)=>{
                            console.log(cart)
                            return one.id !==+item.dataset.id
                        })
                        cartfunc()
                    })
                })

            }
            let addbtncart = document.querySelectorAll('.addcart')
            Array.from(addbtncart).forEach((item) => {
                item.addEventListener('click', () => {
                    cart = [...cart, json.find((one) => {
                        return one.id === +item.dataset.id
                    })]
                    cartfunc()
                })
            })
        })
}
getproducts()
btncart.addEventListener('click', () => {
    cartshow.classList.toggle('active')
    if (cart.length===0){
        cartTov.append('ваша корзина пуста')
    }
})
closecart.addEventListener('click', () => {
    cartshow.classList.toggle('active')
})





