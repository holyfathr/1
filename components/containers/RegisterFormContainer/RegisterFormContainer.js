import { useMutation } from "react-query"
import toast from "react-hot-toast"
import { useRouter } from "next/router"

import RegisterForm from "components/forms/RegisterForm"

import { register } from "api/auth"

import errorHandler from "helpers/error-handler"

const RegisterFormContainer = () => {
  const router = useRouter()

  const registerMutation = useMutation(register, { onError: errorHandler })

  const onSubmit = async (data) => {
    const alert = toast.loading("Регистрация...")

    try {
      await registerMutation.mutateAsync(data)
      await router.push("/confirmation/")
    } catch {
      toast.dismiss(alert)
    }
  }

  return <RegisterForm onSubmit={onSubmit} disabled={registerMutation.isLoading} />
}

export default RegisterFormContainer
