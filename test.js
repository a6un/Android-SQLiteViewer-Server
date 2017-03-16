var fs = require("fs");


fs.readFile('mock.json', (err, data) => {
  if (err) throw err;
  var data = data.toString();

  var json = JSON.parse(data);

  console.log(json.db_1.table_1);

});