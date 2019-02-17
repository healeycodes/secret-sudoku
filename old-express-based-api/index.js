/* Express */
const express = require('express');
const app = express();
const server = require('http').Server(app);
app.use(express.static('public'));
app.use(express.json());

/* Sudoku - https://github.com/apieceofbart/sudoku.js */
const sudoku = require('./sudoku/sudoku');

/* Request a puzzle of a certain difficulty
   @returns puzzle as continuous string*/
app.post('/api/generate', (req, res) => {
    const difficulties = new Set([
        'easy',
        'medium',
        'hard',
        'very-hard',
        'insane',
        'inhuman'
    ]);
    const diff = req.body.difficulty;
    if (difficulties.has(diff)) {
        return res.send(sudoku.generate(diff));
    } else {
        res.status(400);
        return res.send('Bad request!');
    }
});

/* Request a solve attempt
   @returns false or puzzle as continuous string
*/
app.post('/api/solve', (req, res) => {
    try {
        return res.send(sudoku.solve(req.body.puzzle));
    } catch (e) {
        res.status(400);
        return res.send('Bad request!');
    }
});

if (module === require.main) {
    const PORT = process.env.PORT || 80;
    server.listen(PORT, () => {
        console.log(`App listening on port: ${PORT}`);
    });
} else {
    module.exports = app;
}