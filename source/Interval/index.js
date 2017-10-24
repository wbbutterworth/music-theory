//
// Interval
//
// :: Constructor
// :: Get Note

const data = require( './data.json' );
const Note = require( '../Note' );

//
// Constructor
//

const Interval = function( symbol, rootSymbol ) {
	const entry = data.find( ( entry ) => {
		return [
			entry.symbol,
			entry.degree
		].includes( symbol );
	} );

	if ( rootSymbol ) {
		this.note = Note.fromInterval( rootSymbol, this );
	}

	Object.assign( this, entry );
}

//
// Get Note
//

Interval.prototype.getNote = function( root ) {
	return Note.fromInterval( root, this );
}

module.exports = Interval;
