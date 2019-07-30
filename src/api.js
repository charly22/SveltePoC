const fetch = require("node-fetch");

class API {
  
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }
  
  getPreloadLinks(hash) {
    return fetch(`${this.baseUrl}/widgets/${hash}/preload`)
      .then(res => res.json());
      
    return links;
  }
}

module.exports = API;





