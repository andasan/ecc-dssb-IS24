import { ProductFormSchemaType } from '@/data/schema';
import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getProducts = async () => {
    const { data } = await api.get('/products');
    return data.products;
};

export const getProductById = async (id: string) => {
    const { data } = await api.get(`/products/${id}`);
    return data;
}

export const createProduct = async (product: ProductFormSchemaType) => {
    const { data } = await api.post('/products', product);
    return data;
}

export const updateProduct = async (id: string, product: ProductFormSchemaType) => {
    const { data } = await api.put(`/products/${id}`, product);
    return data;
}

export const deleteProduct = async (id: string) => {
    const { data } = await api.delete(`/products/${id}`);
    return data;
}

