import axios from "axios"
import createAuthRefreshInterceptor from "axios-auth-refresh"
import mapValues from "lodash/mapValues"
import formatISO from "date-fns/formatISO"
import isValid from "date-fns/isValid"
import isPlainObject from "lodash/isPlainObject"

import { getTokens, removeTokens } from "helpers/tokens"

import { refresh } from "api/auth"

import { AXIOS_CONFIG } from "config"

const requestTokenInterceptor = (config) => {
  const { access } = getTokens()
  if (!access) return config

  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${access}`,
  }

  return config
}

const responseUnauthorizedInterceptor = (request) => {
  refresh()
    .then(() => {
      requestTokenInterceptor(request.response.config)
      return Promise.resolve()
    })
    .catch(() => removeTokens())
}

const dateTransformer = (data) => {
  if (data instanceof Date) {
    return isValid(data) ? formatISO(data, { representation: "date" }) : undefined
  }

  if (Array.isArray(data)) {
    return data.map(dateTransformer)
  }

  if (isPlainObject(data)) {
    return mapValues(data, dateTransformer)
  }

  return data
}

const instance = axios.create({
  ...AXIOS_CONFIG,
  transformRequest: [dateTransformer].concat(axios.defaults.transformRequest),
})

createAuthRefreshInterceptor(instance, responseUnauthorizedInterceptor, {
  statusCodes: [401, 403],
})

instance.interceptors.request.use(requestTokenInterceptor, Promise.reject)

export { instance }
