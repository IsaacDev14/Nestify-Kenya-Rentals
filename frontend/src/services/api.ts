import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const propertyService = {
    getAll: async () => {
        const response = await api.get('/properties');
        return response.data;
    },
    getById: async (id: number) => {
        const response = await api.get(`/properties/${id}`);
        return response.data;
    },
};

export const categoryService = {
    getAll: async () => {
        const response = await api.get('/categories');
        return response.data;
    },
};

export const bookingService = {
    create: async (bookingData: any) => {
        const response = await api.post('/bookings', bookingData);
        return response.data;
    },
    getUserBookings: async () => {
        const response = await api.get('/bookings');
        return response.data;
    },
};
