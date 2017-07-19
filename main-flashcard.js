var fs = require('fs');

var inquirer = require('inquirer');
var request = require('request');

var ClozeCard = require('./ClozeCard.js');
var BasicCard = require('./BasicCard.js');

var strAnswerBasic = 'Answer basic card questions.';
var strAnswerCloze = 'Answer cloze card questions.';
var strCreateBasic = 'Create a basic flashcard.';
var strCreateCloze = 'Create a cloze flashcard.';
var strExitProgram = 'Exit the program';

var count = 0;
var correct = 0;
var basicLibrary;
var clozeLibrary; 

//defined functions to be called during UX
function answerBasicCards() {
	fs.readFile('./basic-cards.json', (err, data) => {
		if (err) throw err;
		var parsedData = JSON.parse(data);
		var keyArray = Object.keys(parsedData);
		
		if (count < keyArray.length) {
			inquirer.prompt([
		    	{
					type: 'input',
		      		message: parsedData[keyArray[count]].front,
		     		name: 'userAnswer'
			    }
			]).then(function(basicInfoResponse) {
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
	});
}

function answerClozeCards() {
	fs.readFile('./cloze-cards.json', (err, data) => {
		if (err) throw err;
		var parsedData = JSON.parse(data);
		var keyArray = Object.keys(parsedData);
		
		// console.log(keyArray)
		// console.log(keyArray[])
		if (count < keyArray.length) {
			inquirer.prompt([
		    	{
					type: 'input',
		      		message: parsedData[keyArray[count]].partial,
		     		name: 'userAnswer'
			    }
			]).then(function(clozeInfoResponse) {
				// console.log(count);
				// console.log('array length', keyArray.length);
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
      		message: 'What title do you want for this card?',
     		name: 'basicTitle'
	    },
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
		var cardTitle = basicInfoResponse.basicTitle;
		var frontText = basicInfoResponse.basicFront;
		var backText = basicInfoResponse.basicBack;
		
		fs.readFile('./basic-cards.json', (err, data) => {
			if (err) throw err;
			// console.log('Before redefined', basicLibrary);
			basicLibrary = JSON.parse(data);
			// console.log('After redefined', basicLibrary);
			basicLibrary[cardTitle] = BasicCard(frontText, backText);
			// console.log('After adding card', basicLibrary);

			fs.writeFile('./basic-cards.json', JSON.stringify(basicLibrary, null, 2), (err, data) => {
				console.log('Card added to basic card library.')
			});		
		});
	});
}

//adds the information to the clozeCard
function creatingCloze() {
	inquirer.prompt([
    	{
			type: 'input',
      		message: 'What title do you want for this card?',
     		name: 'clozeTitle'
	    },
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
		var cardTitle = clozeInfoResponse.clozeTitle;
		var fullText = clozeInfoResponse.clozeFullText;
		var clozeText = clozeInfoResponse.clozeInput;
		var partialText = fullText.replace(clozeText, "...");
		console.log('partial test', partialText);

		//check if the cloze exists in the full-text, put an error if it doesn't
		// console.log('fullText', fullText);
		// console.log('cloze portion', clozeText);
		if (fullText.includes(clozeText)) {
			fs.readFile('./cloze-cards.json', (err, data) => {
				if (err) throw err;
				console.log('Before redefined', clozeLibrary);
				clozeLibrary = JSON.parse(data);
				console.log('After redefined', clozeLibrary);
				clozeLibrary[cardTitle] = ClozeCard(fullText, clozeText);
				clozeLibrary[cardTitle].partial = partialText; 
				console.log('After adding card', clozeLibrary);

				fs.writeFile('./cloze-cards.json', JSON.stringify(clozeLibrary, null, 2), (err, data) => {
					console.log('Card added to cloze card library.')
				});
			})
		}
		else {
			console.log('Your cloze doesn\'t exist in the full text. Please fix.');
			creatingCloze()
		}
	})
}

function startUp() {
	inquirer.prompt([
	    { 
			type: 'list',
			message: 'What would you like to do?',
			choices: [strAnswerBasic, strAnswerCloze, strCreateBasic, strCreateCloze, strExitProgram],
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
			console.log('Let\'s make a basic flashcard.');
			creatingBasic()
	    }

	    else if (inquirerResponse.action === strCreateCloze) {
			console.log('Let\'s make a cloze flashcard.');
			creatingCloze()
	    }

	    else if (inquirerResponse.action === strExitProgram) {
	    	console.log('stop program');
	    	process.exit()
	    }
	});
}
//CORE PROGRAM STARTING
startUp();