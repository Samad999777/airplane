// LANDING PAGE ANIMATION
//var scene = document.getElementById("scene");
//var parallaxInstance = new Parallax(scene);

/*let scrollerID;
let paused = true;
let speed = 2; // 1 - Fast | 2 - Medium | 3 - Slow
let interval = speed * 5; */

$(document).ready(function(){
    // Add smooth scrolling to all links
    $("a").on('click', function(event) {
  
      // Make sure this.hash has a value before overriding default behavior
      if (this.hash !== "") {
        // Prevent default anchor click behavior
        event.preventDefault();
  
        // Store hash
        var hash = this.hash;
  
        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
        
        $('body').fadeOut(100);
        
        setTimeout(function(){
          $('body').fadeIn(100);
          $('html, body').animate({
            scrollTop: $(hash).offset().top
          }, 0, function(){
  
            // Add hash (#) to URL when done scrolling (default click behavior)
            window.location.hash = hash;
          });
        },200)
      } // End if
    });
  });

  