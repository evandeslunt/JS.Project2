/* Code to run the bulls and cows game */

$(document).ready(function(e){
	answer = getNumber();
	attempts = 0;
	
	$("#frmGuess").validate({
		rules: {
			guess: {
				required: true,
				number: true,
				min: 1111,
				max: 9999
			}
		},
		messages: {
			guess: {
		  		required: "You must enter a guess!",
		  		number: "Please enter only numbers 1-9",
		  		min: "Please enter four digits between 1 and 9",
		  		max: "Please enter four digits between 1 and 9"
		  	}
		},
		submitHandler: function(form) {
				attempts++;
				check(answer);
			}
	});

	$("#playAgain").click(function(){
		location.reload();
	});
});

/**
 * Returns a random number between 1111 and 9999, containing four unique non-zero digits.
 */
function getNumber(){
	'use strict';
	var result = "";
	var count = 0;
	while(count < 4){
		var nextNum = Math.floor(Math.random()*10) + 1;
		if(nextNum < 10 && result.indexOf(nextNum) == -1){
			result += nextNum + "";
			count++;
		}
	}
	console.log("answer:  " + result);
	return result;
};

/**
 * Checks that the user's answer is valid and calculates the number of bulls and cows earned.
 **/
function check(){
	'use strict';
	var bulls = 0;
	var cows = 0;
	var guess = $("#guess").val();
	
	$("#results").removeClass("hidden");
	
	if(!isValidGuess(guess)){
		$("#results").append("<div id='result'>Oops! Your guess contains a repeated digit or a zero.</div>");
		return false;
	}
	
	for (var i = 0; i < guess.length; i++){
		var currNum = guess.charAt(i);
		if (currNum == answer.charAt(i)) {
			bulls++;
		} else if (answer.indexOf(currNum) != -1){
			cows++;
		}
	}
	
	displayResults(cows, bulls, guess);
	return false; //do not reload the page.
};

/**
 * Checks if the guess has repeated digits or contains 0. If each digit is unique and 
 * non-zero, returns true. Otherwise, returns false.
 */
function isValidGuess(guess){
	'use strict';
	var guess1 = guess[0];
	var guess2 = guess[1];
	var guess3 = guess[2];
	var guess4 = guess[3];
	
	if (guess.indexOf("0") != -1){
		return false;
	}
	if (guess1 == guess2 || guess1 == guess3 || guess1 == guess4 ||
		guess2 == guess3 || guess2 == guess4 || guess3 == guess4){
		return false;
	}
	
	return true;
}

/**
 * Displays how many cows and bulls the user earned, or displays the winning screen if 
 * they guess the correct number.
 **/
function displayResults(cows, bulls, guess){
	'use strict';
	
	var resultText = "Guess: " + guess + "&nbsp;&nbsp;&nbsp; cows: " + cows + "&nbsp;&nbsp;&nbsp; bulls: " + bulls + "&nbsp;&nbsp;"
	$(".result:first").before("<div class='result'>" + resultText + "</div><br />");
	displayCowsAndBulls(cows, bulls);
	
	if(bulls == 4){
		displayWin();
	}
}

/**
 * Displays the cows and bulls the user earned.
 **/
function displayCowsAndBulls(cows, bulls){
	'use strict';
	var cowImages = "";
	var bullImages = "";
	
	$("#status").removeClass("hidden");
	
	for (var i = 0; i < bulls; i++){
		bullImages += "<img src='bull_small.png' height=25px alt='bull' />";
	}
	for (var j = 0; j < cows; j++){
		cowImages += "<img src='cow_small.png' height=25px alt='cow'/>";
	} 
	
	$(".result:first").append(cowImages + bullImages);
}

/**
 * Changes the background to the "winning" background, displays the congratulations message,
 * and hides the How to Play and Play sections.
 **/
function displayWin(){
	'use strict';
	
	//hide play areas
	$("#howTo").addClass("hidden");
	$("#play").addClass("hidden");
	$("#results").addClass("hidden");
	
	//show winning result areas
	$("#playAgain").removeClass("hidden");
	$("#win").removeClass("hidden");
	$(".win > h2").after("<p>Answer: " + answer + "</p><p>Guesses: " + attempts + "</p>");
	
	//change background
	$("#wrapper").css("background-image","url('grass_win.png')");
	$("#wrapper").css("min-height","625px");
}
