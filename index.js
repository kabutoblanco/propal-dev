const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/api/meta', (req, res) => {
	let rawdata = fs.readFileSync('./meta.json');
	let data = JSON.parse(rawdata);
	res.json(data);
});

app.get('/api/body', (req, res) => {
  let rawdata = fs.readFileSync('./data.json');
  let data = JSON.parse(rawdata);
  res.json(data);
});

app.patch('/api/body/:id', (req, res) => {
	console.log(req.body);
	const i = req.params.id;
	let rawdata = fs.readFileSync('./data.json');
  	let data = JSON.parse(rawdata);
	console.log(data[0].observations);
	data[i].turn_a = req.body.turn_a ? req.body.turn_a : data[i].turn_a;
	data[i].turn_b = req.body.turn_b ? req.body.turn_b : data[i].turn_b;
	data[i].turn_c = req.body.turn_c ? req.body.turn_c : data[i].turn_c;
	data[i].observations[0] = req.body.observations[0] ? req.body.observations[0] : data[i].observations[0];
	data[i].observations[1] = req.body.observations[1] ? req.body.observations[1] : data[i].observations[1];
	data[i].observations[2] = req.body.observations[2] ? req.body.observations[2] : data[i].observations[2];
	fs.writeFileSync('./data.json', JSON.stringify(data));
	res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
