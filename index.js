const Note     = require( './source/Note' );
const Interval = require( './source/Interval' );
const Chord    = require( './source/Chord' );
const Scale    = require( './source/Scale' );
const Key      = require( './source/Key' );

console.log( new Chord( 'Cmaj7' ) );

module.exports = { Note, Interval, Chord, Scale, Key };
