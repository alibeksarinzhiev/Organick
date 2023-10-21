let card = document.querySelector('.oneProduct')

fetch(`http://localhost:3000/products/${location.hash.slice(1)}`)
.then((res)=>res.json())
.then((json)=>{
    card.innerHTML +=`
    <div class="card__left">
    <img src="../../${json.image}" alt="">
</div>
    <div class="card__right">
    <h3>${json.title}</h3>
    <p>${json.description}</p>
    <h3>${json.price}</h3>
</div>
    `
})


