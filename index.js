const Note     = require( './source/Note' );
const Interval = require( './source/Interval' );
const Chord    = require( './source/Chord' );
const Scale    = require( './source/Scale' );
const Key      = require( './source/Key' );

const chord = new Chord( 'Cmaj7' );
console.log( chord );

module.exports = { Note, Interval, Chord, Scale, Key };
