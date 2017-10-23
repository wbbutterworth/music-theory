const chords   = require( './data.json' );
const Interval = require( '../Interval' );

const Chord = function( symbol ) {
	this.define( symbol );
}

Chord.prototype.define = function( symbol ) {
	const chordAbbrs     = chords.map( ( chord ) => { return chord.abbr; } ).join( '|' );
	const regexMatch     = new RegExp( `(^[A-G])\/?([A-G])?(${ chordAbbrs })($|sus(?:2|4)|add(?:2|4|6|9|11|13)|(?:#|b)(?:5|9|11|13)|no5|no3)` );
	const match          = symbol.match( regexMatch );

	this.root      = match && match[1] ? match[1] : undefined;
	this.inversion = match && match[2] ? match[2] : undefined;
	this.abbr      = match && match[3] ? match[3] : 'maj';
	this.modifier  = match && match[4] ? match[4] : undefined;

	console.log( this.root, this.inversion, this.abbr, this.modifier );

	// this.data = chords.find( ( chord ) => {
	// 	return this.abbr === chord.abbr;
	// } );

	// this.intervals = this.data.degrees.map( ( degree ) => {
	// 	return new Interval( degree );
	// } );

	// console.log( this.intervals );
}

Chord.prototype.extend = function( extension ) {

}

Chord.prototype.modify = function( modifier ) {

}

module.exports = Chord;
