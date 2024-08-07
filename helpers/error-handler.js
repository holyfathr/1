import toast from "react-hot-toast"

const parseErrorMessage = (error) => {
  const response = error?.response?.data

  let message = "Произошла неизвестная ошибка"

  if (response?.detail) {
    message = response.detail
  } else if (response instanceof Object && !Array.isArray(response)) {
    message = Object.values(response)[0][0]
  } else if (Array.isArray(response) && typeof response[0] === "string") {
    message = response[0]
  }

  return message
}

const errorHandler = (error) => {
  const message = parseErrorMessage(error)
  toast.error(message)
}

export default errorHandler
