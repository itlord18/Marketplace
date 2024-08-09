import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const productsApi = createApi({
    reducerPath: `productsApi`,
    tagTypes: [`products`,'basket'],
    baseQuery: fetchBaseQuery({baseUrl: `http://localhost:3001/`}),
    endpoints: (build) => ({
        getProducts: build.query({
            query: () => `products`,
            providesTags: (result) => result
                  ? [
                      ...result.map(({ id }) => ({ type: 'products', id })),
                      { type: 'products', id: 'LIST' },
                    ]
                  : [{ type: 'products', id: 'LIST' }],
        }),
        getProduct: build.query({
            query: (id) => `products/${id}`,
            invalidatesTags: [{type: `products`, id: `LIST`}],
        }),
        addBasketProduct: build.mutation({
            query: (body) => ({
                url: `basket`,
                method: `POST`,
                body,
            }),
            invalidatesTags: [{type: `basket`, id: `LIST`}],
        }),
        getBasketProducts: build.query({
            query: () => `basket`,
            providesTags: (result) => result
                  ? [
                      ...result.map(({ id }) => ({ type: 'basket', id })),
                      { type: 'basket', id: 'LIST' },
                    ]
                  : [{ type: 'basket', id: 'LIST' }],
        }),
        getBasketProduct: build.query({
            query: (id) => `basket/${id}`,
            invalidatesTags: [{type: `basket`, id: `LIST`}],
        }),
        updateBasketProduct: build.mutation({
            query: (body) => ({
                url: `basket`,
                method: `PUT`,
                body,
            }),
            invalidatesTags: [{type: `basket`, id: `LIST`}],
        }),
    }),
});

export const { useGetProductsQuery, useAddBasketProductMutation , useGetProductQuery, useGetBasketProductsQuery, useGetBasketProductQuery, useUpdateBasketProductMutation} = productsApi;