import { useRouter } from "next/router"
import toast from "react-hot-toast"
import { useMutation } from "react-query"

import SetEmailForm from "components/forms/SetEmailForm"

import { setEmail } from "api/auth"

import errorHandler from "helpers/error-handler"

const SetEmailFormContainer = () => {
  const router = useRouter()

  const setMutation = useMutation(setEmail, { onError: errorHandler })

  const onSubmit = async (data) => {
    const alert = toast.loading("Установка почты...")

    try {
      await setMutation.mutateAsync({ ...data, ...router.query })
      await router.push("/confirmation/")
    } catch {
      toast.dismiss(alert)
    }
  }

  return <SetEmailForm onSubmit={onSubmit} disabled={setMutation.isLoading} />
}

export default SetEmailFormContainer
