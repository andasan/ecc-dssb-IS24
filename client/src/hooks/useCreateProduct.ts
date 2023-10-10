import { useMutation } from 'react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';

import { Product, ProductFormSchemaType } from '@/data/schema';

export const createProduct = async (product: ProductFormSchemaType): Promise<Product> => {
  return axios.post('/products', {product});
}

type UseCreateProductOptions = {
  config?: MutationConfig<typeof createProduct>;
};

export const useCreateProduct = ({ config }: UseCreateProductOptions = {}) => {
  return useMutation({
    onError: (_, __, context: any) => {
      if (context?.previousProducts) {
        queryClient.setQueryData('products', context.previousProducts);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries('products');
    },
    ...config,
    mutationFn: createProduct,
  });
};
