const fs = require('fs')
const express = require('express')
const spdy = require('spdy')
const fetch = require("node-fetch")
const fillTemplate = require('es6-dynamic-template');
const Api = require('../src/Api.js')

const loader_bundle = fs.readFileSync(__dirname + '/../src/loader_bundle.js').toString();
const loader_h2 = fs.readFileSync(__dirname + '/../src/loader_h2.js').toString();

const api = new Api('https://widgets.olapic-cdn.com')

const app = express()
app.use(express.static('./public'))

app.get('/:hash/loader_bundle', async (req, res) => {
	const hash = req.params.hash

	const data = await api.getMediaFromHash(req.params.hash)

	// TODO Viz should be by hash
	const Viz = require('../build/Viz-ssr')
	const { html, css } = Viz.render(data)

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
		.end(fillTemplate(loader_bundle, {
			hash: hash,
			html: html,
			css: css.code,
			state: Buffer.from(JSON.stringify(data)).toString('base64')
		}))
})

app.get('/:hash/app', async (req, res) => {
	res
		.status(200)
		.set('content-type', 'application/javascript')
		.end(fs.readFileSync(__dirname + '/../build/bundle.js'))
})

app.get('/:hash/loader_h2', async (req, res) => {
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
		.end(fillTemplate(loader_h2, {hash: hash}))
})

spdy
	.createServer({
		key: fs.readFileSync(__dirname + '/localhost-privkey.pem'),
	  cert:  fs.readFileSync(__dirname + '/localhost-cert.pem'),
	}, app)
	.listen(4443, 'localhost', () => {
		console.log('https://localhost:4443/')
	})
