
/* ========== Lightbox ========== */

var $overlay = $('<div id="overlay"></div>');
var $galleryImage = $("<img>");
var $captionHeader = $("<h4></h4>");
var $captionBody = $("<p></p>");
var $videoContainer = $('<div id="videoContainer"></div>');
var $videoPlayer = $('<iframe id="myIframe"></iframe>');
var $videoSource = $("<source>");

// add video to video container
$videoContainer.append($videoPlayer);

// add video container to overlay
$overlay.append($videoContainer);

// add caption header to overlay
$overlay.append($captionHeader);

// add caption body to overlay
$overlay.append($captionBody);

// add overlay
$("body").append($overlay);

// capture the click event on the gallery li item
$("#gallery li").click(function(event){
  
  event.preventDefault();

  // path to video
  var videoID = $(this).find("img").attr("id");
  var url = "https://player.vimeo.com/video/" + videoID;

  // location of text
  var captionHeaderText = $(this).find("img").attr("name");
  var captionBodyText = $(this).find("p").text();

  // fill the iframe with the video source
  $('#myIframe').attr('src', url);

  // show the overlay
  $overlay.slideDown();

  // fill the overlay text
  $captionHeader.text(captionHeaderText);
  $captionBody.text(captionBodyText);

});

// hide overlay when clicked
$overlay.click(function(){
  $overlay.slideUp();

  // remove video playback source
  $('#myIframe').attr('src', " ");
});



/* ========== Figcaption Fade ========== */

var $galleryItem = $("#gallery li");
var $figcaption = $("#gallery li figcaption");
var filterVal = "blur(8px)";
  
$figcaption.hide();

// when the mouse hovers over a gallery item
$galleryItem.mouseover(function(){
  // blur image
  $(this).find("div").css("filter",filterVal);
  
  // show figcaption associated with image
  $(this).find($figcaption).show();

// when the mouse leaves the gallery item
}).mouseleave(function(){
  // hide figcaption
  $figcaption.hide();
  // remove blur
  $(this).children($galleryItem).css("filter","blur(0)"); 
});



/* ========== Load based on media query ========== 
   Carousel source: https://github.com/codepo8/simple-carousel/blob/master/carousel-simplest.html */

// the viewport is at least 768 pixels wide
if (window.matchMedia("(max-width: 768px)").matches) {

  // load carousel in Services Section
  carousel = (function(){
    // Read necessary elements from the DOM once
    var box = document.querySelector('.carouselbox');
    var next = box.querySelector('.next');
    var prev = box.querySelector('.prev');
    
    // Define the global counter, the items and the current item 
    var counter = 0;
    var items = box.querySelectorAll('.col');
    var amount = items.length;
    var current = items[0];

    box.classList.add('active');

    // navigate through the carousel
    function navigate(direction) {
      // hide the old current list item 
      current.classList.remove('current');
      
      // calculate th new position
      counter = counter + direction;
      // if the previous one was chosen and the counter is less than 0 make the counter the last element,
      // thus looping the carousel
      if (direction === -1 && 
          counter < 0) { 
        counter = amount - 1; 
      }

      // if the next button was clicked and there is no items element, set the counter to 0
      if (direction === 1 && 
          !items[counter]) { 
        counter = 0;
      }

      // set new current element and add CSS class
      current = items[counter];
      current.classList.add('current');
    }

    // add event handlers to buttons
    next.addEventListener('click', function(ev) {
      navigate(1);
    });
    prev.addEventListener('click', function(ev) {
      navigate(-1);
    });
    
    // show the first element (when direction is 0 counter doesn't change)
    navigate(0);
  })();

// the viewport is larger than 768 pixels wide
} else {
    // add data-tilt to divs in flex-grid in Services Section
  $(".flex-grid").find('div').attr('data-tilt', '');
}

















