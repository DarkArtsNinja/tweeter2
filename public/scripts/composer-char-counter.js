$(document).ready(function() {
  
  $(".counter").text(140);
  
  $("#tweet-text").on('input', onInput);

  
});

const onInput = function() {

  const character = $(this).val().length;
    
  const $counter  = $('.counter');

  $counter.html(140 - character);

  if (character > 140) {
    return $counter.css('color', 'red');    
  } 
  
  $counter.css('color', 'black');    

    
}