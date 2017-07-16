var fs = require('fs');
var inquirer = require('inquirer');

var ClozeCard = require('./ClozeCard.js');
var BasicCard = require ('./BasicCard.js');

var strAnswerQuestions = 'Answer questions.';
var strCreateBasic = 'Create a basic flashcard.';
var strCreateCloze = 'Create a cloze flashcard.';

//defined functions to be called during UX
function answeringQuestions() {
	inquirer.prompt([
	    // Here we create a basic text prompt.
	    {
			type: 'list',
			message: 'What would you like to do?',
			choices: [strAnswerQuestions, strCreateBasic, strCreateCloze],
			name: 'action'
	    }
	]).then(function(inquirerResponse) {
		console.log('Need to add reading capabilities here.')
	});
}

function creatingBasic() {
	inquirer.prompt([
	    // Here we create a basic text prompt.
	    {
			type: 'input',
      		message: 'What title do you want for this basic flashcard?',
     		name: 'titleForBasic'
	    }
	]).then(function(titleResponse) {
		//need to check if title exists, if not proceed normally, if it does, ask to rename
		console.log('Adding information.')

		inquirer.prompt([
	    	{
				type: 'input',
	      		message: 'What question do you want to put for the front of the card?',
	     		name: 'basicFront'
		    },
	    	{
				type: 'input',
	      		message: 'What anser do you want to put for the back of the card?',
	     		name: 'basicBack'
		    }
		]).then(function(cardInfoResponse) {
			//need to check if title exists, if not proceed normally, if it does, ask to rename
			console.log('new front', cardInfoResponse.basicFront);
			console.log('new back', cardInfoResponse.basicBack);

			var newBasicCard = BasicCard(titleResponse.titleForBasic, cardInfoResponse.basicFront,
				cardInfoResponse.basicBack);
			console.log(newBasicCard);
		});
	});
}

function creatingCloze() {
	inquirer.prompt([
	    // Here we create a basic text prompt.
	    {
			type: 'input',
      		message: 'What title do you want for this cloze flashcard?',
     		name: 'titleForCloze'
	    }
	]).then(function(titleResponse) {
		//need to check if title exists, if not proceed normally, if it does, ask to rename
		console.log('Adding information.')

		inquirer.prompt([
	    	{
				type: 'input',
	      		message: 'Please enter your statement.',
	     		name: 'clozeFullText'
		    },
	    	{
				type: 'input',
	      		message: 'What portion of the text do you want clozed?',
	     		name: 'clozeInput'
		    }
		]).then(function(clozeInfoResponse) {
			//need to check if title exists, if not proceed normally, if it does, ask to rename

			//check if the cloze exists in the full-text, put an error if it doesn't
			console.log('fullText', clozeInfoResponse.clozeFullText);
			console.log('cloze portion', clozeInfoResponse.clozeInput);

			var newClozeCard = ClozeCard (titleResponse.titleForCloze, clozeInfoResponse.clozeFullText,
				clozeInfoResponse.clozeInput);
			console.log(newClozeCard);
		});
	});
}


//CORE PROGRAM STARTING
inquirer.prompt([
    // Here we create a basic text prompt.
    { 
		type: 'list',
		message: 'What would you like to do?',
		choices: [strAnswerQuestions, strCreateBasic, strCreateCloze],
		name: 'action'
    }
]).then(function(inquirerResponse) {
    if (inquirerResponse.action === strAnswerQuestions) {
		console.log('Let\'s answer some questions.')
    }
    else if (inquirerResponse.action === strCreateBasic) {
		console.log('Let\'s make a basic flashcard.')
		creatingBasic();
    }

    else if (inquirerResponse.action === strCreateCloze) {
		console.log('Let\'s make a cloze flashcard.')
		creatingCloze();
    }
});



// // TESTS
// var firstBasicCard = new BasicCard('Who was the first president?', 'George Washington'); 
// var firstClozeCard = new ClozeCard('George Washington was first president.', 'George Washington');

// console.log('first basic front', firstBasicCard.front);
// console.log('first basic back', firstBasicCard.back);

// console.log('first cloze full text', firstClozeCard.fullText);
// console.log('first cloze cloze', firstClozeCard.cloze);

// var secondBasicCard = BasicCard('What is up?', 'The sky.'); 
// var secondClozeCard = ClozeCard('The sky is up', 'sky');

// console.log('second basic front', secondBasicCard.front);
// console.log('second basic back', secondBasicCard.back);

// console.log('second cloze full text', secondClozeCard.fullText);
// console.log('second cloze cloze', secondClozeCard.cloze);
// //END TESTS