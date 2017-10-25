//
// Chord
//
// :: Constructor
// :: Builder

const data     = require( './data.json' );
const Note     = require( '../Note' );
const Interval = require( '../Interval' );

const regexSymbolMatch   = /(^[A-G](?:b|#)?)\/?([A-G](?:b|#)?)?((?:mmaj|maj|m|dim|aug)?(?:5|6|7|9|11|13)?)(.*)/;
const regexModifierSplit = /(?=(?:#|b)\d+)|(?=add\d+)|(?=sus\dsus\d)(?=sus\d(?!sus\d))|(?=no\d)/;

//
// Constructor
//

const Chord = function( symbol ) {
	const symbolMatch  = symbol.match( regexSymbolMatch );
	const rootSymbol   = symbolMatch && symbolMatch[1] ? symbolMatch[1] : undefined;
	const bottomSymbol = symbolMatch && symbolMatch[2] ? symbolMatch[2] : undefined;
	const chordSymbol  = symbolMatch && symbolMatch[3] ? symbolMatch[3] : 'maj';
	const modifiers    = symbolMatch && symbolMatch[4] ? symbolMatch[4].split( regexModifierSplit ) : undefined;

	const entry = data.find( ( entry ) => {
		return entry.symbol === chordSymbol;
	} );

	Object.assign( this, entry );

	this._modify( modifiers );
	this._define( symbol, rootSymbol, bottomSymbol );
}

Chord.prototype._modify = function( modifiers ) {
	modifiers.forEach( ( modifier, index, array ) => {

		// suspend third
		if ( /^sus\d/.test( modifier ) ) {

			// match for the degrees to swap the third with
			const degreesToSuspendWith = modifier.match( /(\d)/g ).sort();

			// can only suspend with a 2 or 4 degree
			degreesToSuspendWith.forEach( ( degree ) => {
				if ( !/2|4/.test( degree ) ) throw 'Can only suspend with a 2 or 4';
			} );

			// get the index of the third degree in degrees array
			const thirdDegreeIndex = this.degrees.findIndex( ( degree ) => {
				return /b*3/.test( degree );
			} );

			// remove the third degree and replace with either or both the 2 and 4
			this.degrees.splice.apply( this.degrees, [ thirdDegreeIndex, 1 ].concat( degreesToSuspendWith ) );

		// add interval
		} else if ( /^add\d+/.test( modifier ) ) {

			// match for the degree to add
			const degreeToAdd = modifier.match( /(\d+)/ )[1];

			// find where the degree should fit into the array; smallest to largest
			const addAtIndex = this.degrees.findIndex( ( degree ) => {
				return degreeToAdd < parseInt( degree, 10 );
			} );

			// if no index was found push degree onto the end
			// else add before defined index
			if ( addAtIndex === -1 ) {
				this.degrees.push( degreeToAdd );
			} else {
				this.degrees.splice( addAtIndex, 0, degreeToAdd );
			}

		// remove interval
		} else if ( /^no\d/.test( modifier ) ) {

			// match for the degree to remove
			const degreeToRemove  = modifier.match( /(\d)/ )[1];

			// define the regex test for finding the degree to be replaced
			const regexDegreeTest = new RegExp( `(?:b*|#*)${ degreeToRemove }` );

			// find index for the degree to be replaced
			const removeAtIndex = this.degrees.findIndex( ( degree ) => {
				return regexDegreeTest.test( degree );
			} );

			// remove the degree with the defined index
			this.degrees.splice( removeAtIndex, 1 );

		// replace interval
		} else if ( /^(b|#)\d/.test( modifier ) ) {

			// match for the degree to replace and the degree to replace it with
			const modifierMatch       = modifier.match( /^((?:b|#)(\d+))/ );
			const degreeToReplace     = modifierMatch[2];
			const degreeToReplaceWith = modifierMatch[1]

			// find the index of the degree to be replaced
			const replaceAtIndex = this.degrees.findIndex( ( degree ) => {
				return degree === degreeToReplace;
			} );

			// if degree to replace doesnt exist push onto end of degrees array
			// else replace at defined index
			if ( replaceAtIndex === -1 ) {
				this.degrees.push( degreeToReplaceWith );
			} else {
				this.degrees.splice( replaceAtIndex, 1, degreeToReplaceWith );
			}
		}
	} );
}

Chord.prototype._define = function( symbol, rootSymbol, bottomSymbol ) {
	this.symbol = symbol;
	this.root   = new Note( rootSymbol );

	this.intervals = this.degrees.map( ( degree ) => {
		return new Interval( degree, rootSymbol );
	} );

	this.notes = new Note.Collection.fromIntervals( this.intervals );
}

//
// Builder
//

Chord.Builder = function() {

}

module.exports = Chord;
