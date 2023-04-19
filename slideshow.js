
/*
 *  Functions to create a slideshow
 */

var current_slide = 0;

/*
 *  show_slide(n)
 *
 *  Display slide number n
 */
function show_slide(n) {

  var slides = document.getElementsByClassName("slide");
  var dots = document.getElementsByClassName("dot");

  if (n > slides.length) {
		n = 1;
	}
  if (n < 1) {
		n = slides.length;
	}

	// Hide all slides
  for (var i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

	// De-activate all dots
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  slides[n-1].style.display = "block";
  dots[n-1].className += " active";
	current_slide = n;
}

/*
 *  next_slide()
 */
function next_slide() {
	show_slide(current_slide+1);
}

/*
 *  prev_slide()
 */
function prev_slide() {
	show_slide(current_slide-1);
}
