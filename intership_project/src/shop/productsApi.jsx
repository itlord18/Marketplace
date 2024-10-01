import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = import.meta.env.VITE_REACT_APP_API_BASE_URL;


export const productsApi = createApi( {
    reducerPath: `productsApi`,
    tagTypes: [ `products`,'basket' ],
    baseQuery: fetchBaseQuery( { baseUrl } ),
    endpoints: ( build ) => ( {
        getProducts: build.query( {
            query: ( query = `` ) => `/products?${query}`,
            providesTags: ( result ) => result
                  ? [
                      ...result.map( ( { id } ) => ( { type: 'products', id } ) ),
                      { type: 'products', id: 'LIST' },
                    ]
                  : [ { type: 'products', id: 'LIST' } ],
        } ),
        getProduct: build.query( {
            query: ( id ) => `/products/${id}`,
            invalidatesTags: [ { type: `products`, id: `LIST` } ],
        } ),
        addBasketProduct: build.mutation( {
            query: ( body ) => ( {
                url: `/basket`,
                method: `POST`,
                body,
            } ),
            invalidatesTags: [ { type: `basket`, id: `LIST` } ],
        } ),
        getBasketProducts: build.query( {
            query: () => `/basket`,
            providesTags: ( result ) => result
                  ? [
                      ...result.map( ( { id } ) => ( { type: 'basket', id } ) ),
                      { type: 'basket', id: 'LIST' },
                    ]
                  : [ { type: 'basket', id: 'LIST' } ],
        } ),
        getBasketProduct: build.query( {
            query: ( id ) => `/basket/${id}`,
            invalidatesTags: [ { type: `basket`, id: `LIST` } ],
        } ),
        updateBasketProduct: build.mutation( {
            query: ( { id, ...body } ) => ( {
                url: `/basket/${id}`,
                method: `PUT`,
                body,
            } ),
            invalidatesTags: [ { type: `basket`, id: `LIST` } ],
        } ),
        deleteBasketProduct: build.mutation( {
            query: ( id ) => ( {
                url: `/basket/${id}`,
                method: `DELETE`,
            } ),
            invalidatesTags: [ { type: `basket`, id: `LIST` } ],
        } ),
    } ),
} );

export const { useGetProductsQuery, useAddBasketProductMutation , useGetProductQuery, useGetBasketProductsQuery, useGetBasketProductQuery, useUpdateBasketProductMutation, useDeleteBasketProductMutation } = productsApi;