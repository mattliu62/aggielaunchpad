const sql = require("sqlite3").verbose();

console.log('hello');

const mainDB = new sql.Database('aggielaunchpad.db');

let cmd = " SELECT name FROM sqlite_master WHERE type='table' AND name='AggieLaunchPadTable' ";
mainDB.get(cmd, function (err, val) {
	console.log(err, val);
});
