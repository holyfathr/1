import { useMutation } from "react-query"
import toast from "react-hot-toast"
import { useRouter } from "next/router"

import LoginForm from "components/forms/LoginForm"

import errorHandler from "helpers/error-handler"

import { login } from "api/auth"

const LoginFormContainer = () => {
  const router = useRouter()

  const loginMutation = useMutation(login, { onError: errorHandler })

  const onSubmit = async ({ email, password }) => {
    const alert = toast.loading("Авторизация...")

    try {
      await loginMutation.mutateAsync({ username: email, password })
      await router.push("/profile/")
    } catch {
      toast.dismiss(alert)
    }
  }

  return <LoginForm onSubmit={onSubmit} disabled={loginMutation.isLoading} />
}

export default LoginFormContainer
