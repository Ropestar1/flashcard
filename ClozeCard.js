var ClozeCard = function(fullText, cloze) {
  	if (this instanceof ClozeCard) {
    	this.cloze = cloze;
    	this.fullText = fullText;
    	// can I put a conditional within a constructor????
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
