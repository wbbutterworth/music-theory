const chords   = require( './data.json' );
const Interval = require( '../Interval' );

const Chord = function( symbol ) {
	this.define( symbol );
}

Chord.prototype.define = function( symbol ) {
	const match = symbol.match( /(^[A-G])([maj|m|dim|aug]*[7|9|11|13]*)($|sus[2|4]|add[2|4|6]|#4)/ );

	this.root     = match && match[1] ? match[1] : undefined;
	this.abbr     = match && match[2] ? match[2] : 'maj';
	this.modifier = match && match[3] ? match[3] : undefined;

	// this.extenson = match && match[3] ? match[3] : undefined;
	// this.modifier = match && match[4] ? match[4] : undefined;

	this.data = chords.find( ( chord ) => {
		return this.abbr === chord.abbr;
	} );

	this.intervals = this.data.degrees.map( ( degree ) => {
		return new Interval( degree );
	} );

	console.log( this.intervals );
}

Chord.prototype.extend = function( extension ) {

}

Chord.prototype.modify = function( modifier ) {

}

module.exports = Chord;
