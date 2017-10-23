const notes = require( './data.json' );

const Note = function( symbol ) {
	this.symbol    = symbol;
	this.isSharp   = this.symbol.indexOf( '#' ) !== -1;
	this.isFlat    = this.symbol.indexOf( 'b' ) !== -1;
	this.isNatural = !this.isSharp && !this.isFlat;

	this.data = notes.find( ( note ) => {
		return note.symbol === this.symbol || note.sharp === this.symbol || note.flat === this.symbol;
	} );
}

Note.all = function(  ) {
}

module.exports = Note;
