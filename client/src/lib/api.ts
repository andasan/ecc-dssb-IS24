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

