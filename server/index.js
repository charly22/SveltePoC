const fs = require('fs');
const express = require('express');
const fetch = require("node-fetch");

const app = express()

const Viz = require('../build/Viz-ssr');
const API = require('../src/api.js');

const api = new API('https://widgets.olapic-cdn.com');
const fillTemplate = require('es6-dynamic-template');
const HTMLShell = fs.readFileSync('server/index.html', 'utf-8');

app.use(express.static('./build/public'))

let data;
let cssCache = {};

app.get('/:hash/css', async (req, res) => {
	res.status(200);
	res.set('Content-type', 'text/css');
	res.send(
		cssCache[req.params.hash]
	)
})

app.get('/:hash', async (req, res) => {

	if (req.params.hash === 'favicon.ico') {
		res.status(200).end();

		return;
	}

	res.status(200);
	res.set('Content-type', 'text/html');

	if (!data) {
		const mediaUrl = await api.getMediaLink(req.params.hash)

		const datax = await api.getMedia(mediaUrl);

		data = {
			segments: {
				name: 'Pepe BE',
				images: datax.images,
				next: datax.next
			}
		};
	}

	const { html, css } = Viz.render(data);

	cssCache[req.params.hash] = css.code

	res.send(
		fillTemplate(
			HTMLShell,
			{
				state: Buffer.from(JSON.stringify(data)).toString('base64'),
				html: html,
				hash: req.params.hash,
			}
		)
	);
});

app.listen(3000, () => {
	console.log('http://localhost:3000/')
})
