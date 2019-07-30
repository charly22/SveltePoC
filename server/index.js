const fs = require('fs');
const express = require('express');
const app = express()

const Viz = require('../build/Viz-ssr');
const API = require('../src/api.js');

const api = new API('https://widgets.olapic-cdn.com');
const template = fs.readFileSync('src/index.html', 'utf-8');

app.use(express.static('./public'))

app.get('/:hash', async (req, res) => {
	
	if (req.params.hash === 'favicon.ico') {
		res.status(400).end();
		
		return;
	}
	
	res.status(200);
	res.set('Content-type', 'text/html');
	
	const preloadLinks = await api.getPreloadLinks(req.params.hash);
	
	const images = preloadLinks.data._links
		.filter(item => item.id === 'image')
		.map(item => item.href);
	
	console.log(images);
	
	const data = {
		name: 'Pepe',
		images: images
	}
	
	const { html, css } = Viz.render({
		segments: data
	});

	res.send(template
		.replace('<!-- viz -->', html)
		.replace('/* css */', css.code)
	);
		
});

app.listen(3000, () => {
	console.log('http://localhost:3000/')
})


