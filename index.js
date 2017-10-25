const Note     = require( './source/Note' );
const Interval = require( './source/Interval' );
const Chord    = require( './source/Chord' );
const Scale    = require( './source/Scale' );
const Key      = require( './source/Key' );

// const scale = new Scale( 'major', 'C' );
// console.log( scale.degree( 2 ) );

// const chord = new Chord( 'C#maj7sus4' );
// console.log( chord.degree( 4 ) );

const key = new Key( 'F' );

module.exports = { Note, Interval, Chord, Scale, Key };
