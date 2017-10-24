//
// Chord
//
// :: Constructor
// :: Notes

const data     = require( './data.json' );
const Note     = require( '../Note' );
const Interval = require( '../Interval' );

//
// Constructor
//

const Chord = function( symbol ) {
	const symbolMatch    = symbol.match( /(^[A-G])\/?([A-G])?((?:mmaj|maj|m|dim|aug)?(?:5|6|7|9|11|13)?)(.*)/ );
	const rootSymbol     = symbolMatch && symbolMatch[1] ? symbolMatch[1] : undefined;
	const bottomSymbol   = symbolMatch && symbolMatch[2] ? symbolMatch[2] : undefined;
	const chordSymbol    = symbolMatch && symbolMatch[3] ? symbolMatch[3] : 'maj';
	const chordModifiers = symbolMatch && symbolMatch[4] ? symbolMatch[4].split( /(?=[#|b]\d*)|(?=add\d*)|(?=sus\d)|(?=no\d)/ ) : undefined;

	const entry = data.find( ( entry ) => {
		return entry.symbol === chordSymbol;
	} );

	Object.assign( this, entry );

	// TODO set inversion using bottomSymbol

	this.symbol = symbol;
	this.root   = new Note( rootSymbol );

	this.intervals = entry.degrees.map( ( degree ) => {
		return new Interval( degree, rootSymbol );
	} );

	this.notes = new Note.Collection.fromIntervals( this.intervals );
}

module.exports = Chord;
