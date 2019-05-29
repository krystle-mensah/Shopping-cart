// We need to check IF the page is done loading

// if the document, the ready state is still loading
if (document.readyState == 'loading') {
  // what was want to do is add an event listerner to the document. 
  // This event well fire as soon as the page is done loading. 
  document.addEventListener('DOMContentLoaded', ready)
  // and if it is already done loading
} else {
  ready();
}

function ready() { 
  var removeCartItemButtons = document.getElementsByClassName("btn-danger"); //console.log(removeCartItemButtons);
  
  //For every removeCartItemButtons length loop through them with var i.  
  for (var i = 0; i < removeCartItemButtons.length; i++){
    // Next save element class is pressed in variable. 
    var button = removeCartItemButtons[i]
    
    // Next we need to set up a click event on that variable. Just the click motion.
    // The event listerner always returns an event object.
    // The event object is inside of the function being called
    button.addEventListener('click', removeCartItem)
  }  

  var quantityInputs = document.getElementsByClassName('cart-quantity-input'); //console.log(quantityInputs);
  // For every quantityInputs we loop through them with var i.
  
  for (var i = 0; i < quantityInputs.length; i++) {
    // Inside the loop we need to grap on to one 'cart-quantity-input' element and hold it in a varible.
    var input = quantityInputs[i]
    // Next we need to set up a 'change' event on that variable anytime the input changes
    input.addEventListener('change', quantityChanged) 
  }
  
  var addToCartButtons = document.getElementsByClassName('shop-item-button');
  // For all addToCartButtons, loop through how many there is with i variable.

  for (var i = 0; i < addToCartButtons.length; i++) {
    // Inside the loop we need to grap on to one element and hold it in a variable.
    
    var button = addToCartButtons[i];
    // Then we add a 'click' event to that variable. Because we wont to do something when we click on it. 
    // So when it is clicked the event runs and the function addToCartClicked.
   
    button.addEventListener('click', addToCartClicked)
    //button.addEventListener('click', saveCart) // console.log(saveCart);   
  }

  document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked);
}

function purchaseClicked(event) {
  // what we wont to do inside of this function is ALERT the user about there purchase
  alert('Thank you for your purchase');
  // Then we wont to delete all items in the cart

  var cartItems = document.getElementsByClassName('cart-items')[0];
  while(cartItems.hasChildNodes()){
    cartItems.removeChild(cartItems.firstChild)
  }
  updateCartTotal();
}

function removeCartItem(event) {
  // This event object has a property called target.
  // The event.target is esentailly what ever button we clicked on.
  // Next we hold that in a varible called buttonClicked
  // What we wont to do is get that cart row that button is inside.     
  var buttonClicked = event.target
  // we take our buttonClicked and the divison is in <div class="cart-quantity cart-column">.
  // Then we grap the hole row element <div class="cart-row"> then the remove() function. 
  buttonClicked.parentElement.parentElement.remove()
  // Now we call updateCartTotal 
  updateCartTotal();
  //saveCart();
}

// What we wont to do when our quantity is changed. 
function quantityChanged(event) {
  // What we wont to do when our quantity has changed
  // First we get the quantity element and set it to the element we need 
  var input = event.target
  // Then we wont to check to see if the value inside the input is a valued value
  
  // First we check if it is a number and if the number is 1 or higher
  if (isNaN(input.value) || input.value <= 0) {
    // if so we wont to set our input value to 1
    
    input.value = 1 
  }
  // Then we wont to update the total inside out cart
  
  updateCartTotal();
}

function addToCartClicked(event) {
  var button = event.target

  // When we click on the button we wont to add some elements to.

  // First create a variable called shopItem. 
  // And the shop-item-button class which is inside the shop-item-details Div element. 
  // Set it to the variable button along with.  
  var shopItem = button.parentElement.parentElement
  
  var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText //console.log(title);
  var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText // console.log(price);
  var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
  addItemToCart(title, price, imageSrc)
  updateCartTotal();
  //saveCart();
}

function addItemToCart(title, price, imageSrc) {
  // Next we need to create a cart row.

  // First we store cartRow into a variable. Then we set it to a new element which we will add to our html later. 
  
  var cartRow = document.createElement('div');
  cartRow.classList.add('cart-row');
  // Next we wont to add this new element to the "cart-items" class.
  var cartItems = document.getElementsByClassName('cart-items')[0];
  var cartItemNames = cartItems.getElementsByClassName('cart-item-title');
  for(var i = 0; i < cartItemNames.length; i++ ) {
    if(cartItemNames[i].innerText == title){
      alert('This item has already been added mate')
      return; 
    }
  }
  // This is the content of our cartRow variable. 
  
  // First we store the contents in a variable and set it to a string. 
  var cartRowContents = ` 
    <div class="cart-item cart-column">
      <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
      <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-price cart-column">${price}</span>
    <div class="cart-quantity cart-column"> 
      <input class="cart-quantity-input" type="number" value="1"></input>
      <button class="btn btn-danger" type="button">REMOVE</button>
    </div> `
  cartRow.innerHTML = cartRowContents 
  // Next we add the cartItems variable to the CartRow variable
  cartItems.append(cartRow);
  cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);
  cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged);
  //saveCart()
}


// What we wont to do in this function is go through every row. 
// We wont to find the price and multiply that by the quantity. Then add that together for every sinlge one of our rows.
// Then display it in our total

// First thing to do is get element class <div class="cart-items"> Because it raps all element classes called "cart-row"> 
// But we only want to get the first element in array

function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName('cart-items')[0] //console.log(cartItemContainer);
  // Inside of that cartItemContainer we want to get element by class name 'cart-row'
  // Using getElementsByClassName on an object cartItemContainer well only get the elements inside of that object that 
  // has this differant class then we set it to a varible 'cartRows'   
  var cartRows = cartItemContainer.getElementsByClassName('cart-row') //console.log(cartRows);
  var total = 0;
  for (var i = 0; i < cartRows.length; i++){
    var cartRow = cartRows[i]
    var priceElement = cartRow.getElementsByClassName('cart-price')[0] // console.log(priceElement);
    var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0] //console.log(quantityElement);
    // The actaul price text with the pound sign replace with empty string so we can do math on it. 
    var price = parseFloat(priceElement.innerText.replace('£','')) // console.log(price);
    // Value of input element. 
    var quantity = quantityElement.value //console.log(quantity);
    total = total + (price * quantity) //console.log(price * quantity);
  }
  total = Math.round(total * 100) / 100 
  document.getElementsByClassName('cart-total-price')[0].innerText = '£' + total 
}

//SAVING TO LOCAL STORAGE NOTES

// Create a cart object and save to variable
const shoppingCart = {
  key: 'javascript shopping cart',
  contents: [],
  init() {
    // check local storage and initialize the contents of shoppingCart.contents
    let _contents = localStorage.getItem(shoppingCart.key);
    if(_contents){
      shoppingCart.contents = JSON.parse(_contents);
    }else{
      // Dummy test data
      shoppingCart.contents = [
        {id: 1, title: 'Bbq crunch', qty: 50, itemPrice: 1.99},
        {id: 2, title: 'punchy protein', qty: 50, itemPrice: 1.50},
        {id: 3, title: 'dark Chocolate Cherry', qty: 50, itemPrice: 0.99}
      ];
      shoppingCart.sync();
    }
  },
  async sync(){
    let _cart = JSON.stringify(shoppingCart.contents);
    await localStorage.setItem(shoppingCart.key, _cart); 
  },
  find(id){
    // Find an item in the cart by its id
    let match = shoppingCart.contents.filter(item=>{
      if(item.id == id)
      return true;
    });
    if(match && match[0])
      return match[0];
  },
  add(id){
    // Add a new item to cart
    // check that it is not in the cart already
    if(shoppingCart.find(id)){
      shoppingCart.increase(id, 1);
    } else {
      let arr = PRODUCTS.filter(products=>{
        if(products.id == id){
          return true;

        }
      });
      if(arr && arr[0]){
        let obj = {
          id: arr[0].id,
          title: arr[0].title,
          qty: 1,
          itemPrice: arr[0].price
        };
        shoppingCart.contents.push(obj);
        // Update localstorage
        shoppingCart.sync();
      } else {
        // product id does not exist in product data
        console.error('Invalid Product');
      }
    }
  },
  increase(id, qty=1){
    //Increase the quantity of an item in the cart
    shoppingCart.contents = shoppingCart.contents.map(item =>{
      if(item.id === id){
        item.qty = item.qty + qty;
        return item;
      }
    });
    // update local storage
    shoppingCart.sync()
  },
  reduce(id, qty=1) {
    //reduce the quantity of an item in the cart
    shoppingCart.contents = shoppingCart.contents.map(item => {
      if(item.id === id && item.qty === 0){
        item.qty = item.qty - qty;
        return item;
      }
    });
    shoppingCart.contents.forEach(async item => {
      if(item.id === id && item.qty === 0){
        shoppingCart.remove(id);
      }
    });
    shoppingCart.sync()
  },
  remove(id){
    // remove an item entirely from the shoppingCart.contents based on it id
    shoppingCart.contents = shoppingCart.contents.filter(item => {
      if(item.id !== id){
        return true;
      }
    });
    //update localstorage
    shoppingCart.sync() 
  },
  empty(){
    // Empty whole cart
    shoppingCart.contents = [];
    // update localstorage
    shoppingCart.sync()
  },
  sort(field='title'){
    //sort by field - title, price
    //return a sorted shallow copy of the CART.contents array
    let sorted = shoppingCart.contents.sort( (a, b)=>{
        if(a[field] > b[field]){
            return 1;
        }else if(a[field] < a[field]){
            return -1;
        }else{
            return 0;
        }
    });
    return sorted;
    //NO impact on localStorage
  },
  logContents(prefix){  
    console.log(prefix, shoppingCart.contents)
  }
};

