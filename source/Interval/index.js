//
// Interval
//
// :: Constructor

const data = require( './data.json' );
const Note = require( '../Note' );

//
// Constructor
//

const Interval = function( symbol, root ) {
	const entry = data.find( ( entry ) => {
		return [
			entry.symbol,
			entry.degree
		].includes( symbol );
	} );

	Object.assign( this, entry );
	if ( root ) this.note = Note.fromInterval( this, root );
}

module.exports = Interval;
