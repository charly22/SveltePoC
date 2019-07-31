const fs = require('fs');
const express = require('express');
const app = express()

const Viz = require('../build/Viz-ssr');
const API = require('../src/api.js');
const data = require('../src/data.json');

const api = new API('https://widgets.olapic-cdn.com');
const template = fs.readFileSync('server/index.html', 'utf-8');

app.use(express.static('./build/public'))

app.get('/:hash', (req, res) => {

	if (req.params.hash === 'favicon.ico') {
		res.status(200).end();

		return;
	}

	res.status(200);
	res.set('Content-type', 'text/html');

	// const data = getData(req);
	const datax = {
		segments: {
			name: 'Pepe BE',
			images: data.segments.images.slice().reverse()
		}
	}
	const { html, css } = Viz.render(datax);

	res.send(template
		.replace('<!-- viz -->', html)
		.replace('/* css */', css.code)
	);

});

app.listen(3000, () => {
	console.log('http://localhost:3000/')
})

async function getData(req) {
	const preloadLinks = await api.getPreloadLinks(req.params.hash);

	if (!preloadLinks.data) preloadLinks.data = {_links: []};

	const images = preloadLinks.data._links
		.filter(item => item.id === 'image')
		.map(item => item.href);

	const data = {
		segments: {
			name: 'Pepe BE',
			images: images
		}
	}
	return data;
}
