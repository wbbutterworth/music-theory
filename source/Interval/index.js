const Note = require( '../Note' );
const intervals = require( './data.json' );

const Interval = function( symbol ) {
	this.symbol = symbol;

	if ( this.symbol.indexOf( 9 )  !== -1 ) this.symbol = this.symbol.replace( 9, 2 );
	if ( this.symbol.indexOf( 11 ) !== -1 ) this.symbol = this.symbol.replace( 11, 2 );
	if ( this.symbol.indexOf( 13 ) !== -1 ) this.symbol = this.symbol.replace( 13, 2 );

	const data = intervals.find( ( interval ) => {
		return interval.symbol === this.symbol || interval.degree === this.symbol;
	} );

	this.degree = data.degree;
}

Interval.prototype.getNote = function( root ) {
	root = root instanceof Note ? root : new Note( root );
}

module.exports = Interval;
