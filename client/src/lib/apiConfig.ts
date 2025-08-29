// Alternative API configuration
const API_CONFIGS = {
  development: {
    baseURL: 'http://localhost:3000',
    mode: 'cors'
  },
  production: {
    baseURL: 'https://ai-career-suggestion.as.r.appspot.com',
    mode: 'cors',
    // Fallback configuration
    fallback: {
      baseURL: 'https://api.allorigins.win/get?url=',
      mode: 'proxy'
    }
  }
};

export { API_CONFIGS };
