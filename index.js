const Note     = require( './source/Note' );
const Interval = require( './source/Interval' );
const Chord    = require( './source/Chord' );

const chord = new Chord( 'C7b9#11' );
console.log( chord.notes.symbols() );
