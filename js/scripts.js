const divtoShow = 'nav .menu';
const divPopup = document.querySelector(divtoShow);
const divTrigger = document.querySelector('.m-trigger');
// section food
let tabs = document.querySelectorAll('.swiper-slideH');
let contents = document.querySelectorAll('.items');
// cart
let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');

let navToggle = document.querySelector('.mobile-only');
let navClose = document.querySelector('.nav__close');






// divTrigger.addEventListener('click', () => {
//     setTimeout(() => {
//         if(!divPopup.classList.contains('show')){
//             divPopup.classList.add('show');
//             document.body.classList.add('menu-visible')
//         }
//     }, 250);
// })

// document.addEventListener('click', (e) => {
//     const isClosest = e.target.closest(divtoShow);

//     if(!isClosest && divPopup.classList.contains('show')){
//         divPopup.classList.remove('show');
//         document.body.classList.remove('menu-visible')
//     }
// })

// ------ MENU SHOW
if(navToggle){
    navToggle.addEventListener('click' , () => {
        divPopup.classList.add('show')
    })
}

// ------- MENU HIDDEN
if(navClose){
    navClose.addEventListener('click', () => {
        divPopup.classList.remove('show')
    })
}

// - search
const sTrigger = document.querySelector('.s-trigger');
const addclass = document.querySelector('.site');
sTrigger.addEventListener('click', () => {
    addclass.classList.toggle('showsearch')
});



cartIcon.onclick = () => {
    cart.classList.add("active");
};

closeCart.onclick = () => {
    cart.classList.remove('active');
};

if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready();
}

let count = 0;
function ready(){
    var removeCartBtn = document.getElementsByClassName('cart-remove')
    console.log(removeCartBtn)
    for(var i=0; i<removeCartBtn.length; i++){
        var button = removeCartBtn[i]
        button.addEventListener('click', removeCartItem)
    }
    //Quantity change
    var quantityInputs = document.getElementsByClassName("cart-quantity");
    for(var i=0; i<quantityInputs.length; i++){
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }
    //Add To Cart
    
    var addCart = document.getElementsByClassName("AddToCart");
    for(var i=0; i<addCart.length; i++){
        var button = addCart[i];
        button.addEventListener('click', addCartClicked);
    }
    document.getElementsByClassName("btn-buy")[0].addEventListener("click", buyButtonClicked);
}

//Buy Button 
function buyButtonClicked(){
    alert("Your Order is placed");
    var cartContent = document.getElementsByClassName("cart-content")[0];
    while(cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
    document.querySelector(".number").innerText =0; 
    updatetotal();
}


//remove Item
function removeCartItem(event){
    var btnClicked = event.target;
    btnClicked.parentElement.remove();
    document.querySelector(".number").innerText --; 
    updatetotal();
}

//Quantity Changes
function quantityChanged(event){
    var input = event.target;
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }
    updatetotal();
}

//Add To Cart
function addCartClicked(event){
    var button = event.target;
    var shopProducts = button.parentElement.parentElement;
    console.log(shopProducts)
    var title = shopProducts.getElementsByClassName("titel-product")[0].innerText;
    var price = shopProducts.getElementsByClassName("current")[0].innerText;
    var buttons = event.target;
    var shopProduct = buttons.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.firstElementChild.getAttribute("src");
    console.log(shopProduct)
    // var image = shopProduct.getElementsByClassName("img-product").src;
    AddProductToCart(title, price, shopProduct);
    updatetotal();

    document.querySelector(".number").innerText ++; 
    
}

function AddProductToCart(title, price, image){
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
    
    for(var i = 0; i < cartItemsNames.length; i++){
        if(cartItemsNames[i].innerHTML == title){
            alert("You have already add this to cart");
            return;
        }
        
    }

    var cartBoxContent = `
                        <img src="${image}" alt="" class="cart-img">
                        <div class="detail-box">
                            <div class="cart-product-title">${title}</div>
                            <div class="cart-price">${price}</div>
                            <input type="number" value="1" class="cart-quantity">
                        </div>
                        <i class="ri-delete-bin-6-fill cart-remove"></i> `;
    cartShopBox.innerHTML = cartBoxContent
    cartItems.append(cartShopBox)
    cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener('click', removeCartItem)
    cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener('change', quantityChanged)
}




// update Total
function updatetotal(){
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;
    for(var i=0; i<cartBoxes.length; i++){
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        var price = parseFloat(priceElement.innerHTML.replace("$", ""));
        var quantity = quantityElement.value;
        total = total + price * quantity;
    }
    document.getElementsByClassName("total-price")[0].innerHTML = "$" + total;
     
}

// tabs
function openMenu(evt, menuName){
    var i, tabContent, tablinks;
    tabContent = document.getElementsByClassName("swiper-slide");
    for(i = 0; i < tabContent.length; i++){
        tabContent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("swiper-slideH");
    for(i = 0; i < tablinks.length; i++){
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(menuName).style.display = "block";
    evt.currentTarget.className += " active";
}

// let count = 0;

// const counter = document.getElementsByClassName("number");
// document.getElementsByClassName("AddToCart").addEventListener('click', event =>{
//     count++;
//     counter.innerText = count;
// });