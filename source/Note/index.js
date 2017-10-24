const notes = require( './data.json' );

const Note = function( symbol ) {
	this.symbol       = symbol;
	this.isSharp      = this.symbol.indexOf( '#' ) !== -1;
	this.isFlat       = this.symbol.indexOf( 'b' ) !== -1;
	this.isNatural    = !this.isSharp && !this.isFlat;
	this.isAccidental = this.isSharp || this.isFlat;

	const data = notes.find( ( note ) => {
		return note.symbol === this.symbol || note.sharp === this.symbol || note.flat === this.symbol;
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
