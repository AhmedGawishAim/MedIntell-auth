import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  API_BASE_URL,
  USERS,
  TOKEN,
  REFRESHTOKEN,
  ACTIVATE,
  CREATE_JWT,
  REFRESH_JWT,
  VERIFY_JWT,
  RESET_PASSWORD,
  RESET_PASSWORD_CONFIRM,
} from "@/apis/endpoints";
import { toast, Bounce } from "react-toastify";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    activate: builder.mutation({
      query: (body) => ({
        url: ACTIVATE,
        method: "POST",
        body,
      }),
      transformResponse: (response, meta) => {
        const status = meta?.response?.status;

        if (status === 204) {
          toast.success("Your account has been activated successfully.", {
            position: "top-right",
            transition:Bounce,
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          return response;
        } else {
          toast.error("Something went wrong", {
           transition:Bounce,
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      },
      transformErrorResponse: (error) => {
        const message =
          error?.data?.detail || "Activation failed. Please try again.";

        toast.error(message, {
          transition:Bounce,
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        return error;
      },
    }),
    login: builder.mutation({
      query: (body) => ({
        url: CREATE_JWT,
        method: "POST",
        body,
      }),
      transformResponse: (response) => {
        localStorage.setItem(TOKEN, response.access);
        localStorage.setItem(REFRESHTOKEN, response.refresh);
        console.log(response.access);

        toast.success("User logged in successfully", {
          autoClose: 1000,
          transition: Bounce,
          position: "top-right",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        return response;
      },
      transformErrorResponse: (error) => {
        const message =
          error?.data?.detail || "Login failed. Please try again.";
    
        toast.error(message, {
          autoClose: 1000,
          transition: Bounce,
          position: "top-right",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return error;
      },
    }),
    signup: builder.mutation({
      query: (body) => ({
        url: USERS,
        method: "POST",
        body,
      }),
      transformResponse: (response, meta) => {
        const status = meta?.response?.status;
        if (status === 201) {
          toast.success("User created successfully", {
            transition:Bounce,
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
        return response;
      },
      transformErrorResponse: (error) => {
        toast.error(
          "Something went wrong, Maybe the given email is already exist.",
          {
            transition:Bounce,
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
        return error;
      },
    }),
    refresh: builder.mutation({
      query: (body) => ({
        url: REFRESH_JWT,
        method: "POST",
        body,
      }),
    }),
    verify: builder.mutation({
      query: (body) => ({
        url: VERIFY_JWT,
        method: "POST",
        body,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (body) => ({
        url: RESET_PASSWORD,
        method: "POST",
        body,
      }),
      transformResponse: (response, meta) => {
        const status = meta?.response?.status;
        if (status === 204) {
          toast.success("Email send successfully", {
            transition:Bounce,
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          toast.error("Something went wrong", {
            transition:Bounce,
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }

        return response;
      },
      transformErrorResponse: (error) => {
        toast.error(
          "Something went wrong, Maybe the given email does not exist.",
          {
            transition:Bounce,
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
        return error;
      },
    }),
    forgotPaswordConfirm: builder.mutation({
      query: (body) => ({
        url: RESET_PASSWORD_CONFIRM,
        method: "POST",
        body,
      }),
      transformResponse: (response, meta) => {
        const status = meta?.response?.status;
        if (status === 204) {
          toast.success("Email send successfully", {
            transition:Bounce,
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          toast.error("Something went wrong", {
            position: "top-right",
          });
        }

        return response;
      },
      transformErrorResponse: (error) => {
        if (error?.data?.new_password) {
          error.data.new_password.forEach((msg) => {
            toast.error(msg, {
             transition:Bounce,
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
          });
        } else {
          toast.error("Something went wrong, Maybe the link is expired!", {
            transition:Bounce,
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
        return error;
      },
    }),
  }),
});

export const {
  useActivateMutation,
  useLoginMutation,
  useSignupMutation,
  useRefreshMutation,
  useForgotPasswordMutation,
  useForgotPaswordConfirmMutation,
} = authApi;
