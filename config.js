import { stringify } from "query-string"

/**
 * react-query client config.
 */
export const QUERY_CLIENT_CONFIG = {
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
}

/**
 * axios config.
 */
export const AXIOS_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_ROOT,
  paramsSerializer: (params) => stringify(params, { arrayFormat: "comma" }),
}
