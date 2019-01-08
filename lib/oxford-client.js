const axios = require('axios');

// export defauls class OxfordClient {}
module.exports = class OxfordClient {
  constructor(appId, appKey){
    this.appId = appId;
    this.appKey = appKey;

    this.baseURL = "https://od-api.oxforddictionaries.com/api/v1";

    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Accept': 'application/json',
        'app_id': this.appId,
        'app_key': this.appKey
      }
    });
  }

  async getEntries(word){
    const res = await this.client.get(`/entries/en/${word}`)
    
    return res.data;
  }
}