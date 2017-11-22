//
// Key
//
// :: Constructor
// :: Get Chord From Note
// :: Get Chord From Degree

const Note     = require( '../Note' );
const Interval = require( '../Interval' );
const Chord    = require( '../Chord' );
const Scale    = require( '../Scale' );

//
// Constructor
//

const Key = function( rootSymbol ) {

	// if the root contains a flat or is the key of F prefer flats
	this.notation = /F$|b$/.test( rootSymbol ) ? 'b' : '#';

	// define the key root
	this.root = rootSymbol instanceof Note ? rootSymbol : new Note( rootSymbol );

	// define modes
	this.ionian     = new Scale( 'major',      this.root );
	this.dorian     = new Scale( 'dorian',     this.ionian.degree( 2 ).note );
	this.phrygian   = new Scale( 'phrygian',   this.ionian.degree( 3 ).note );
	this.lydian     = new Scale( 'lydian',     this.ionian.degree( 4 ).note );
	this.mixolydian = new Scale( 'mixolydian', this.ionian.degree( 5 ).note );
	this.aeolian    = new Scale( 'aeolian',    this.ionian.degree( 6 ).note );
	this.locrian    = new Scale( 'locrian',    this.ionian.degree( 7 ).note );

	// make a reference to the major scale notes
	this.notes = this.ionian.notes;

	// make a reference to the note symbols
	this.symbols = this.notes.symbols( this.notation );

	// make a modes reference array
	this.modes = [
		this.ionian,
		this.dorian,
		this.phrygian,
		this.lydian,
		this.mixolydian,
		this.aeolian,
		this.locrian
	];

	// define chord scale
	this.I   = new Chord( `${ this.ionian.degree( 1 ).note.symbol() }maj` );
	this.ii  = new Chord( `${ this.ionian.degree( 2 ).note.symbol() }m` );
	this.iii = new Chord( `${ this.ionian.degree( 3 ).note.symbol() }m` );
	this.IV  = new Chord( `${ this.ionian.degree( 4 ).note.symbol() }maj` );
	this.V   = new Chord( `${ this.ionian.degree( 5 ).note.symbol() }maj` );
	this.vi  = new Chord( `${ this.ionian.degree( 6 ).note.symbol() }m` );
	this.vii = new Chord( `${ this.ionian.degree( 7 ).note.symbol() }dim` );

	// define chord scale with seventh chords
	this.I7   = new Chord( `${ this.ionian.degree( 1 ).note.symbol() }maj7` );
	this.ii7  = new Chord( `${ this.ionian.degree( 2 ).note.symbol() }m7` );
	this.iii7 = new Chord( `${ this.ionian.degree( 3 ).note.symbol() }m7` );
	this.IV7  = new Chord( `${ this.ionian.degree( 4 ).note.symbol() }maj7` );
	this.V7   = new Chord( `${ this.ionian.degree( 5 ).note.symbol() }maj7` );
	this.vi7  = new Chord( `${ this.ionian.degree( 6 ).note.symbol() }m7` );
	this.vii7 = new Chord( `${ this.ionian.degree( 7 ).note.symbol() }dim7` );

	this.chords = [
		this.I,
		this.ii,
		this.iii,
		this.IV,
		this.V,
		this.vi,
		this.vii,
	];
}

//
// Get Chord From Note
//

Key.prototype.getChordFromNote = function( root ) {
	root = root instanceof Note ? root : new Note( root );
	const index = this.notes.findIndex( ( note ) => ( note.symbol() === root.symbol() ) );
	return this.chords[index];
}

//
// Get Chord from Degree
//

Key.prototype.getChordFromDegree = function( degree ) {
	const index = degree - 1;
	return this.chords[index]
}

module.exports = Key;
