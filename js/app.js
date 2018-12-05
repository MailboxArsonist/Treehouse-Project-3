//Treehouse Project 3

//Declare Global Variables
const $heartJs = $('#color option:gt(2)');
const $jsPuns = $('#color option:lt(3)');
const $creditCard = $('#credit-card');
const $paypal = $('div p:eq(0)');
$paypal.hide();
const $bitcoin = $('div p:eq(1)');
$bitcoin.hide();

//Set focus onto '#name' input.
$('#name').focus();

//Create input for 'other' job selection, append to first fieldset and hide
const jobOther = $('<input type="text" id="other" name="job_role" placeholder="Your Job Role">');
$('fieldset:first-of-type').append(jobOther.hide());

//add event listener to 'other' and show page if hidden, hide it again if changed

$('#title').on('change', (event) => {
  if(event.target.value === 'other'){
    jobOther.slideDown();
  } else {
    jobOther.slideUp();
  }
});

//hide the colors div
$('#colors-js-puns').hide();

//select the t shirts add event listener
//create 2 variables, 1 with each type of design


$('#design').on('change', (event) => {
  const $colors = $('#color option');
  $('#colors-js-puns').show();
  $('#color option').remove();
  if(event.target.value === 'heart js'){
    $('#color').append($heartJs);
  } else if (event.target.value === 'js puns') {
    $('#color').append($jsPuns);
  }
});

//if its select theme call error message

//create taxt box which contains total price
const totalPrice = $('<p>Total Price: <span id="cost"></span></p>');
$('.activities').append(totalPrice);

//loop through all cbox
  //declare price
  //if 0 is selected price +200
  //if i is selected + 100
  //add to span #cost
const priceCalc = () => {
  let price = 0;

  $('input[type=checkbox]').each(function(index){

      if($(this).is(':checked') && index === 0){
        price += 200;
      } else if ($(this).is(':checked')) {
        price += 100;
      }
  });

  $('#cost').text(price);
};



const disableActivity = (inputClicked, cbox) => {
  //if input clicked is 1 && input is checked => disable 3
     //else if clicked && input isnt checked => enable 3
  if($(inputClicked).attr('name') === 'js-frameworks' && $(inputClicked).is(':checked')){
    $(cbox).eq(3).prop('disabled', true);
  } else if ($(inputClicked).attr('name') === 'js-frameworks') {
    $(cbox).eq(3).prop('disabled', false);
  }
  //if input clicked is 3 && input is checked => disable 1
     //else if clicked && input isnt checked => enable 1
  if($(inputClicked).attr('name') === 'express' && $(inputClicked).is(':checked')){
    $(cbox).eq(1).prop('disabled', true);
  } else if ($(inputClicked).attr('name') === 'express') {
    $(cbox).eq(1).prop('disabled', false);
  }

//if input clicked is 2 && input is checked => disable 4
   //else if clicked && input isnt checked => enable 4
   if($(inputClicked).attr('name') === 'js-libs' && $(inputClicked).is(':checked')){
     $(cbox).eq(4).prop('disabled', true);
   } else if ($(inputClicked).attr('name') === 'js-libs') {
     $(cbox).eq(4).prop('disabled', false);
   }
//if input clicked is 4 && input is checked => disable 2
   //else if clicked && input isnt checked => enable 2
   if($(inputClicked).attr('name') === 'node' && $(inputClicked).is(':checked')){
     $(cbox).eq(2).prop('disabled', true);
   } else if ($(inputClicked).attr('name') === 'node') {
     $(cbox).eq(2).prop('disabled', false);
   }
}

//add listener on inputs
$('input[type=checkbox]').on('change', function(event){
  const cboxList = $('input[type=checkbox]');
  disableActivity(event.target, cboxList);
  priceCalc();
});


//click listener on payment option
$('#payment').on('change', function(){
  if(this.value === 'credit card'){
    $creditCard.show();
    $bitcoin.hide();
    $paypal.hide();
  } else if (this.value === 'paypal') {
    $paypal.show();
    $bitcoin.hide();
    $creditCard.hide();
  } else if (this.value === 'bitcoin') {
    $bitcoin.show();
    $paypal.hide();
    $creditCard.hide();
  }
})
