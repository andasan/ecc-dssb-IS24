import { useMutation } from 'react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';

export const deleteProduct = async (id: number): Promise<void> => {
    await axios.delete(`/products/${id}`);
}

type UseDeleteProductOptions = {
  config?: MutationConfig<typeof deleteProduct>;
};

export const useDeleteProduct = ({ config }: UseDeleteProductOptions = {}) => {
  return useMutation({
    onError: (_, __, context: any) => {
      if (context?.previousProduct) {
        queryClient.setQueryData('products', context.previousProduct);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries('products');
    },
    ...config,
    mutationFn: deleteProduct,
  });
};
