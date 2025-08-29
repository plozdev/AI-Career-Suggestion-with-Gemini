import { QueryClient } from "@tanstack/react-query";

// API Base URL - với fallback URLs để test
const PRODUCTION_API_URLS = [
  'https://ai-career-suggestion.as.r.appspot.com',
  'https://ai-career-suggestion.appspot.com'  // Backup URL
];

const API_BASE_URL = import.meta.env.DEV 
  ? 'http://localhost:3000'
  : PRODUCTION_API_URLS[0]; // Primary production URL

async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Debug logging
  console.log('API Request:', {
    url,
    isDev: import.meta.env.DEV,
    baseURL: API_BASE_URL,
    method: options.method || 'GET',
    userAgent: navigator.userAgent,
    origin: window.location.origin
  });
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    console.log('API Response:', {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries())
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    console.error('Request details:', { url, config });
    throw error;
  }
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey }) => {
        const [endpoint] = queryKey as [string];
        return apiRequest(endpoint);
      },
    },
  },
});

export { apiRequest };
