//Treehouse Project 3

//Declare Global Variables
const $heartJs = $('#color option:gt(2)');
const $jsPuns = $('#color option:lt(3)');
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
