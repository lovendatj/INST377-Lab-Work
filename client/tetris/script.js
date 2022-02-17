// DOM Event Listener
document.addEventListener('DOMContentLoaded', () => {
    const [grid, squares] = createSquareInGrid(150, 'grid');
    
});


const createSquareInGrid = (numbers, parent) => {
    console.log('Creating Grid');
    let grid = document.querySelector('.grid');
    for (let i = 0; i < numbers; i++) {
        var square = document.createElement('div');
        grid.appendChild(square);
    }
    return (
        grid,
        Array.from(document.querySelectorAll('.grid div'))
    )
}