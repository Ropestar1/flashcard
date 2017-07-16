var ClozeCard = function(fullText, cloze) {
  	if (this instanceof ClozeCard) {
    	this.fullText = fullText;
    	this.cloze = cloze;
    	// can I put a conditional within a constructor????
    	// if () {
    	// 	this.partial =;
    	// }
    	// else {
    	// 	console.log('Cloze is not present in full text.')
    	// }
	}
	else {
		return new ClozeCard(fullText, cloze);
	}
};

module.exports = ClozeCard;
