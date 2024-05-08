import axios from 'axios';

export async function getKeywords() {
  const response = await axios.get('https://apify-serp-api.fly.dev/api/keywords');
  return response;
}

export async function getKeywordDataById(id: string) {
  const response = await axios.get(`https://apify-serp-api.fly.dev/api/keywords/id/${id}`);
  return response;
}

export async function getKeywordDataByName(keyword: string) {
  const response = await axios.get(`https://apify-serp-api.fly.dev/api/keywords/name/${keyword}`);
  return response;
}
