import { useMutation } from 'react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';

import { Product, ProductFormSchemaType } from '@/data/schema';

interface ProductUpdate {
  id: string | undefined;
  product: ProductFormSchemaType;
}

export const updateProduct = async (product: ProductUpdate): Promise<Product> => {
  return await axios.put(`/products/${product.id}`, product);
}

type UseUpdateProductOptions = {
  config?: MutationConfig<typeof updateProduct>;
};

export const useUpdateProduct = ({ config }: UseUpdateProductOptions = {}) => {
  return useMutation({
    onSuccess: (data: any) => {
      queryClient.refetchQueries(['products', data.id]);
    },
    onError: (_, __, context: any) => {
      if (context?.previousProduct) {
        queryClient.setQueryData(
          ['products', context.previousProduct.id],
          context.previousProduct
        );
      }
    },
    ...config,
    mutationFn: updateProduct,
  });
};
