const intervals = require( './data.json' );

const Interval = function( symbol ) {
	this.define( symbol );
}

Interval.prototype.define = function( symbol ) {
	this.symbol = symbol;

	this.data = intervals.find( ( interval ) => {
		return interval.abbr === symbol || interval.degree === symbol;
	} );
}

module.exports = Interval;
