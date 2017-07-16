var ClozeCard = function(text, cloze) {
  	if (this instanceof ClozeCard) {
    	// this.text = text;
    	this.cloze = cloze;
    	this.fullText = text; //check this again
    	// if () {
    	// 	this.partial =;
    	// }
    	// else {
    	// 	console.log('Cloze is not present in full text.')
    	// }
	}
	else {
		return new ClozeCard(text, cloze);

	}
};

module.exports = ClozeCard;
