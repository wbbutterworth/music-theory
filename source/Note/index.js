//
// Note
//
// :: Constructor
// :: From Interval
// :: Symbol
// :: Is Natural
// :: IS Accidental
// :: Collection Constructor
// :: Collection From Intervals
// :: Collection Symbols
// :: Collection Degree

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

	this.isNatural    = this.natural !== true;
	this.isAccidental = this.natural === false;

	// create an index reference of the entry in the data array
	this.index = data.indexOf( entry );
}

//
// From Interval
//

Note.fromInterval = function( interval, rootSymbol ) {
	const root   = rootSymbol instanceof Note ? rootSymbol : new Note( rootSymbol );
	const index  = ( root.index + interval.steps ) % data.length;
	const entry  = data[ index || root.index ];
	const symbol = entry.natural || entry.sharp;
	const note   = new Note( symbol );

	note.degree = interval.degree;

	return note;
}

//
// Symbol
//

Note.prototype.symbol = function( notation ) {
	notation = notation || '#';

	let symbol;

	if ( notation === '#' ) {
		symbol = this.natural || this.sharp;
	} else {
		symbol = this.natural || this.flat;
	}

	return symbol;
}

//
// Collection Constructor
//

Note.Collection = function( array ) {
	const notes = arguments.length === 0 ? [] : arguments[0].map( ( note ) => {
		return note instanceof Note ? note : new Note( note );
	} );

	this.push.apply( this, notes );
	return this;
}

Note.Collection.prototype = Object.create( Array.prototype );

//
// Collection From Intervals
//

Note.Collection.fromIntervals = function( intervals, rootSymbol ) {
	const notes = intervals.map( ( interval ) =>{
		if ( interval.note ) {
			return interval.note;
		} else {
			return Note.fromInterval( interval, rootSymbol );
		}
	} );

	return new Note.Collection( notes );
}

//
// Collection Symbols
//

Note.Collection.prototype.symbols = function( notation ) {
	return this.map( ( note ) => {
		return note.symbol( notation );
	} );
}

//
// Collection Degree
//

Note.Collection.prototype.degree = function( degree ) {
	return this.find( ( note ) => {
		return parseInt( note.degree, 10 ) === degree;
	} );
}

module.exports = Note;
