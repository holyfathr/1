import { useMutation } from "react-query"
import toast from "react-hot-toast"
import { useRouter } from "next/router"

import RecoverForm from "components/forms/RecoverForm"

import { sendRecoveryLink } from "api/auth"

import errorHandler from "helpers/error-handler"

const RecoverFormContainer = () => {
  const router = useRouter()

  const recoveryMutation = useMutation(sendRecoveryLink, { onError: errorHandler })

  const onSubmit = async (data) => {
    const alert = toast.loading("Сброс пароля...")

    try {
      await recoveryMutation.mutateAsync(data)
      await router.push("/recover/sent/")
    } catch {
      toast.dismiss(alert)
    }
  }

  return <RecoverForm onSubmit={onSubmit} disabled={recoveryMutation.isLoading} />
}

export default RecoverFormContainer
