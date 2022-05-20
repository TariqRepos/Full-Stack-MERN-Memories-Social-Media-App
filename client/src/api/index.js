// Axios is used to send asynchronous HTTP requests to REST endpoints, communicates with the backend

import axios from 'axios';

const url = 'http://localhost:5000/posts';

export const fetchPosts = () => axios.get(url);