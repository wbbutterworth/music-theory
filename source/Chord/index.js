// const Interval = require( './Interval' );

const Chord = function( notation ) {
	this.notation  = notation
	this.intervals = [];

	this.root = notation.match( /^[A-G]/ ).shift();
	this.quality = notation.match( /(?!^[A-G])(?:maj|m|dim|aug)/ ).shift()

	// switch ( quality ) {
	// 	case 'maj':
	// 		this.intervals.concat([
	// 			new Interval( 'M3' ),
	// 			new Interval( 'P5' ),
	// 		]);
	// 		break;

	// 	case 'm':
	// 		this.intervals.concat([
	// 			new Interval( 'm3' ),
	// 			new Interval( 'P5' ),
	// 		]);
	// 		break;

	// 	case 'dim':
	// 		this.intervals.concat([
	// 			new Interval( 'm3' ),
	// 			new Interval( 'dim5' ),
	// 		]);
	// 		break;

	// 	case 'aug':
	// 		this.intervals.concat([
	// 			new Interval( 'M3' ),
	// 			new Interval( 'A5' ),
	// 		]);
	// 		break;
	// }

	console.log( 'create chord' );
}

module.exports = Chord;
