//
// Interval
//
// :: Constructor

const data = require( './data.json' );
const Note = require( '../Note' );

//
// Constructor
//

const Interval = function( symbol, rootSymbol ) {
	if ( /^(b|#)?9/.test( symbol ) )  symbol = symbol.replace( 9, 2 );
	if ( /^(b|#)?11/.test( symbol ) ) symbol = symbol.replace( 11, 4 );
	if ( /^(b|#)?13/.test( symbol ) ) symbol = symbol.replace( 13, 6 );

	const entry = data.find( ( entry ) => {
		return [
			entry.symbol,
			entry.degree
		].includes( symbol );
	} );

	Object.assign( this, entry );

	if ( rootSymbol ) this.note = Note.fromInterval( this, rootSymbol );
}

Interval.prototype.getInverted = function() {
	const index  = data.findIndex( ( entry ) => ( entry.symbol === this.symbol ) );
	const symbol = data[ data.length - 1 - index ].symbol;

	return new Interval( symbol );
}

Interval.prototype.apply = function( root ) {
	return new Note.fromInterval( this, root );
}

module.exports = Interval;
