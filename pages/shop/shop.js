let cardShop = document.querySelector('.products__shop__card')
let btnCategory = document.querySelectorAll('.shop__category li')

let status = 'All'
btnCategory.forEach((el) => {
    el.addEventListener('click', () => {
        status = el.textContent
        getProductsShop()
    })
})

let getProductsShop = () => {
    cardShop.innerHTML = ''
    fetch('http://localhost:3000/products')
        .then((res) => res.json())
        .then((json) => {
            json.filter((el) => {
                if (status === 'All') {
                    return el
                } else if (status === el.category) {
                    return el
                }
            }).forEach((el) => {
                cardShop.innerHTML += `
                <div class="card">
            <button>${el.category}</button>
            <a href="../single/single.html#${el.id}">          
              <img src="../../${el.image}" alt="">
              </a>
            <h2>${el.title}</h2>
            <div class="card__bottom">
            <p><span class="old__price"><s>$20.00</s></span> $${el.price}.00 USD</p>
            </div>
            </div>
                `
            })
        })
}
getProductsShop()