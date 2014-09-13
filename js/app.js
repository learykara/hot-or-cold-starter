var target, error, errorInit, direction, newGame;

function newGame() {
	// reset guessList and counter if not 0
	$('#guessList').text('');
	$('span').text(0);
	newGame = true;

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
	if (adiff === 0) {
		feedback = 'nailed it!';
	} else if (adiff <= 10) {
		feedback = 'very hot';
	} else if (adiff <= 20) {
		feedback = 'hot';
	} else if (adiff <= 30) {
		feedback = 'warm';
	} else if (adiff <= 50) {
		feedback = 'cold';
	} else {
		feedback = 'ice cold';
	}
	return [feedback, adiff];
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
  			console.log(guess, target, feedback(guess, target));
  			errorInit = error;
  			error = feedback(guess, target)[1];

  			console.log(errorInit, error);
  			if (newGame === true) {
  				direction = '';
  				newGame = false;
  			} else if (errorInit < error) {
  				direction = "& getting colder";
  			} else {
  				direction = "& getting warmer";
  			}
	  		$('#feedback').text(feedback(guess, target)[0] + "\n" + direction);
	  		event.preventDefault();

	  		// stop game if correct number is guessed
	  		if (feedback(guess, target)[0] === 'nailed it!') {
	  			alert('congratulations, you won the game!');
	  			newGame();
	  		}

	  		// increment counter by one
	  		var count = +$('#count').text();
	  		count += 1;
	  		$('#count').text(count);
	  		$('#guessList').append('<li>' + guess + '</li>');
	  		event.preventDefault();
  		}
  	})

});


