//Treehouse Project 3

//Declare Global Variables
//---------------Used to keep track of input validity---------------//
let nameValid = false;
let emailValid = false;
let activitySelected = false;
let ccSelected = true;
let ccInfoValid = false;
let cvvValid = false;
let zipValid = false;

const $heartJs = $('#color option:gt(2)');
const $jsPuns = $('#color option:lt(3)');

//Hide payment options
const $creditCard = $('#credit-card');
const $paypal = $('div p:eq(0)');
$paypal.hide();
const $bitcoin = $('div p:eq(1)');
$bitcoin.hide();
//create and append validation messages to page
const nameError = $('<span class="error"> * Please Enter Your Name</span>');
$('label:eq(0)').append(nameError.hide());
const emailError = $('<span class="error"> * Please Enter Your Email</span>');
$('label:eq(1)').append(emailError.hide());
const emailReq = $('<span class="error"> * Email must be valid e.g.<em> johndoe@example.com</em></span>');
$('label:eq(1)').append(emailReq.hide());
const cboxError = $('<span class="cboxError"> * Please Select 1 or more Activities</span>');
$('.activities legend').append(cboxError.hide());
const ccNum = $('<span class="cc">* Please enter a credit card number</span>');
$('#credit-card div:eq(0)').append(ccNum.hide());
const ccReq = $('<span class="cc">* Number MUST be between 13-16 digits</span>');
$('#credit-card div:eq(0)').append(ccReq.hide());
const zipNum = $('<span class="cc">* Please enter a valid 5 digit ZIP code</span>');
$('#credit-card div:eq(1)').append(zipNum.hide());
const cvvNum = $('<span class="cc">* Please enter a valid 3 digit CVV</span>');
$('#credit-card div:eq(2)').append(cvvNum.hide());
$('<div class="clearfix"></div>').insertAfter('#credit-card div:eq(2)');


// const $button = $('button[type=submit]');
$('#payment option[value="credit card"]').attr("selected",true);
$('#payment option[value="select_method"]').attr("disabled",true);
//hide the colors div
$('#colors-js-puns').hide();
//Set focus onto '#name' input.
$('#name').focus();
//Create input for 'other' job selection, append to first fieldset and hide
$('#other-title').hide();
//create text box which contains total price
const totalPrice = $('<p>Total Price: $<span id="cost"></span></p>');
$('.activities').append(totalPrice.hide());

//add event listener to 'other' select and show if hidden, hide it again if changed
$('#title').on('change', (event) => {
  if(event.target.value === 'other'){
    $('#other-title').slideDown();
  } else {
    $('#other-title').slideUp();
  }
});

//Add event listener on design option. Only show colors depending on chosen design.
$('#design').on('change', (event) => {
  const $colors = $('#color option');
  $('#colors-js-puns').show();
  $('#color option').remove();
  //disable 'select design' to ensure choice is made
  $('#design option:eq(0)').attr("disabled",true);

  if(event.target.value === 'heart js'){
    $('#color').append($heartJs);
  } else if (event.target.value === 'js puns') {
    $('#color').append($jsPuns);
  }
});

const priceCalc = () => {
  let price = 0;
  //loop through checkbox, activity variable is default false, used to validate atleast 1 selected
  $('input[type=checkbox]').each(function(index){
      //if first is checked +200, any others will +100
      if($(this).is(':checked') && index === 0){
        price += 200;
        activitySelected = true;
      } else if ($(this).is(':checked')) {
        price += 100;
        activitySelected = true;
      }
      //if price is above 0 hide any error messages and show price else hide price
      if(price > 0){
        activitySelected = true;
        cboxError.hide();
        totalPrice.show();
      } else{
        activitySelected = false;
        totalPrice.hide();
      }
  });
  //set the text of #cost span to total price
  $('#cost').text(price);
};



//function to check if any of the activities are conflicting, will disable checkbox and add .conflict class if needed
const disableActivity = (inputClicked, cbox) => {
  //if input clicked is 1 && input is checked => disable 3
     //else if clicked && input isnt checked => enable 3
  if($(inputClicked).attr('name') === 'js-frameworks' && $(inputClicked).is(':checked')){
    $(cbox).eq(3).prop('disabled', true).parent().addClass('conflict');
  } else if ($(inputClicked).attr('name') === 'js-frameworks') {
    $(cbox).eq(3).prop('disabled', false).parent().removeClass('conflict');
  }
  //if input clicked is 3 && input is checked => disable 1
     //else if clicked && input isnt checked => enable 1
  if($(inputClicked).attr('name') === 'express' && $(inputClicked).is(':checked')){
    $(cbox).eq(1).prop('disabled', true).parent().addClass('conflict');
  } else if ($(inputClicked).attr('name') === 'express') {
    $(cbox).eq(1).prop('disabled', false).parent().removeClass('conflict');
  }
//if input clicked is 2 && input is checked => disable 4
   //else if clicked && input isnt checked => enable 4
   if($(inputClicked).attr('name') === 'js-libs' && $(inputClicked).is(':checked')){
     $(cbox).eq(4).prop('disabled', true).parent().addClass('conflict');
   } else if ($(inputClicked).attr('name') === 'js-libs') {
     $(cbox).eq(4).prop('disabled', false).parent().removeClass('conflict');
   }
//if input clicked is 4 && input is checked => disable 2
   //else if clicked && input isnt checked => enable 2
   if($(inputClicked).attr('name') === 'node' && $(inputClicked).is(':checked')){
     $(cbox).eq(2).prop('disabled', true).parent().addClass('conflict');
   } else if ($(inputClicked).attr('name') === 'node') {
     $(cbox).eq(2).prop('disabled', false).parent().removeClass('conflict');
   }
};

//add listener on inputs and call disableActivity func and priceCalc func
$('input[type=checkbox]').on('change', function(event){
  const cboxList = $('input[type=checkbox]');
  disableActivity(event.target, cboxList);
  priceCalc();
});

//click listener on payment option will hide the 2 payment types tha are not selected.
//We only want to validate the credit card inputs if credit card is selected. So the ccSelected variable will keep track of this
$('#payment').on('change', function(){
  if(this.value === 'credit card'){
    $creditCard.show();
    $bitcoin.hide();
    $paypal.hide();
    ccSelected = true;
  } else if (this.value === 'paypal') {
    $paypal.show();
    $bitcoin.hide();
    $creditCard.hide();
    ccSelected = false;
  } else if (this.value === 'bitcoin') {
    $bitcoin.show();
    $paypal.hide();
    $creditCard.hide();
    ccSelected = false;
  }
});

//checks that name input will be atleast 1 letter, upper or lowercase
function isValidName(name) {
  return /^[a-z A-Z]+$/.test(name);
}
//Listener on name input, calls isValidName to validate the input. nameValid variable will keep track of validation
//if false will show error message and set border to red, true will remove message and border = green
$('#name').on('focus input', function(event){
  if(isValidName(event.target.value)){
    $(this).css('borderColor', '#3EC300');
    nameError.hide();
    nameValid = true;
  } else{
    $(this).css('borderColor', '#F93943');
    nameError.show();
    nameValid = false;
  }
})
//checks that email input will be valid
function isValidEmail(email) {
  return /^[^@]+@[^@.]+\.[a-z]+$/.test(email);
}
//Listener on email input, calls isValidEmail to validate the input. emailValid variable will keep track of validation
//if false will show error message and set border to red, true will remove message and border = green
//If input is empty will show a different string to any invalid email.
$('#mail').on('focus input', function(event) {
  if(isValidEmail(event.target.value)){
    emailError.hide();
    emailReq.hide()
    emailValid = true;
    $(this).css('borderColor', '#3EC300');
  } else if (event.target.value === "") {
    emailError.show();
    emailReq.hide();
    emailValid = false;
    $(this).css('borderColor', '#F93943');
  } else {
    emailError.hide();
    emailReq.show();
    emailValid = false;
    $(this).css('borderColor', '#F93943');
  }
});

//3 functions to validate CC info, card number must be 13-16 digits, ZIP 5 digits, CVV 3 digits
function isValidCard(cardNumber) {
  return /^\d{13,16}$/.test(cardNumber);
}
function isValidZip(zipNumber) {
  return /^\d{5}$/.test(zipNumber);
}
function isValidCcv(ccvNumber) {
  return /^\d{3}$/.test(ccvNumber);
}

//listener on all credit card inputs, will call the relevant validation func. ccinfoValid, zipValid, cvvValid vars are used to keep track of whether numbers are valid
//Will set error messages if incorrect and give red borders. Green if entered correctly
//Credit card has 2 messages to give realtime form validation
$('#credit-card').on('focusin input', function(event){
  if(event.target.name === 'user_cc-num'){
    if(isValidCard(event.target.value)){
      $('#cc-num').css('borderColor', '#3EC300');
      ccNum.slideUp();
      ccReq.hide();
      ccInfoValid = true;
    } else  if(event.target.value === ''){
      $('#cc-num').css('borderColor', '#F93943');
      ccNum.slideDown();
      ccReq.slideUp();
      ccInfoValid = false;
    } else {
      $('#cc-num').css('borderColor', '#F93943');
      ccNum.slideUp();
      ccReq.slideDown();
      ccInfoValid = false;
    }
  }
  if(event.target.name === 'user_zip'){
    if(isValidZip(event.target.value)){
      $('#zip').css('borderColor', '#3EC300');
      zipNum.slideUp();
      zipValid = true;
    } else {
      $('#zip').css('borderColor', '#F93943');
      zipNum.slideDown();
      zipValid = false;
    }
  }
  if(event.target.name === 'user_cvv'){
    if(isValidCcv(event.target.value)){
      $('#cvv').css('borderColor', '#3EC300');
      cvvNum.slideUp();
      cvvValid = true;
    } else {
      $('#cvv').css('borderColor', '#F93943');
      cvvNum.slideDown();
      cvvValid = false;
    }
  }
});

//Listener on submit button. All of the validation variable will be checked here
//Any false variables will result in the relative error messages being called and the form will not submit
$('button[type=submit]').on('click', function(event){
  if(activitySelected === false || nameValid === false || emailValid === false){
    event.preventDefault();
  }
  if(activitySelected === false){
    cboxError.show();
  }
  if(nameValid === false){
    nameError.show();
    $('#name').css('borderColor', '#F93943');
  }
  if(emailValid === false){
    emailError.show();
    $('#mail').css('borderColor', '#F93943');
  }
  if(ccSelected === true){
    if(ccInfoValid === false){
      ccNum.slideDown();
      event.preventDefault();
      $('#cc-num').css('borderColor', '#F93943');
    }
    if(cvvValid === false){
      cvvNum.slideDown();
      event.preventDefault();
      $('#cvv').css('borderColor', '#F93943');
    }
    if(zipValid === false){
      zipNum.slideDown();
      event.preventDefault();
      $('#zip').css('borderColor', '#F93943');
    }
  }
});
