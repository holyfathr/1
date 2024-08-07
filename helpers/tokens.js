export const saveTokens = (access, refresh) => {
  if (typeof window === "undefined") return

  localStorage.setItem("access", access)
  localStorage.setItem("refresh", refresh)
}

export const getTokens = () => {
  if (typeof window === "undefined") return { access: null, refresh: null }

  return {
    access: localStorage.getItem("access"),
    refresh: localStorage.getItem("refresh"),
  }
}

export const removeTokens = () => {
  if (typeof window === "undefined") return

  localStorage.removeItem("access")
  localStorage.removeItem("refresh")
}
