const chords   = require( './data.json' );
const Note     = require( '../Note' );
const Interval = require( '../Interval' );

const Chord = function( symbol ) {
	const symbolMatch    = symbol.match( /(^[A-G])\/?([A-G])?((?:mmaj|maj|m|dim|aug)?(?:5|6|7|9|11|13)?)(.*)/ );
	const rootNote       = symbolMatch && symbolMatch[1] ? symbolMatch[1] : undefined;
	const bottomNote     = symbolMatch && symbolMatch[2] ? symbolMatch[2] : undefined;
	const chordSymbol    = symbolMatch && symbolMatch[3] ? symbolMatch[3] : 'maj';
	const chordModifiers = symbolMatch && symbolMatch[4] ? symbolMatch[4].split( /(?=[#|b]\d*)|(?=add\d*)|(?=sus\d)|(?=no\d)/ ) : undefined;

	const data = chords.find( ( chord ) => {
		return chord.symbol === chordSymbol;
	} );

	// TODO set inversion using bottomNote

	this.root   = new Note( rootNote );
	this.symbol = symbol;

	this.intervals = data.degrees.map( ( degree ) => {
		return new Interval( degree );
	} );

	this.notes = this.intervals.map( ( interval ) => {
		return interval.getNote( this.root );
	} );

	// console.log( this.notes );
}

Chord.prototype.modify = function( modifier ) {

}

module.exports = Chord;
