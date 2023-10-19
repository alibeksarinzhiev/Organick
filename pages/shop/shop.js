let cardShop = document.querySelector('.products__shop__card')

let getProductsShop = ()=>{
    fetch('http://localhost:3000/products')
        .then((res)=>res.json())
        .then((json)=>{
            json.forEach((el)=>{
                cardShop.innerHTML+=`
                <div class="card">
            <button>${el.category}</button>
            <img src="${el.imagegi}" alt="">
            <h2>${el.title}</h2>
            <div class="card__bottom">
            <p><span>$20.00</span> $ ${el.price}.00</p>
            </div>
            </div>
                `
            })
        })
}
getProductsShop()