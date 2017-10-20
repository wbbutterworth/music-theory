const chords = require( './data.json' );

const Chord = function( symbol ) {
	const match = symbol.match( /(^[A-G])([maj|m|dim|aug]*[7|9|11|13]*)($|sus[2|4]|add[2|4|6]|#4)/ );
	const root  = match && match[1] ? match[1] : undefined;
	const abbr  = match && match[2] ? match[2] : 'maj';
	const mod   = match && match[3] ? match[3] : undefined;

	console.log( root, abbr, mod );
}

module.exports = Chord;
