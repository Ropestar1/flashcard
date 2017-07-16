var BasicCard = function (front, back) {
	if (this instanceof BasicCard) {
    	// this.titleBasic = titleBasic;
    	this.front = front;
    	this.back = back
	}
	else {
		return new BasicCard(front, back);
	}
}

module.exports = BasicCard;