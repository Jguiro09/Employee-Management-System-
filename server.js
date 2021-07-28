const express = require('express');
const q = require('./lib/questions');

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// ? -------------------------------------------------------------------- INITIAL QUESTIONS ---------------------------------------------------------------------------------------
function askQuestions() {
    q.initialQuestions();
}

askQuestions();

app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = {askQuestions};