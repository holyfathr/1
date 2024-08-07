import { useMutation } from "react-query"
import { useRouter } from "next/router"
import toast from "react-hot-toast"

import ProLoginForm from "components/forms/ProLoginForm"

import errorHandler from "helpers/error-handler"

import { login } from "api/auth"

const ProLoginFormContainer = () => {
  const router = useRouter()

  const loginMutation = useMutation(login, { onError: errorHandler })

  const onSubmit = async ({ username, password }) => {
    const alert = toast.loading("Авторизация...")

    try {
      await loginMutation.mutateAsync({ username, password })
      await router.push("/pro/profile/")
    } catch {
      toast.dismiss(alert)
    }
  }

  return <ProLoginForm onSubmit={onSubmit} disabled={loginMutation.isLoading} />
}

export default ProLoginFormContainer
