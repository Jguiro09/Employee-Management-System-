const db = require('./db');

function getRoles()
{
    roles = [];

    db.query(`SELECT title FROM role;`, (err, results) => {
        if (err) throw err
        results.forEach(i => {roles.push(i.title)})
    })

    return roles;
}


module.exports = {getRoles}