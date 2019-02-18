const main = require('./main');
// Sudoku library will be injected
const sudoku = require('./sudoku/sudoku').sudoku;

test('starts new game without error', () => {
    try {
        const instance = main(this, sudoku);
        instance.startGame();
    } catch (e) {
        fail(e);
    }
});

test('app navigates without error', () => {
    const game = main(this, sudoku);
    game.startGame();
    for (let i = 0; i < 10000; i++) {
        // 0-3
        switch (Math.floor(Math.random() * 4)) {
            case 0:
                game.up();
                break;
            case 1:
                game.down();
                break;
            case 2:
                game.right();
                break;
            case 3:
                game.left();
                break;
        }
    }
});

test('app plays without error', () => {
    const game = main(this, sudoku);
    game.startGame();
    for (let i = 0; i < 20000; i++) {
        // 0-81, 0-9
        if (game.play(Math.floor(Math.random() * 82), Math.floor(Math.random() * 10)) === true) {
            /* This test will usually complete the game six times over
               adjust the difficulty randomly on completion */
            game.startGame(Math.floor(Math.random() * 6));
        };
    }
});
