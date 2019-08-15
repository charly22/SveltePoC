const fetch = require("node-fetch");

class API {

  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async getMediaLink(hash) {

  	const preloadLinks = await fetch(`${this.baseUrl}/widgets/${hash}/preload`)
      .then(res => res.json())
      .catch(() => []);

  	const next = preloadLinks.data._links
  		.find(item => item.id.indexOf('.medium.collection') > -1)


    return next.href;
  }

  async getMedia(url) {
  	const media = await fetch(url)
  		.then(res => res.json())
  		.catch(() => []);

  	const images = [];
  	media.data._embedded.media.forEach(
  		m => images.push({
  			href: m.images.mobile,
  			caption: m.caption,
  		})
  	)

  	const data = {
      images: images,
      next: 'https:' + media.data._links.next.href
  	}

  	return data
  }

}

module.exports = API;
