/*
    Secret Sudoku - github.com/healeycodes
*/

const secretSudoku = () => {
    this.ss = 'Secret_Sudoku_~_row:';
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

    this.startGame = (diff = 'easy') => {
        this.time = Date.now();
        this.board = Array.from(sudoku.generate(diff));
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

    // Main render function
    this.render = (extra = '') => {
        window.location.hash = `${this.ss}${this.rowMap[this.row]}__${this.prettifyRow(this.currRow(), this.cursor)}${extra}`;
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
            default:
                // Play attempt
                const num = Number(e.key);
                if (num > 0 || num < 10) {
                    this.play(this.cursor + this.row * 9, num)
                }
                break;
        }
    });

    // Attempt to fill in a square
    this.play = (loc, num) => {
        // Is the square free?
        if (this.board[loc] !== '.') {
            return false;
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
    console.log(this.board);
    this.render();
}
secretSudoku();