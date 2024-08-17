import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Character, PageInfo } from '../interfaces/interfaces';

interface CharactersResponse {
  results: Character[];
  info: PageInfo;
}

export const characterApi = createApi({
  reducerPath: 'characterApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://rickandmortyapi.com/api/' }),
  endpoints: (builder) => ({
    getCharacters: builder.query<CharactersResponse, { name?: string; page?: number }>({
      query: ({ name = '', page = 1 }) => ({
        url: `character?name=${name}&page=${page}`,
      }),
    }),
    getCharacterById: builder.query<Character, number>({
      query: (id) => ({
        url: `character/${id}`,
      }),
    }),
  }),
});

export const { useGetCharactersQuery, useGetCharacterByIdQuery } = characterApi;
