var fs = require('fs');
// need to add reads and writes to a .json file, but how?

var inquirer = require('inquirer');
var request = require('request');

var ClozeCard = require('./ClozeCard.js');
var BasicCard = require ('./BasicCard.js');

var strAnswerBasic = 'Answer basic card questions.';
var strAnswerCloze = 'Answer cloze card questions.';
var strCreateBasic = 'Create a basic flashcard.';
var strCreateCloze = 'Create a cloze flashcard.';

//defined functions to be called during UX

function creatingBasic() {
	inquirer.prompt([
	    // Here we create a basic text prompt.
	    {
			type: 'input',
      		message: 'What title do you want for this basic flashcard?',
     		name: 'titleForBasic'
	    }
	]).then(function(titleResponse) {
		


		//need to check if title exists in JSON file, if not proceed normally, if it does, ask to rename
		fs.readFile('./basic-cards.json', (err, data) => {
			if (err) throw err;
			// console.log('Data result: ', JSON.parse(data));
			// console.log('Data index 0: ', JSON.parse(data)['First President'])
			// console.log('Object keys', Object.keys(JSON.parse(data)))
			// console.log(JSON.parse(Object.keys(data["First President"])))
			var titlesList = Object.keys(JSON.parse(data));

			if (titlesList.indexOf(titleResponse.titleForBasic) === -1) {
				basicInfo()
			}
			else {
				console.log('The title you used already exists. Please use a different title.');
				creatingBasic()
			}

		});
		
		// basicInfo()
		// .then(function() {
		// 	console.log('New basic card ', newBasicCard);		
		// 	newBasicCard.prototype.basicTitle = titleResponse.titleForBasic;
	
		// })
		//add prototype for the basic card title
	});
}

function basicInfo() {
	inquirer.prompt([
    	{
			type: 'input',
      		message: 'What question do you want to put for the front of the card?',
     		name: 'basicFront'
	    },
    	{
			type: 'input',
      		message: 'What answer do you want to put for the back of the card?',
     		name: 'basicBack'
	    }
	]).then(function(basicInfoResponse) {
		var frontText = basicInfoResponse.basicFront;
		var backText = basicInfoResponse.basicBack;

		console.log('Adding a new basic card.');
		console.log('new front', frontText);
		console.log('new back', backText);

		var newBasicCard = BasicCard(frontText, backText);
		console.log(newBasicCard)
		// console.log(newBasicCard.hello) --> undefined
		// return newBasicCard
	});
}



function creatingCloze() {
	inquirer.prompt([
	    {
			type: 'input',
      		message: 'What title do you want for this cloze flashcard?',
     		name: 'titleForCloze'
	    }
	]).then(function(titleResponse) {
		//need to check if title exists, if not proceed normally, if it does, ask to rename
		console.log('Adding information.');
		clozeInfo();
		//prototype the title for this object

	});
}

//adds the information to the clozeCard
function clozeInfo() {
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
		var fullText = clozeInfoResponse.clozeFullText;
		var clozeText = clozeInfoResponse.clozeInput;

		//check if the cloze exists in the full-text, put an error if it doesn't
		console.log('fullText', fullText);
		console.log('cloze portion', clozeText);

		if (fullText.includes(clozeText)) {
			var newClozeCard = ClozeCard (fullText, clozeText);
			console.log(newClozeCard)
		}
		else {
			console.log('Your cloze doesn\'t exist in the full text. Please fix.')
			clozeInfo()
		}
	});
}

function answerBasicCards() {
	console.log('Need to add reading capabilities here.')
}

function answerClozeCards() {
	console.log('Need to add reading capabilities here.')
}

//CORE PROGRAM STARTING
inquirer.prompt([
    // Here we create a basic text prompt.
    { 
		type: 'list',
		message: 'What would you like to do?',
		choices: [strAnswerBasic, strAnswerCloze, strCreateBasic, strCreateCloze],
		name: 'action'
    }
]).then(function(inquirerResponse) {
    if (inquirerResponse.action === strAnswerBasic) {
		console.log('Let\'s answer some basic card questions.')
		//add function for answering basic cards
    }
    else if (inquirerResponse.action === strCreateCloze) {
		console.log('Let\'s answer some cloze card questions.')
		//add function for answering cloze cards
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