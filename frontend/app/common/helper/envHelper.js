// src/helpers/envHelper.js

export const getBaseUrl = () => {
    if (import.meta.env.PROD) {
      return import.meta.env.VITE_BASE_URL_PROD;
    } else {
      return import.meta.env.VITE_BASE_URL_DEV;
    }
  };
  