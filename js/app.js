function newGame() {
	// reset guessList and counter if not 0
	$('#guessList').text('');
	$('span').text(0);

	return target = generateNum();
}

// function to generate a random nubmer between 1 and
// 100 on game start
function generateNum() {
	return Math.floor(Math.random()*100)
}

// function to generate feedback based on a user's guess
function feedback(guess, target) {
	var feedback,
	    adiff = Math.abs(guess - target),
	    diff = guess - target;
	if (diff === 0) {
		feedback = 'nailed it!';
	} else if (diff <= 10) {
		feedback = 'very hot';
	} else if (diff <= 20) {
		feedback = 'hot';
	} else if (diff <= 30) {
		feedback = 'warm';
	} else if (diff <= 50) {
		feedback = 'cold';
	} else {
		feedback = 'ice cold';
	}
	return feedback;
}

function isValid(guess) {
	var isValid = true;
	if (isNaN(guess)) {
		isValid = false;
	} else if (guess > 100 || guess < 0) {
		isValid = false;
	}
	return isValid;
}

$(document).ready(function(){
	
	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});

  	// start new game automatically on page load,
  	// and on user command
  	var target;
  	target = newGame();
  	$('.new').on('click', function() {
  		target = newGame();
  	})

  	// grab user input on form submit
  	$('form').on('submit', function() {
  		var guess = +$('#userGuess').val();
  		$('#userGuess').val('');

  		// determine if input is valid
  		if (isValid(guess) === false) {
  			alert('please guess a number between 1 and 100');
  		}
  		else {
	  		$('#feedback').text(feedback(guess, target));

	  		// increment counter by one
	  		var count = +$('#count').text();
	  		count += 1;
	  		$('#count').text(count);
	  		$('#guessList').append('<li>' + guess + '</li>');
  		}
  	})

});


