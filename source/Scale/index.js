//
// Scale
//
// :: Constructor
// :: Degree

const data     = require( './data.json' );
const Note     = require( '../Note' );
const Interval = require( '../Interval' );

//
// Constructor
//

const Scale = function( name, rootSymbol ) {
	if ( rootSymbol ) this.root = rootSymbol instanceof Note ? rootSymbol : new Note( rootSymbol );

	const entry = data.find( ( entry ) => {
		return entry.name.toLowerCase() === name.toLowerCase();
	} );

	Object.assign( this, entry );

	this.intervals = this.degrees.map( ( degree ) => {
		return new Interval( degree, this.root );
	} );

	if ( this.root ) this.notes = new Note.Collection.fromIntervals( this.intervals, this.root );
}

//
// Degree
//

Scale.prototype.degree = function( degree ) {
	return this.intervals.find( ( interval ) => {
		return parseInt( interval.degree, 10 ) === degree;
	} );
}

module.exports = Scale;
