
let card = document.querySelector('.one__product')

fetch(`http://localhost:3000/products/${location.hash.slice(1)}`)
    .then((res)=>res.json())
    .then((json)=>{
        card.innerHTML +=`
   <div class="box__img">
                    <img src="../../${json.image}" alt="">
                </div>
                <div class="right__box">
                    <div class="right__top">
                        <h2>${json.title}</h2>
                        <h3><s class="pay">$20.00</s> $${json.price}.00 USD</h3>
                        <p>${json.description}</p>
                    </div>
                    <div class="right__bottom">
                        <h3>Quantity :</h3>
                        <button class="1button">1</button>
                        <button class="2button">Add To Cart</button>
                    </div>
                </div>
    `
    })



