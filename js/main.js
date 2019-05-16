if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
} else {
  ready();
}

function ready() {

  // Remove Item from cart
  var removeCartItemButtons = document.getElementsByClassName("btn-danger");
  // check variable
  console.log(removeCartItemButtons);

  // We need to create a loop to loop through items. 
  for (var i = 0; i < removeCartItemButtons.length; i++){
    var button = removeCartItemButtons[i]
    button.addEventListener('click', removeCartItem) 
  }

  // When was change inside of the quanity it well update our total. 
  // Stop number's being inputted below 0
  var quantityInputs = document.getElementsByClassName('cart-quanity-input');
  // Loop through cart quanity input.
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i]
    // anytime the input changes in value
    input.addEventListener('change', quantityChanged) 
  }
  
  // we create variable to hold the element class for buttons 
  var addToCartButtons = document.getElementsByClassName('shop-item-button');
  // We loop through all the elements with a class shop-item-button with i variable
  for (var i = 0; i < addToCartButtons.length; i++) {
    // Then we create another variable for ONE button. 
    //and set it to addToCartButtons and variable i 
    var button = addToCartButtons[i];
    // Then we add an event to button variable. A click event and the function name. 
    button.addEventListener('click', addToCartClicked) 
  }
}

function removeCartItem(event){
  var buttonClicked = event.target
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal()
}

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
  // When the above event happens we need the image, name, price, quantity and the removel button 
  // Quantity is always going to be 1. The remove button is always going to be the remove button.
  
  // The shop-item-button class is inside the shop-item-details Div element. 
  // The shop-items Div element class is right above it. 

  // What we need to do is create a variable called shopItem.
  // Set it to the ONE button.  
  
  var shopItem = button.parentElement.parentElement 
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


 