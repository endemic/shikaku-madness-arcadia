var action = Arcadia.ENV.mobile ? 'tap' : 'click';
var actionGerund = Arcadia.ENV.mobile ? 'tapping' : 'clicking';

var TUTORIALS = [
    {
        // squares that need placed
        squares: [
            {position: {x: 37, y: 33}, area: 9},
            {position: {x: 37, y: 126}, area: 6},
            {position: {x: -56, y: 126}, area: 4},
            {position: {x: -56, y: 33}, area: 6}
        ],
        // position/size of hint square
        hints: [
            {position: {x: 36.5, y: 33.5}, size: {width: 109.5, height: 109.5}},
            {position: {x: 36.5, y: 124.75}, size: {width: 109.5, height: 73}},
            {position: {x: -54.75, y: 124.75}, size: {width: 73, height: 73}},
            {position: {x: -54.75, y: 33.5}, size: {width: 73, height: 109.5}}
        ],
        // hint text
        text: [
            action + ' and drag to\ndraw a rectangle on\ntop of each number.',
            'Each number\nequals the area\nof its rectangle.',
            'Rectangles cover\nonly one number.',
            'Rectangles\ncan\'t overlap!'
        ]
    }
];
