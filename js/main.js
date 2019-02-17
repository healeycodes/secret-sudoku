/*
    Secret Sudoku - github.com/healeycodes
*/

const secretSudoku = () => {
    this.sudoku = window.sudoku;
    window.location.hash = '';
    this.board = '';
    this.time = null;
    this.tick = '✔️';
    this.cross = '❌';
    this.cursorIcon = '👉';
    this.cursor = 0;
    this.row = 0;
    this.rowMap = {
        0: 'one__',
        1: 'two__',
        2: 'three',
        3: 'four_',
        4: 'five_',
        5: 'six__',
        6: 'seven',
        7: 'eight',
        8: 'nine_'
    }
    this.difficulty = 1;
    this.difficultyMap = {
        0: 'easy',
        1: 'medium',
        2: 'hard',
        3: 'very-hard',
        4: 'insane',
        5: 'inhuman'
    }

    // Starts a new game!
    this.startGame = (diff = 0) => {
        this.time = Date.now();
        this.board = Array.from(sudoku.generate(this.difficultyMap[diff]));
        this.render();
    }

    // @returns the focused row
    this.currRow = () => this.board.slice(this.row * 9, (this.row * 9) + 9);

    // @returns a prettified row, with cursor placement
    this.prettifyRow = (row, cursor) => {
        let pretty = '';
        for (var i = 0; i < row.length; i++) {
            // Pre-number
            if (i === cursor) {
                pretty += `|${this.cursorIcon}`;
            } else {
                pretty += '|__';
            }

            // Number or '?'
            pretty += (row[i] === '.') ? '?' : row[i];

            // Post-number
            if (i + 1 % 3 === 0) {
                pretty += '__|';
            } else {
                pretty += '__';
            }
        }
        return pretty + '|';
    }

    // Main render functions
    this.squaresLeft = () => this.board.join('').match(/[^.]/g).length
    this.completeness = () => `${this.squaresLeft()}/81`;
    this.start = () => `Secret_Sudoku_~_${this.completeness()}_~_row:`;
    this.render = (extra = '') => {
        window.location.hash = `${this.start()}${this.rowMap[this.row]}__${this.prettifyRow(this.currRow(), this.cursor)}${extra}`;
    }

    // Navigation
    this.endNav = () => {
        this.render();
        return false;
    }
    this.up = () => {
        if (this.row < 8) {
            this.row += 1;
        }
        return this.endNav();
    }
    this.down = () => {
        if (this.row > 0) {
            this.row -= 1;
        }
        return this.endNav();
    }
    this.right = () => {
        if (this.cursor < 8) {
            this.cursor += 1;
        }
        return this.endNav();
    }
    this.left = () => {
        if (this.cursor > 0) {
            this.cursor -= 1;
        }
        return this.endNav();
    }
    addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'ArrowUp':
                this.down();
                break;
            case 'ArrowDown':
                this.up();
                break;
            case 'ArrowRight':
                this.right();
                break;
            case 'ArrowLeft':
                this.left();
                break;
            case ',':
                if (this.difficulty < 5) {
                    this.difficulty += 1;
                }
                this.startGame(this.difficulty);
                break;
            case '.':
                if (this.difficulty > 0) {
                    this.difficulty -= 1;
                }
                this.startGame(this.difficulty);
                break;
            default:
                // Number keys, allow input attemps
                const num = Number(e.key);
                if (num > 0 || num < 10) {
                    this.play(this.cursor + this.row * 9, num)
                }
                break;
        }
    });

    // Attempts to fill in a square
    this.play = (loc, num) => {
        // Is the square free?
        if (this.board[loc] !== '.') {
            return this.render(`_${this.cross}`);
        }

        let boardCopy = JSON.parse(JSON.stringify(this.board));
        boardCopy[loc] = num;
        // Can the board be solve with this addition?
        if (this.sudoku.solve(boardCopy.join('')) !== false) {
            this.board[loc] = num;
        } else {
            return this.render(`_${this.cross}`);
        }

        this.render(`_${this.tick}`);
    }

    // Create initial board
    this.startGame();
}
secretSudoku();