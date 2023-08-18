// Redux Toolkit extracts out all the complicated boilerplate
// redux-toolkit-query allows to make api calls simply and store it in Redux {store}

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  // make API calls to the URL
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  // baseQuery: fetchBaseQuery({ baseUrl: "https://purple-wind-5364.fly.dev/" }), // Specify the production API URL directly
  reducerPath: "main",
  tagTypes: [],
  endpoints: (build) => ({
    postAiText: build.mutation({
      query: (payload) => ({
        url: "openai/text",
        method: "POST",
        body: payload,
      }),
    }),
    postAiCode: build.mutation({
      query: (payload) => ({
        url: "openai/code",
        method: "POST",
        body: payload,
      }),
    }),
    postAiAssist: build.mutation({
      query: (payload) => ({
        url: "openai/assist",
        method: "POST",
        body: payload,
      }),
    }),
    postLogin: build.mutation({
      query: (payload) => ({
        url: "auth/login",
        method: "POST",
        body: payload,
      }),
    }),
    postSignUp: build.mutation({
      query: (payload) => ({
        url: "auth/signup",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const {
  usePostAiTextMutation,
  usePostAiCodeMutation,
  usePostAiAssistMutation,
  usePostLoginMutation,
  usePostSignUpMutation,
} = api;

// custom api w/ Redux Toolkit
