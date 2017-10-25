//
// Note
//
// :: Constructor
// :: From Interval
// :: Is Natural
// :: IS Accidental
// :: Collection Constructor
// :: Collection From Intervals
// :: Collection Symbols

const data = require( './data.json' );

//
// Constructor
//

const Note = function( symbol ) {
	const entry = data.find( ( entry ) => {
		return [
			entry.natural,
			entry.sharp,
			entry.flat
		].includes( symbol );
	} );

	// inject the data object into the note instance
	Object.assign( this, entry );

	// create an index reference of the entry in the data array
	this.index = data.indexOf( entry );
}

//
// From Interval
//

Note.fromInterval = function( interval, root ) {
	root = root instanceof Note ? root : new Note( root );

	const index  = ( root.index + interval.steps ) % data.length;
	const entry  = data[ index || root.index ];
	const symbol = entry.natural || entry.sharp;
	const note   = new Note( symbol );

	return note;
}

//
// Is Natural
//

Note.prototype.isNatural = function() {
	return this.natural !== false;
}

//
// Is Accidental
//

Note.prototype.isAccidental = function() {
	return this.natural === false;
}

//
// Collection Constructor
//

Note.Collection = function( array ) {
	const notes   = array[0] instanceof Note ? array : undefined;
	const symbols = array[0] instanceof String ? array : undefined;

	if ( notes ) {
		this.notes = notes;
	} else if ( symbols ) {
		this.notes = symbols.map( ( symbol ) => {
			return new Note( symbol );
		} );
	}

}

//
// Collection From Intervals
//

Note.Collection.fromIntervals = function( intervals, root ) {
	const notes = intervals.map( ( interval ) =>{
		if ( interval.note ) {
			return interval.note;
		} else {
			return Note.fromInterval( interval, root );
		}
	} );

	return new Note.Collection( notes );
}

//
// Collection Symbols
//

Note.Collection.prototype.symbols = function( notation ) {
	notation = notation || '#';

	let symbols;

	if ( notation === '#' ) {
		symbols = this.notes.map( ( note ) => {
			return note.natural || note.sharp;
		} );
	} else if ( notation === 'b'){
		symbols = this.notes.map( ( note ) => {
			return note.natural || note.flat;
		} );
	}

	return symbols;
}

module.exports = Note;
