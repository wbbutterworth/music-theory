const Chord    = require( './source/Chord' );
const Note     = require( './source/Note' );
// const Interval = require( './source/Interval' );

// const first = new Interval( 'P1' );
// const third = new Interval( 'M3' );
// const fifth = new Interval( 'P5' );
// const intervals = [ first, third, fifth ];

// console.log( new Note.Collection.fromIntervals( 'C', intervals ) );
// console.log( interval.getNote( 'C' ) );
// new Chord( 'Cmsus2sus4add13#11b5' );
const chord = new Chord( 'Gmaj7' );
console.log( chord );
