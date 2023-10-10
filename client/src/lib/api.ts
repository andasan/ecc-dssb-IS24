import { ProductFormSchemaType, Product } from '@/data/schema';
import { axios } from '@/lib/axios'

export const getProducts = async (): Promise<{ products: Product[] }> => {
    return await axios.get('/products');
};

export const getProductById = async (id: string): Promise<Product> => {
    return await axios.get(`/products/${id}`);
}

export const createProduct = async (product: ProductFormSchemaType): Promise<Product> => {
    return await axios.post('/products', {product});
}

export const updateProduct = async (id: string, product: ProductFormSchemaType): Promise<Product> => {
    return await axios.put(`/products/${id}`, product);
}

export const deleteProduct = async (id: string): Promise<Product> => {
    return await axios.delete(`/products/${id}`);
}

// const api = axios.create({
//     baseURL: '/api',
//     headers: {
//         'Content-Type': 'application/json',
//     },
// });

// export const getProducts = async () => {
//     const { data } = await api.get('/products');
//     return data.products;
// };

// export const getProductById = async (id: string) => {
//     const { data } = await api.get(`/products/${id}`);
//     return data;
// }

// export const createProduct = async (product: ProductFormSchemaType) => {
//     console.log({product});
//     const { data } = await api.post('/products', {product});
//     return data;
// }

// export const updateProduct = async (id: string, product: ProductFormSchemaType) => {
//     const { data } = await api.put(`/products/${id}`, product);
//     return data;
// }

// export const deleteProduct = async (id: string) => {
//     const { data } = await api.delete(`/products/${id}`);
//     return data;
// }

