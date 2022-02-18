// DOM Event Listener
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const squares = document.querySelectorAll('.grid div');
    const scoreDisplay = document.querySelector('#score');
    const startBtn = document.querySelector('#start-button');
    const nextUp = document.querySelector('.mini-grid');
    const nextUpSquares = document.querySelectorAll('.mini-grid div');
    let width = 10;
    let upnextWidth = 4

    // Create Shapes
    const theTetrominoes = createShapes(width);

    // Create Up Next Shapes
    const upNextTetrominoes = createUpNextShapes(upnextWidth);

    // Draw Shapes
    let currentPosition = 4;
    let currentRotation = 0;
    let upnextIndex = 0;
    let upnextRandom = 0;
    const shape_index= randomShape(theTetrominoes.length)
    let current = theTetrominoes[shape_index][currentRotation];

    timerId = null;

    document.addEventListener('keyup', keyControl);

    startBtn.addEventListener('click', () => {
        if (timerId) {
            clearInterval(timerId);
            timerId = null;
        } else {
            timerId = setInterval(moveDown, 1000);
        }   
    });

    function addScore() {
        for (let i = 0; i < 199; i +=width) {
            const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]      
            if(row.every(index => squares[index].classList.contains('taken'))) {
                currScore = scoreDisplay.value
                if (scoreDisplay.value=="NaN")
                    currScore = 0;
                score = 10 + currScore
                scoreDisplay.innerHTML = score
                row.forEach(index => {
                squares[index].classList.remove('taken')
                squares[index].classList.remove('tetromino')
                })
                const squaresRemoved = squares.splice(i, width)
                squares = squaresRemoved.concat(squares)
                squares.forEach(cell => grid.appendChild(cell))
            }
        }
    }

    function gameOver() {
        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            scoreDisplay.innerHTML = 'end'
            clearInterval(timerId)
        }
    }
    
    function keyControl(e) {
        if (e.keyCode === 37) {
            moveLeft();
        } 
        else if (e.keyCode === 38) {
            rotate();
        } 
        else if (e.keyCode === 39) {
            moveRight();
        }
        else if (e.keyCode === 40 || e.keyCode === 32 ){
            moveDown();
        }
    }

    function moveDown(){
        undrawShapes();
        currentPosition += width;
        drawShapes();
        freeze();
    }

    function freeze(){
        if(current.some(index => 
            squares[currentPosition + index + width].classList.contains('taken'))){
                current.forEach(index => 
                    squares[currentPosition + index].classList.add('taken'))
                random = upnextRandom
                upnextRandom = Math.floor(Math.random() * theTetrominoes.length);
                current = theTetrominoes[random][currentRotation];
                currentPosition = 4;
                drawShapes();
                displayNextShape();
                addScore();
                gameOver()
        }
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

    function createUpNextShapes(width) {
        return [
            [width, width+1, width+2, width*2+1],
            [width, width+1,width*2,width*2+1],
            [width,width+1,width+2,width*2],
            [1,2,width,width+1],
            [0,1,2,3],
            [0,1,width+1,width+2],
        ]
    }

    function displayNextShape() {
        nextUpSquares.forEach(square => {
            square.classList.remove('tetromino');
        });
        upNextTetrominoes[upnextRandom].forEach(index => {
            nextUpSquares[upnextIndex + index].classList.add('tetromino');
        });
    }
    
    function moveLeft () {
        undrawShapes();
        const isLeftEdge = current.some(index => (currentPosition + index) % width === 0);
        
        if(!isLeftEdge) currentPosition -= 1;
        if(current.some(index => 
            squares[currentPosition + index].classList.contains('taken'))){
                currentPosition += 1;
        }   
        drawShapes();
    }

    function moveRight () {
        undrawShapes();
        const isRightEdge = current.some(index => (currentPosition + index) % width === width - 1);

        if(!isRightEdge) currentPosition += 1;
        if(current.some(index =>
            squares[currentPosition + index].classList.contains('taken'))){
                currentPosition -= 1;
        }   
        drawShapes();
    }

    function rotate () {
        undrawShapes();
        currentRotation++;
        if(currentRotation === current.length) {
            currentRotation = 0;
        }
        current = theTetrominoes[upnextRandom][currentRotation];
        drawShapes();
    }

    function randomShape (shape_len)   {
        return Math.floor(Math.random()*shape_len)
    }

    function _log (message)  {
        console.log(message);
    }
    
});

