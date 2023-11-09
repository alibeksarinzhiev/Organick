let cart = []


let cards = document.querySelector('.products__cards')
let showBtn = document.querySelector('.products__btnbox button')
let btncart = document.querySelector('.cart')
let cartshow = document.querySelector('.cartshow')
let closecart = document.querySelector('.image__exit img')
let cartTov = document.querySelector('.cart__tov')
let countcart = document.querySelector('.countcart')
let itog = document.querySelector('.itog')
console.log(countcart)

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
            let cartfunc = () => {
                cartTov.innerHTML = ''
                cart.forEach((el) => {
                    cartTov.innerHTML += `
                           <div class="content__cart">
                                <div class="bay__cart">
                                    <img src="${el.image}" alt="Name product">
                                    <h4>${el.category}</h4> 
                                    <p>${el.price * el.countproduct}.00 USD</p>
                                </div>
                                <div class="text__cart__products">
                                    <h2>${el.title}</h2>
                                    <h3>${el.description}</h3>
                                    <button data-id=${el.id} class="deleteone">удалить</button>
                                    <div class="bay__cart-count">
                                    <button data-id=${el.id} class="countminus">-</button>
                                    <p>${el.countproduct}</p>
                                    <button data-id=${el.id} class="countplus">+</button>
                                </div>

                                </div>
                           </div>
                           `
                    itog.innerHTML = `
                    <div class="itogcen">Итоговая цена <span >${cart.reduce((acc, el, idx) => {
                        return acc + el.price * el.countproduct
                    }, 0)}</span></div>
                    `

                })

                let countplus = document.querySelectorAll('.countplus')
                Array.from(countplus).forEach((item) => {
                    item.addEventListener('click', () => {
                        cart = cart.map((one) => {
                            if (one.id === +item.dataset.id) {
                                return {...one, countproduct: one.countproduct + 1}
                            }
                            return one
                        })
                        console.log(cart)
                        cartfunc()
                    })
                })
                let countminus = document.querySelectorAll('.countminus')
                Array.from(countminus).forEach((item) => {
                    item.addEventListener('click', () => {
                        cart = cart.map((one) => {
                            if (one.id === +item.dataset.id) {
                                if (one.countproduct === 1) {
                                    return one
                                }
                                return {...one, countproduct: one.countproduct - 1}
                            }
                            return one
                        })
                        cartfunc()
                    })
                })

                let alldelete = document.querySelectorAll('.deleteone')
                console.log(alldelete)
                Array.from(alldelete).forEach((item) => {
                    item.addEventListener('click', () => {
                        cart = cart.filter((one) => {
                            console.log(cart)
                            return one.id !== +item.dataset.id
                        })
                        countcart.textContent = cart.length
                        cartfunc()
                    })
                })
            }
            let addbtncart = document.querySelectorAll('.addcart')
            Array.from(addbtncart).forEach((item) => {
                item.addEventListener('click', () => {
                    let find = json.find((one) => {
                        return one.id === +item.dataset.id
                    })
                    let pluscount = {...find, countproduct: 1}

                    cart = [...cart, pluscount]
                    countcart.textContent = cart.length
                    cartfunc()
                    console.log(cart)
                })
            })
        })
}
getproducts()
let textcount = document.createElement('p')
textcount.textContent = 'ваша корзина пуста'
btncart.addEventListener('click', () => {
    cartshow.classList.toggle('active')
    if (cart.length === 0) {
        textcount.textContent = 'ваша корзина пуста'
        cartTov.append(textcount)
    }
})
closecart.addEventListener('click', () => {
    cartshow.classList.toggle('active')
    textcount.innerHTML = ''
})







