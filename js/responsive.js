function openSlideMenu(){
  document.getElementById( 'side-menu' ).style.width='250px';
  //document.getElementById('main').style.marginLeft='250px';

}

function closeSlideMenu(){
  document.getElementById( 'side-menu' ).style.width='0';

  // document.getElementById('side-menu').style.width='250px';
} 



// when a user clicks the add to cart button we wont to run a function called openSideCart.
// set the width to 500.
// initaily set it to none in css.
// We have to add a click event to the (addToCart) button in html. onClick="openSideCart()"  