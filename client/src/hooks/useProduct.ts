import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { Product } from '@/data/schema';

export const getProducts = async (): Promise<{ products: Product[] }> => {
  return await axios.get('/products');
};

type QueryFnType = typeof getProducts;

type UseProductOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useProduct = ({ config }: UseProductOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['products'],
    queryFn: () => getProducts(),
  });
};
