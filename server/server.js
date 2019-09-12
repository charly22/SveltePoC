const fs = require('fs')
const express = require('express')
const spdy = require('spdy')
const fetch = require("node-fetch")
const fillTemplate = require('es6-dynamic-template');
const Api = require('../src/Api.js')

const loader = fs.readFileSync(__dirname + '/../src/loader.js').toString();

const api = new Api('https://widgets.olapic-cdn.com')

const app = express()
app.use(express.static('./public'))

app.get('/:hash/loader', async (req, res) => {
	const hash = req.params.hash
	
	const data = await api.getMediaFromHash(req.params.hash)
	
	// TODO Viz should be by hash
	const Viz = require('../build/Viz-ssr')
	const { html, css } = Viz.render(data)
	
	res
		.push(`/${hash}/html`, {
			status: 200,
			method: 'GET',
			request: {accept: '*/*'},
			response: {'content-type': 'text/html'}
		})
		.on('error', () => {})
		.end(html)

	res
		.push(`/${hash}/css`, {
			status: 200,
	    method: 'GET',
	    request: {accept: '*/*'},
			response: {'content-type': 'text/css'}
		})
		.on('error', () => {})
		.end(css.code)

	res
		.push(`/${hash}/state`, {
			status: 200,
	    method: 'GET',
	    request: {accept: '*/*'},
			response: {'content-type': 'application/json'}
		})
		.on('error', () => {})
		.end(JSON.stringify(data))

	res
		.push(`/${hash}/app`, {
			status: 200,
	    method: 'GET',
	    request: {accept: '*/*'},
			response: {'content-type': 'application/javascript'}
		})
		.on('error', () => {})
		.end(fs.readFileSync(__dirname + '/../build/bundle.js'))

	res
		.status(200)
	 	.set('Content-type', 'text/html')
		.end(fillTemplate(loader, {hash: hash}))
})

spdy
	.createServer({
		key: fs.readFileSync(__dirname + '/localhost-privkey.pem'),
	  cert:  fs.readFileSync(__dirname + '/localhost-cert.pem'),
	}, app)
	.listen(4443, 'localhost', () => {
		console.log('https://localhost:4443/')
	})
