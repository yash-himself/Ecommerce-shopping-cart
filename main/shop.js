
fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(json => {
        renderAll(json)


    });


let cartlen = localStorage.getItem('cartlen');

document.getElementById('cartlen').innerText=cartlen ;


function allFilter(){
    fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(json => {
       
        document.getElementById('itemContainer').innerHTML = '';
        renderAll(json);

    });
}


//=============================================================== RENDERING ALL PRODUCTS
function renderAll(data) {
    console.log(data)
    data.forEach(product => {

        // handeling cart counter on every render 
        if(!document.getElementById('cartlen').textContent>=1){
            document.getElementById('cartlen').style.display='none'
        }
        else{
            document.getElementById('cartlen').style.display='unset'
        }
        // rendering items 
        let title = product.title.slice(0, 40)
        let item = document.createElement('div');
        item.className = 'item'
        item.innerHTML = `
        <div height = "200px"><img width="170px" height="200px" src="${product.image}" alt="">
        </div>
         <div >
            <p class="title">${title}</p>
        </div>
        <div class="info">
                <p>Colors</p>
                <span>${product.rating.rate}⭐ </span>
                <span>$ ${product.price}</span>
            </div>
        <button class="cartbtn" onclick="addCart('${product.id}')" id ='${product.id}'>Add to Cart</button> `

        let box = document.getElementById('itemContainer')
        box.appendChild(item)


    });

}

//======================================================== ADD TO CART FUNCTIONALITY




function addCart(id) {
    let cart = JSON.parse(localStorage.getItem('cartItem'));
   
    !cart>=1?cart=[]:"";
    localStorage.setItem('cartlen',cart.length+1)
    cart.push(id)
    document.getElementById('cartlen').innerText=cart.length
    console.log(cart)
    localStorage.setItem('cartItem', JSON.stringify(cart));
    alert("Added to cart !")

    // handeling cart counter 
    if(!document.getElementById('cartlen').textContent>=1){
        document.getElementById('cartlen').style.display='none'
    }
    else{
        document.getElementById('cartlen').style.display='unset'
    }

}


let cartNav = document.getElementById('gotoCart');

cartNav.addEventListener('click', (e) => {
    e.preventDefault()

    window.location.href = "Cart.html"
})



//                 FILTER RESULTS FUNCTIONALITY =>


// ===================================================== RATING FILTER

function menFilter() {
    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(json => {
           
            let menData = json.filter((item) => item.category.charAt(0)=='m')
            document.getElementById('itemContainer').innerHTML = ''
            renderAll(menData)

        });


}

// ===================================================== RATING FILTER

function womenFilter() {
    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(json => {
            
            let womenData = json.filter((item) => item.category.charAt(0)=='w')
            document.getElementById('itemContainer').innerHTML = ''
            renderAll(womenData)

        });


}

// ===================================================== RATING FILTER

function electronicsFilter() {
    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(json => {

            let ecsData = json.filter((item) => item.category.charAt(0)=='e');
            document.getElementById('itemContainer').innerHTML = '';
            renderAll(ecsData);

        });


}





//====================================================SEARCHBAR FILTER

function searchResult(e) {

    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(json => {

            let searchInput = document.getElementById('search').value;
            searchInput.toLowerCase()
            console.log(searchInput)

            let searchData = json.filter((item) => item.title.toLowerCase().includes(searchInput))


            document.getElementById('itemContainer').innerHTML = ''
            renderAll(searchData)


        });

}


// ===================================================== RATING FILTER

function rangeResult() {
    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(json => {

            let rangeInput = document.getElementById('ratings').value;
            document.getElementById('thisRating').innerText=`${rangeInput}`
            let rangeData = json.filter((item) => item.rating.rate <= rangeInput)


            document.getElementById('itemContainer').innerHTML = ''
            renderAll(rangeData)


        });


}

//=============================================================== PRICE FILTER

function priceResult(e) {


    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(json => {


            let priceInput1 = document.getElementsByClassName('pricecheck')[0];
            let priceInput2 = document.getElementsByClassName('pricecheck')[1];
            let priceInput3 = document.getElementsByClassName('pricecheck')[2];
            let priceInput4 = document.getElementsByClassName('pricecheck')[3];
           
         

            if (priceInput1.checked == true) {
                // value is 0-50 so split into array to extract values 
                let priceneed = priceInput1.value.split('-')
                let priceData = json.filter((item) => item.price <= priceneed[1] && item.price>=priceneed[0])
                document.getElementById('itemContainer').innerHTML = ''
                renderAll(priceData)
            }

            else if (priceInput2.checked == true) {
                let priceneed = priceInput2.value.split('-')
                let priceData = json.filter((item) => item.price <= priceneed[1] && item.price>=priceneed[0])
                document.getElementById('itemContainer').innerHTML = ''
                renderAll(priceData)
            }

            else if (priceInput3.checked == true) {
                let priceneed = [50,100]
                let priceData = json.filter((item) => item.price <= priceneed[1] && item.price>=priceneed[0])
                document.getElementById('itemContainer').innerHTML = ''
                renderAll(priceData)
            }

            else if (priceInput4.checked == true){
                let priceData = json.filter((item) => item.price>=100)
                document.getElementById('itemContainer').innerHTML = ''
                renderAll(priceData)
            }
            else {
                
                document.getElementById('itemContainer').innerHTML = ''
                renderAll(json)
            }

        });
}




let menu = document.getElementById('menu')

menu.addEventListener('click',(e)=>{
e.preventDefault();
document.getElementById('navUl').style.display=='flex'?document.getElementById('navUl').style.display='none' : document.getElementById('navUl').style.display='flex';

})
