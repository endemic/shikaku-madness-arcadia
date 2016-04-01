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
        // Use Grid.CELL_SIZE
        hints: [
            {position: {x: 36.5, y: 33.5}, size: {width: 109.5, height: 109.5}},
            {position: {x: 36.5, y: 124.75}, size: {width: 109.5, height: 73}},
            {position: {x: -54.75, y: 124.75}, size: {width: 73, height: 73}},
            {position: {x: -54.75, y: 33.5}, size: {width: 73, height: 109.5}}
        ],
        // hint text
        text: [
            action.capitalize() + ' and drag to\ndraw a rectangle on\ntop of each number.',
            'Each number\nequals the area\nof its rectangle.',
            'Rectangles cover\nonly one number.',
            'Rectangles\ncan\'t overlap!'
        ]
    }, {
        squares: [
            {position: {x: -37.2, y: 33.3}, size: {width: 111.6, height: 111.6}, area: 9},
            {position: {x: 55.8, y: 33.3}, size: {width: 74.4, height: 111.6}, area: 6},
            {position: {x: 0, y: 126.3}, size: {width: 186, height: 74.4}, area: 10}
        ],
        hints: [
            {position: {x: -37.2, y: 33.3}, size: {width: 111.6, height: 111.6}, area: 9},
            {position: {x: 55.8, y: 33.3}, size: {width: 74.4, height: 111.6}, area: 6},
            {position: {x: 0, y: 126.3}, size: {width: 186, height: 74.4}, area: 10}
        ],
        text: [
            'Rectangles for "9"\nclues are usually\n3x3 squares.',
            'The grid is only\n5x5, so a "6"\nclue needs a\n3x2 rectangle.',
            'If you make a\nmistake, ' + action + ' a\nrectangle to\nremove it.'
        ]
    }, {
        squares: [
            {position: {x: -74.4, y: 70.5}, size: {width: 36.2, height: 186}, area: 5 },
            {position: {x: 18.6, y: 14.7}, size: {width: 148.8, height: 74.4}, area: 8 },
            {position: {x: 55.8, y: 107.7}, size: {width: 74.4, height: 111.6}, area: 6 },
            {position: {x: -18.6, y: 107.7}, size: {width: 74.4, height: 111.6}, area: 6 }
        ],
        hints: [
            {position: {x: -74.4, y: 70.5}, size: {width: 36.2, height: 186}, area: 5 },
            {position: {x: 18.6, y: 14.7}, size: {width: 148.8, height: 74.4}, area: 8 },
            {position: {x: 55.8, y: 107.7}, size: {width: 74.4, height: 111.6}, area: 6 },
            {position: {x: -18.6, y: 107.7}, size: {width: 74.4, height: 111.6}, area: 6 }
        ],
        text: [
            'The "5" rectangle\nhas to be vertical;\nit can\'t overlap\nthe "6."',
            'Similarly, the "8"\nrectangle also can\'t\noverlap the "6."',
            'Both "6" rectangles\neasily fit into the\nremaining space.',
            'Good job!\nYou\'re getting\nthe hang of it!'
        ]
    }
];
