if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
} else {
  ready();
}

function ready() {

  // Variable to removeCartItemButtons set to element class "btn-danger" 
  var removeCartItemButtons = document.getElementsByClassName("btn-danger");
  // Next we loop through variable removeCartItemButtons set to element class "btn-danger" with var i.  
  
  // loop through removeCartItemButtons varible with variable i. 
  for (var i = 0; i < removeCartItemButtons.length; i++){
    // Next we need to save whatever element class is pressed with variable button. 
    
    var button = removeCartItemButtons[i]
    // Next we need to set up a click event on variable button because this varible represents the specific button being
    // Pressed.  
    button.addEventListener('click', removeCartItem) 
  }
  // We grap all elements with a class of cart-quanity-input and hold them in a variable called quantityInputs.  

  var quantityInputs = document.getElementsByClassName('cart-quanity-input');
  // Next loop through quantityInputs with variable i
  
  for (var i = 0; i < quantityInputs.length; i++) {
    // Inside the loop we need to grap on to one 'cart-quanity-input' element and hold it in a varible.

    var input = quantityInputs[i]
    
    input.addEventListener('change', quantityChanged) 
  }
  
  // we create variable to hold all elements with a class of 'shop-item-button'.  
  
  var addToCartButtons = document.getElementsByClassName('shop-item-button');
  
  // For all addToCartButtons, loop through how many there them with i variable. 
  for (var i = 0; i < addToCartButtons.length; i++) {
    // Inside the loop we need to grap on to one 'shop-item-button' element and hold it in a variable.
    
    var button = addToCartButtons[i];
    // Then we add an event to that variable. So when it is clicked the event runs and the function addToCartClicked.
   
    button.addEventListener('click', addToCartClicked) 
  }
}

function removeCartItem(event){
  var buttonClicked = event.target
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal()
}

// What we wont to do when our quantity is changed. 
function quantityChanged(event) {
  // What we wont to do when our quantity is changed
  // First we get the quantity element and set it to the element we need 
  var input = event.target
  // Then we wont to check to see if the value inside the input is a valued value
  // First we check if it is a number and if the number is 1 or higher
  if (isNaN(input.value) || input.value <= 0 ) {
    // if so we wont to set our input value to 1
    input.value = 1 
  }
  // Then we wont to update the total inside out cart
  updateCartTotal();
}

function addToCartClicked(event) {
  var button = event.target
  //var shopItem = document.getElementsByClassName('shop-item');
  
   
  // The shop-items Div element class is right above it. 

  // First create a variable called shopItem. 
  // And the shop-item-button class which is inside the shop-item-details Div element. 
  // Set it to the variable button along with.  
  var shopItem = button.parentElement.parentElement
  // variable to get the element 'shop-item-title' and the first one with the text.   
  var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
  var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
  // Next we wont image source of our "shop-item" class. 
  
  var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
}


function addItemToCart(title, price, imageSrc) {
  // Next we need to create a cart row.

  // First we store cartRow into a variable. Then we set it to a new element which we will add to our html later. 
  
  var cartRow = document.createElement('div');
  // Next we wont to add this new element to the "cart-items" class. The first array
  
  cartRow.classList.add('cart-row');
  
  // We hold the "cart-items" class element in a variable called cartItems
  var cartItems = document.getElementsByClassName('cart-items')[0];
  // This is the content of our cartRow variable. 
  
  // First we store the contents in a variable and set it to a string. 
  var cartRowContents = ` 
    <div class="cart-item cart-column">
      <img class="cart-item-image" src="img/bbq-crunch.jpg"></img>
      <span class="cart-item-title">Bbq crunch</span>
    </div>
    <span class="cart-price cart-column">£1.99</span>
    <div class="cart-quantity cart-column"> 
      <input class="cart-quantity-input" type="number" value="1"></input>
      <button class="btn btn-danger" type="button">REMOVE</button>
    </div> `
  cartRow.innerHTML = cartRowContents 

  // Next we add the cartItems variable to the CartRow variable
  cartItems.append(cartRow);
  

}


// We really need it the price, name and image from our item




// We always want to round to 2 decimal places

function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName('cart-items')[0]
  var cartRows = cartItemContainer.getElementsByClassName('cart-row');
  var total = 0;
  // Loop through cartRows
  for (var i = 0; i < cartRows.length; i++){
    var cartRow = cartRows[i]
    var priceElement = cartRow.getElementsByClassName('cart-price')[0]
    var quanityElement = cartRow.getElementsByClassName('cart-quanity-input')[0]
    var price = parseFloat(priceElement.innerText.replace('$',''))
    var quanity = quanityElement.value
    total = total + (price * quanity)
  }
  total = Math.round(total * 100) / 100 
  document.getElementsByClassName('cart-total-price')[0].innerText = '£' + total 
}


 