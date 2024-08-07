import { useRouter } from "next/router"
import toast from "react-hot-toast"
import { useMutation } from "react-query"

import SetProPasswordForm from "components/forms/SetProPasswordForm"

import { setProPassword } from "api/auth"

import errorHandler from "helpers/error-handler"

const SetProPasswordFormContainer = () => {
  const router = useRouter()

  const setMutation = useMutation(setProPassword, { onError: errorHandler })

  const onSubmit = async (data) => {
    const alert = toast.loading("Установка пароля...")

    try {
      await setMutation.mutateAsync({ ...data, ...router.query })
      await router.push("/pro/login/")
    } catch {
      toast.dismiss(alert)
    }
  }

  return <SetProPasswordForm onSubmit={onSubmit} disabled={setMutation.isLoading} />
}

export default SetProPasswordFormContainer
