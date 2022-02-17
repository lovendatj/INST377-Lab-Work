// DOM Event Listener
document.addEventListener('DOMContentLoaded', () => {
    const [grid, squares] = createSquareInGrid(153, 'grid');
    const scoreDisplay = document.querySelector('#score');
    const startBtn = document.querySelector('#start-button');
    const width = 10;

    // Create Shapes
    const theTetrominoes = createShapes(width);

    // Draw Shapes
    let currentPosition = 4;
    const [shape_index, random_index] = randomPos(theTetrominoes.length, currentPosition)
    let current = theTetrominoes[shape_index][random_index];
    
    drawShapes(current, currentPosition, squares);
});

const drawShapes = (current, currentPosition, squares) => {
    current.forEach(index => {
        squares[currentPosition + index].classList.add('tetromino');
    })
}

const createSquareInGrid = (numbers, parent) => {
    console.log('Creating Grid');
    let grid = document.querySelector('.grid');
    for (let i = 0; i < numbers; i++) {
        var square = document.createElement('div');
        grid.appendChild(square);
    }
    let squares = Array.from(document.querySelectorAll('.grid div'));
    return [grid, squares];
}

const createShapes = (width) => {
    return [
        // The L Shape
        [
            [1, width+1, width*2, 2],
            [width, width+1, width+2, width*2+1],
            [2, width+1, width*2+1, width*2],
            [width+1, width*2, width*2+1, width*2 +2]
        ],
        // The Square 
        [
            [width+1, width+2,width*2,width*2+1],
            [width+1, width+2,width*2,width*2+1],
            [width+1, width+2,width*2,width*2+1],
            [width+1, width+2,width*2,width*2+1]
        ],
        // The T Shape
        [
            [width,width+1,width+2,width*2],
            [width+1, width*2,width*2+1,width*3-1],
            [width+1,width*2-1,width*2,width*2+1],
            [width+1, width*2-1,width*2,width*3-1]
        ],
        // The S Shape
        [
            [width,width+1,width*2-2,width*2-1],
            [1,width,width+1,width*2],
            [width,width+1,width*2-2,width*2-1],
            [1,width,width+1,width*2]
        ],
        // The Line Shape
        [
            [width-1,width,width+1,width+2],
            [1,width, width*2-1,width*3-2],
            [width-1,width,width+1,width+2],
            [1,width, width*2-1,width*3-2]
        ],
        // The Z Shape
        [
            [width,width+1,width*2,width*2+1],
            [2,width,width+1,width*2-1],
            [width,width+1,width*2,width*2+1],
            [2,width,width+1,width*2-1]
        ]
    ]
}

const randomPos = (shape_len, rotation)  => {
    return [
        Math.floor(Math.random()*shape_len),
        Math.floor(Math.random()*rotation)
    ]
}

const _log = (message) => {
    console.log(message);
}