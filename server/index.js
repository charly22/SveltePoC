const fs = require('fs');
const express = require('express');
const fetch = require("node-fetch");

const app = express()

const Viz = require('../build/Viz-ssr');
const API = require('../src/api.js');

const api = new API('https://widgets.olapic-cdn.com');
const template = fs.readFileSync('server/index.html', 'utf-8');

app.use(express.static('./build/public'))

app.get('/:hash', async (req, res) => {

	if (req.params.hash === 'favicon.ico') {
		res.status(200).end();

		return;
	}

	res.status(200);
	res.set('Content-type', 'text/html');

	const mediaUrl = await api.getMediaLink(req.params.hash)

	const datax = await api.getMedia(mediaUrl);

	const data = {
		segments: {
			name: 'Pepe BE',
			images: datax.images,
			next: datax.next
		}
	};

	const { html, css } = Viz.render(data);

	res.send(template
		.replace('$__OLAPIC_PRELOADED_STATE__', Buffer.from(JSON.stringify(data)).toString('base64'))
		.replace('<!-- viz -->', html)
		.replace('/* css */', css.code)
	);
});

app.listen(3000, () => {
	console.log('http://localhost:3000/')
})
