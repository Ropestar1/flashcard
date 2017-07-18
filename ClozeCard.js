var ClozeCard = function(fullText, cloze) {
  	if (this instanceof ClozeCard) {
    	if (fullText.includes(cloze)) {
            this.fullText = fullText;
            this.cloze = cloze;
    		// this.partial = ;
    	}
    	else {
    		console.log('Cloze is not present in full text.')
            ClozeCard()
    	}
	}
	else {
		return new ClozeCard(fullText, cloze);
	}
};

module.exports = ClozeCard;
