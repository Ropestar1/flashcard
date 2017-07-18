var fs = require('fs');
// need to add reads and writes to a .json file, but how?

var inquirer = require('inquirer');
var request = require('request');

var ClozeCard = require('./ClozeCard.js');
var BasicCard = require('./BasicCard.js');

var strAnswerBasic = 'Answer basic card questions.';
var strAnswerCloze = 'Answer cloze card questions.';
var strCreateBasic = 'Create a basic flashcard.';
var strCreateCloze = 'Create a cloze flashcard.';

var count = 0;
var correct = 0;

//defined functions to be called during UX
function answerBasicCards() {
	fs.readFile('./basic-cards.json', (err, data) => {
		if (err) throw err;
		// console.log(JSON.parse(data));
		var parsedData = JSON.parse(data);
		var keyArray = Object.keys(parsedData);
		
		console.log(keyArray)
		// console.log(keyArray[])
		if (count < keyArray.length) {
			inquirer.prompt([
		    	{
					type: 'input',
		      		message: parsedData[keyArray[count]].front,
		     		name: 'userAnswer'
			    }
			]).then(function(basicInfoResponse) {
				console.log(count);
				console.log('array length', keyArray.length);
				if (basicInfoResponse.userAnswer === parsedData[keyArray[count]].back) {
					correct++;
					count++;
					console.log('Correct! You have ' + correct + ' answers correct.');
					answerBasicCards()
				}
				else {
					count++;
					console.log('Wrong! You have ' + correct + ' answers correct.');
					answerBasicCards()
				}
			});
		}
		//loop through questions and get input from inquirer
	});
}

function answerClozeCards() {
	fs.readFile('./cloze-cards.json', (err, data) => {
		if (err) throw err;
		var parsedData = JSON.parse(data);
		var keyArray = Object.keys(parsedData);
		
		console.log(keyArray)
		// console.log(keyArray[])
		if (count < keyArray.length) {
			inquirer.prompt([
		    	{
					type: 'input',
		      		message: parsedData[keyArray[count]].partial,
		     		name: 'userAnswer'
			    }
			]).then(function(clozeInfoResponse) {
				console.log(count);
				console.log('array length', keyArray.length);
				if (clozeInfoResponse.userAnswer === parsedData[keyArray[count]].cloze) {
					correct++;
					count++;
					console.log('Correct! You have ' + correct + ' answers correct.');
					answerClozeCards()
				}
				else {
					count++;
					console.log('Wrong! You have ' + correct + ' answers correct.');
					answerClozeCards()
				}
			});
		}
	});
}

function creatingBasic() {
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
		
		fs.readFile('/etc/passwd', (err, data) => {
			if (err) throw err;
			console.log(JSON.parse(data));
		});
	});

	// inquirer.prompt([
	//     // Here we create a basic text prompt.
	//     {
	// 		type: 'input',
 //      		message: 'What title do you want for this basic flashcard?',
 //     		name: 'titleForBasic'
	//     }
	// ]).then(function(titleResponse) {
	// 	//need to check if title exists in JSON file, if not proceed normally, if it does, ask to rename
	// 	fs.readFile('./basic-cards.json', (err, data) => {
	// 		if (err) throw err;
	// 		// console.log('Data result: ', JSON.parse(data));
	// 		// console.log('Data index 0: ', JSON.parse(data)['First President'])
	// 		// console.log('Object keys', Object.keys(JSON.parse(data)))
	// 		// console.log(JSON.parse(Object.keys(data["First President"])))

	// 	});
		
	// 	// basicInfo()
	// 	// .then(function() {
	// 	// 	console.log('New basic card ', newBasicCard);		
	// 	// 	newBasicCard.prototype.basicTitle = titleResponse.titleForBasic;
	
	// 	// })
	// 	//add prototype for the basic card title
	// });
}

//adds the information to the clozeCard
function creatingCloze() {
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

function startUp() {
	inquirer.prompt([
	    { 
			type: 'list',
			message: 'What would you like to do?',
			choices: [strAnswerBasic, strAnswerCloze, strCreateBasic, strCreateCloze],
			name: 'action'
	    }
	]).then(function(inquirerResponse) {
	    if (inquirerResponse.action === strAnswerBasic) {
			console.log('Let\'s answer some basic card questions.');
			answerBasicCards()
	    }
	    else if (inquirerResponse.action === strAnswerCloze) {
			console.log('Let\'s answer some cloze card questions.');
			answerClozeCards()
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
}
//CORE PROGRAM STARTING
startUp();