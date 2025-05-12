import useSWR from "swr";
import { fetcher } from "../utils/fetch";
import { ApiResponse } from "@/types/api";
import { Product } from "@/types/product";

export const useProducts = () => {
    const {data, error, isLoading}: ApiResponse<Product[]> = useSWR(
        "https://fakestoreapi.com/products",
        fetcher
    )

   return {
    data,
    error,
    isLoading,
};
 
};

export default useProducts;