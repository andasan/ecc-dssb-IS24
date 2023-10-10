import Axios, { InternalAxiosRequestConfig } from 'axios';

import config from '@/lib/config';
import { toast } from '@/components/ui/use-toast';

function requestInterceptor(reqConfig: InternalAxiosRequestConfig) {
    reqConfig.headers!.Accept = 'application/json';
    return reqConfig;
}

export const axios = Axios.create({
    baseURL: config.API_URL,
});

axios.interceptors.request.use(requestInterceptor);
axios.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        const message = error.response?.data?.message || error.message;

        toast({
            title: "Uh oh! Something went wrong.",
            description: message,
            variant: "destructive",
        });

        return Promise.reject(error);
    }
);
