const Chord    = require( './source/Chord' );
const Note     = require( './source/Note' );
const Interval = require( './source/Interval' );

// const interval = new Interval( 'M3' );
// interval.getNote( 'C' );
// new Chord( 'Cmsus2sus4add13#11b5' );
// const chord = new Chord( 'C/Gmmaj9#11' );
// const chord2 = new Chord( 'Cmmaj9#11' );

// console.log( Note.list().length );
const collection = new Note.Collection( [ 'C', 'E', 'G#'] );
console.log( collection.getFlats() );
// const note = new Note( 'A#' );
