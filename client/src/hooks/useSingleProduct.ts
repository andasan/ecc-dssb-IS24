import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { Product } from '@/data/schema';

export const getProductById = async (id: string): Promise<Product> => {
  return await axios.get(`/products/${id}`);
}

type QueryFnType = typeof getProductById;

type UseProductOptions = {
  productId: string;
  config?: QueryConfig<QueryFnType>;
};

export const useSingleProduct = ({ productId, config }: UseProductOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['products', productId],
    queryFn: () => getProductById(productId),
  });
};
