const notes = require( './data.json' );

const Note = function( symbol ) {
	const data = notes.find( ( note ) => {
		return [ note.natural, note.sharp, note.flat ].includes( symbol );
	} );

	Object.assign( this, data );
}

Note.Collection = function ( notes ) {
	if ( notes[0] instanceof Note ) {
		this.notes = notes;
	} else {
		this.notes = notes.map( ( note ) => {
			return new Note( note );
		} );
	}
}

Note.Collection.prototype.getNotes = function( sharp ) {
	sharp = typeof sharp === 'undefined' ? true : false;

	if ( sharp ) {
		return this.getSharps();
	} else {
		return this.getFlats();
	}
}

Note.Collection.prototype.getSharps = function() {
	return this.notes.map( ( note ) => {
		return note.natural || note.sharp;
	} );
}

Note.Collection.prototype.getFlats = function() {
	return this.notes.map( ( note ) => {
		return note.natural || note.flat;
	} );
}

Note.list = function( sharps ) {
	sharps = typeof sharps === 'undefined' ? true : false;

	return notes.filter( ( note ) => {
		if ( sharps ) {
			return note.symbol.indexOf( 'b' ) === -1;
		} else {
			return note.symbol.indexOf( '#' ) === -1;
		}
	} ).map( ( note ) => { return new Note( note.symbol ) } );
}

Note.prototype.sharp = function() {}

Note.prototype.flat = function() {}
Note.prototype.flip = function() {}

module.exports = Note;
