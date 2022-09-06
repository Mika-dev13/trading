import axios from 'axios';
const TOKEN = 'ccbj6gqad3i07p03rpm0';
export default axios.create({
  baseURL: 'https://finnhub.io/api/v1',
  params: {
    token: TOKEN,
  },
});
