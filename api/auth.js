import { getTokens, removeTokens, saveTokens } from "helpers/tokens"

import { instance } from "api/setup"

/**
 * Creates new entrant account.
 *
 * @param {object} param0 - Account
 * @param {string} param0.email - E-mail to register account with
 */
export const register = async ({ email, ...data }) => {
  removeTokens()
  await instance.post("auth/register/", { username: email, email, ...data })
}

/**
 * Logs the given user in.
 *
 * @param {object} param0 - Credentials
 * @param {string} param0.username - User name
 * @param {string} param0.password - User password
 */
export const login = async ({ username, password }) => {
  const { data } = await instance.post("auth/login/", { login: username, password })
  saveTokens(data.token.access, data.token.refresh)
}

/**
 * 
 * Change user password
 * 
 */
export const changeUserPassword = async ({user_id, new_password, previous_password}) => {
  const response = await instance.post("/auth/change-user-password/", {
    user_id,
    new_password,
    previous_password,
  })

  return response.data
}

/**
 * Logs current user out.
 */
export const logout = async () => {
  await instance.post("auth/logout/")
  removeTokens()
}

export const sendRecoveryLink = async ({ email }) => {
  await instance.post("auth/send-reset-password-link/", { login: email })
}

export const resendConfirmation = async ({ user_id }) => {
  await instance.post("auth/resend-verification/", { user_id })
}

export const recover = async (data) => {
  const { data: result } = await instance.post("auth/reset-password/", data)

  return result
}

export const sendPhoneCode = async () => {
  await instance.post("accounts/entrant/send-verification-code/")
}

export const verifyPhone = async ({ code }) => {
  await instance.post("accounts/entrant/verify-phone/", { code })
}

export const setProPassword = async (data) => {
  await instance.post("auth/set-password-pro/", data)
}

export const setEmail = async (data) => {
  await instance.post("auth/register-email/", data)
}

export const confirm = async (data) => {
  const { data: result } = await instance.post("auth/verify-registration/", data)

  return result
}

export const refresh = async () => {
  const { refresh } = getTokens()
  if (!refresh) return

  const { data } = await instance.post(
    "token/refresh/",
    { refresh },
    { skipAuthRefresh: true }
  )

  saveTokens(data.access, data.refresh)
}
