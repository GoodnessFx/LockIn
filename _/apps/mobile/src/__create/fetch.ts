// Simple fetch polyfill for React Native
const updatedFetch = (url: string, options?: RequestInit): Promise<Response> => {
  return fetch(url, options);
};

export default updatedFetch;