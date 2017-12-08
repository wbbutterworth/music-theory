//
// Scale
//
// :: Constructor
// :: All
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
// All
//

Scale.all = function() {
	return data.map( ( entry ) => {
		return new Scale( entry.name );
	} );
}

//
// Names
//

Scale.names = function() {
	return data.map( ( entry ) => ( entry.name ) );
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
