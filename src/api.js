import axios from "axios";

const API_URL = 'https://api.themoviedb.org/3';
const API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNTYwMzMzYjEwMTdmNTI2N2RkY2EzMzIyN2VmZWE3NiIsIm5iZiI6MTczMDcyNTMyNS40MTA3NDEzLCJzdWIiOiI2NzI4YmI5OTVhZjI5ZTg4NTUzYjFiMzEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Nvt8vvj2VU348y8H0i7u0cGbU7x5MJ6FicN_JXzGcqA';
const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        Authorization: `Bearer ${API_TOKEN}`,
    },
});

export const fetchTrendingMovies = async () => {
    const response = await apiClient.get('/trending/movie/day');
    return response.data.results;
};

export const searchMovies = async (query) => {
    const response = await apiClient.get('/search/movie', { params: { query } });
    return response.data.results;
};

export const fetchMovieDetails = async (movieId) => {
    const response = await apiClient.get(`/movie/${movieId}`);
    return response.data;
};

export const fetchMovieCredits = async (movieId) => {
    const response = await apiClient.get(`/movie/${movieId}/credits`);
    return response.data.cast;
};

export const fetchMovieReviews = async (movieId) => {
    const response = await apiClient.get(`/movie/${movieId}/reviews`);
    return response.data.results; 
};
