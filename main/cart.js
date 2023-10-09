
fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(json => renderCart(json));




function remove(id) {
    let cartItems = JSON.parse(localStorage.getItem('cartItem'));
    let ctItems = cartItems.filter(value => value != id)
    localStorage.setItem('cartlen', ctItems.length);
    localStorage.setItem('cartItem', JSON.stringify(ctItems));
    alert('Item has been Removed!')
    location.reload()

}

function empty() {
    let ctItems = []
    localStorage.setItem('cartItem', JSON.stringify(ctItems));
    localStorage.setItem('cartlen', 0);
    location.reload()

}


function renderCart(response) {

    let cartItems = JSON.parse(localStorage.getItem('cartItem'))

    let cartMap = new Map();
    for (let i = 0; i < cartItems.length; i++) {
        if (cartMap.has(parseInt(cartItems[i]))) {
            cartMap.set(parseInt(cartItems[i]), cartMap.get(parseInt(cartItems[i])) + 1)
        } else {
            cartMap.set(parseInt(cartItems[i]), 1)
        }

    }



    let totalPrice = 0;
    response.forEach((product) => {


        if (cartMap.has(product.id)) {

            let price = product.price * cartMap.get(product.id)
            let item = document.createElement('div')
            item.className = 'cartItem';
            item.innerHTML = `
                <img src="${product.image}">
                <p>Qty: ${cartMap.get(product.id)}</p>
                <p>Price: $${price}</p>
                <button class="removebtn" onclick="remove('${product.id}')"><img src='../utils/del.png'></button>
            
                `
            let cartBox = document.getElementById('cartBox')
            cartBox.appendChild(item);
            totalPrice += price;

        }

        let pricingBox = document.getElementById('pricingBox')
        pricingBox.innerHTML = `
            <button onclick="pay(${Number(totalPrice.toFixed(2))} )">Checkout</button>
            <p>Total Pricing:</p>
            <P>$${Number(totalPrice.toFixed(2))}</P>
            <button  onclick="empty()">Empty Cart</button>
            `

    })
    if (totalPrice == 0) {
        let line = document.createElement('div')
        line.className = 'cartItem';
        line.innerHTML = `<p>Hey!👋 Add Something, Your cart is empty..</p>`
        let cartBox = document.getElementById('cartBox')
        cartBox.appendChild(line);

    }





}

function pay(price) {
    var options = {
        key: "rzp_test_Oc93J3P85XpfGV", // Enter the Key ID generated from the Dashboard
        amount: price * 100,//check this out if this is paisa or INR // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "USD",
        name: "MyShop ",
        description: "Thank You for Choosing MeShop.", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        theme: {
            color: "#ff1f88",
        },
        image: "https://cdn-icons-png.flaticon.com/128/891/891419.png",
        handler: function () { // run a function when your payment is successfull
            empty()
            location.href = "./index.html";

        },
        options: {
            checkout: {
                method: {
                    netbanking: 1,
                    card: 1,
                    upi: 1,
                    wallet: 1,
                },
            },
        },
    };

    var rzpy1 = new Razorpay(options);
    rzpy1.open();
    //       // clear mycart - localStorage
    //       e.preventDefault();
};



//    responsive navbar functionalities 
let menu = document.getElementById('menu')

menu.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('navUl').style.display == 'flex' ? document.getElementById('navUl').style.display = 'none' : document.getElementById('navUl').style.display = 'flex';

})