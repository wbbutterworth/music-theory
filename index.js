const Note     = require( './source/Note' );
const Interval = require( './source/Interval' );
const Chord    = require( './source/Chord' );
const Scale    = require( './source/Scale' );
const Key      = require( './source/Key' );

// const scale = new Scale( 'major', 'C' );
// console.log( scale.degree( 2 ) );

// const chord = new Chord( 'C#maj7' );
// console.log( chord.notes.symbols() );

const key = new Key( 'C#' );
console.log( key.IV7.notes.symbols() );

module.exports = { Note, Interval, Chord, Scale, Key };
