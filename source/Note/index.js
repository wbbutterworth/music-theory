//
// Note
//
// :: Constructor
// :: From Interval
// :: Is Natural
// :: IS Accidental
// :: Collection Constructor
// :: Collection From Intervals
// :: Collection Get Notes
// :: Collection Get Sharps
// :: Collection Get Flats

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

Note.fromInterval = function( root, interval ) {
	root = root instanceof Note ? root : new Note( root );

	const index  = ( root.index + interval.steps ) % data.length;
	const entry  = data[ index || root.index ];
	const symbol = entry.natural || entry.sharp;
	const note   = new Note( symbol );

	note.interval = interval;
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

Note.Collection.fromIntervals = function( root, intervals ) {
	return intervals.map( ( interval ) =>{
		return new Note.fromInterval( root, interval );
	} );
}

//
// Collection Get Notes
//

Note.Collection.prototype.getNotes = function( sharp ) {
	sharp = typeof sharp === 'undefined' ? true : false;

	if ( sharp ) {
		return this.getSharps();
	} else {
		return this.getFlats();
	}
}

//
// Collection Get Sharps
//

Note.Collection.prototype.getSharps = function() {
	return this.notes.map( ( note ) => {
		return note.data.natural || note.data.sharp;
	} );
}

//
// Get Flats
//

Note.Collection.prototype.getFlats = function() {
	return this.notes.map( ( note ) => {
		return note.data.natural || note.data.flat;
	} );
}

module.exports = Note;
