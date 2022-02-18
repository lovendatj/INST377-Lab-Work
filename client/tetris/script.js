// DOM Event Listener
document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div');
    const scoreDisplay = document.querySelector('#score');
    const startBtn = document.querySelector('#start-button');
    let width = 10;

    // Create Shapes
    const theTetrominoes = createShapes(width);

    // Draw Shapes
    let currentPosition = 4;
    let currentRotation = 1;
    let shape_index= randomShape(theTetrominoes.length)

    _log(`shape: ${shape_index} rotation: ${currentRotation}`)

    let timerId = setInterval(moveDown, 1000);

    function moveDown(){
        undrawShapes();
        currentPosition += width;
        drawShapes();
    }

    function undrawShapes() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('tetromino');
        });
    }

    function drawShapes (offset)  {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('tetromino');
        });
    }


    const current = theTetrominoes[5][1];
    function createShapes (width)  {
        return [
            // The T Shape
            [
                [width-1, width, width+1, width*2],
                [0, width, width+1, width*2],
                [0, width-1, width, width+1],
                [0, width-1, width, width*2]
            ],
            // The Square 
            [
                [width-1, width,width*2-1,width*2],
                [width-1, width,width*2-1,width*2],
                [width-1, width,width*2-1,width*2],
                [width-1, width,width*2-1,width*2]
            ],
            // The L Shape
            [
                [width,width+1,width+2,width*2],
                [width+1, width*2-1,width*2,width*2+1],
                [0,1,width+1,width*2+1],
                [width-1, width,width+1,width*2-1]
            ],
            // The S Shape
            [
                [0,1,width-1,width],
                [0,width,width+1,width*2+1],
                [0,1,width-1,width],
                [0,width,width+1,width*2+1],
            ],
            // The Line Shape
            [
                [0,1,2,3],
                [0,width, width*2,width*3],
                [0,1,2,3],
                [0,width, width*2,width*3]
            ],
            // The Z Shape
            [
                [0,1,width+1,width+2],
                [1,width+1,width,width*2],
                [0,1,width+1,width+2],
                [1,width+1,width,width*2]
            ]
        ]
    }

    function randomShape (shape_len)   {
        return Math.floor(Math.random()*shape_len)
    }

    function _log (message)  {
        console.log(message);
    }
    
});

