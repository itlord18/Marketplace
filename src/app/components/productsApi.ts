import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

// ---- TYPES ----
export interface Product {
  id: number;
  title: string;
  price: number;
  quantity?: number;
  color?: string;
  type?: string;
  inventory?: number;
}

export interface BasketProduct {
  id: number;
  title: string;
  price: number;
  quantity: number;
  color: string;
}

// ---- API ----
export const productsApi = createApi({
  reducerPath: 'productsApi',
  tagTypes: ['products', 'basket'],
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (build) => ({
    getProducts: build.query<Product[], string | void>({
      query: (query = '') => `/products?${query}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'products' as const, id })),
              { type: 'products', id: 'LIST' },
            ]
          : [{ type: 'products', id: 'LIST' }],
    }),

    getProduct: build.query<Product, number>({
      query: (id) => `/products/${id}`,
      providesTags: (result, error, id) => [{ type: 'products', id }],
    }),

    addBasketProduct: build.mutation<BasketProduct, BasketProduct>({
      query: (body) => ({
        url: `/basket`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'basket', id: 'LIST' }],
    }),

    getBasketProducts: build.query<BasketProduct[], void>({
      query: () => `/basket`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: 'basket' as const,
                id,
              })),
              { type: 'basket', id: 'LIST' },
            ]
          : [{ type: 'basket', id: 'LIST' }],
    }),

    getBasketProduct: build.query<BasketProduct, number>({
      query: (id) => `/basket/${id}`,
      providesTags: (result, error, id) => [{ type: 'basket', id }],
    }),

    updateBasketProduct: build.mutation<BasketProduct, BasketProduct>({
      query: ({ id, ...body }) => ({
        url: `/basket/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: [{ type: 'basket', id: 'LIST' }],
    }),

    deleteBasketProduct: build.mutation<{ success: boolean }, number>({
      query: (id) => ({
        url: `/basket/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'basket', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useAddBasketProductMutation,
  useGetProductQuery,
  useGetBasketProductsQuery,
  useGetBasketProductQuery,
  useUpdateBasketProductMutation,
  useDeleteBasketProductMutation,
} = productsApi;
