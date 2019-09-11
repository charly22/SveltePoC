const fs = require('fs');
const express = require('express');
const spdy = require('spdy');
const fetch = require("node-fetch");
const app = express()

const Viz = require('../build/Viz-ssr');
const Api = require('../src/Api.js');

const api = new Api('https://widgets.olapic-cdn.com');
app.use(express.static('./public'))

app.get('/:hash/html', async (req, res) => {

	const hash = req.params.hash;

	data = await api.getMediaFromHash(req.params.hash)

	// TODO Viz should be instantiated by hash (or ID)
	const { html, css } = Viz.render(data);

	res.push(`/${hash}/css`, {
		status: 200,
    method: 'GET',
    request: {accept: '*/*'},
		response: {'content-type': 'text/css'}
	})
	.on('error', () => {})
	.end(css.code)

	res.push(`/${hash}/state`, {
		status: 200,
    method: 'GET',
    request: {accept: '*/*'},
		response: {'content-type': 'application/json'}
	})
	.on('error', () => {})
	.end(JSON.stringify(data))

	res.push(`/${hash}/app`, {
		status: 200,
    method: 'GET',
    request: {accept: '*/*'},
		response: {'content-type': 'application/javascript'}
	})
	.on('error', () => {})
	.end(fs.readFileSync(__dirname + '/../build/bundle.js'))

	res.status(200);
	res.set('Content-type', 'text/html');
	res.end(html);

});

spdy
	.createServer({
		key: fs.readFileSync(__dirname + '/localhost-privkey.pem'),
	  cert:  fs.readFileSync(__dirname + '/localhost-cert.pem'),
	}, app)
	.listen(4443, 'localhost', () => {
		console.log('https://localhost:4443/')
	});
