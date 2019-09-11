const fetch = require("node-fetch");

class API {

  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.mediaCache = {};
  }

  async _getMediaLink(hash) {
  	const preloadLinks = await fetch(`${this.baseUrl}/widgets/${hash}/preload`)
      .then(res => res.json())
      .catch(() => []);

  	const next = preloadLinks.data._links
  		.find(item => item.id === 'stream.medium.collection')

    return next.href;
  }

  async _getMediaFromUrl(url) {
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

  async getMediaFromHash(hash, useCache = true) {
    if (!this.mediaCache[hash] || !useCache) {
      const mediaLink = await this._getMediaLink(hash)
      this.mediaCache[hash] = await this._getMediaFromUrl(mediaLink)
    }
    return this.mediaCache[hash];
  }

}

module.exports = API;
