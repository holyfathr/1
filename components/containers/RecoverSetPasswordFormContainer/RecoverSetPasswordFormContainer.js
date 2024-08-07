import { useRouter } from "next/router"
import toast from "react-hot-toast"
import { useMutation } from "react-query"

import RecoverSetPasswordForm from "components/forms/RecoverSetPasswordForm"

import { recover } from "api/auth"

import errorHandler from "helpers/error-handler"

const RecoverSetPasswordFormContainer = () => {
  const router = useRouter()

  const recoverMutation = useMutation(recover, { onError: errorHandler })

  const onSubmit = async (data) => {
    const alert = toast.loading("Установка пароля...")

    try {
      const response = await recoverMutation.mutateAsync({ ...data, ...router.query })

      // TODO: replace with 410 check
      if (response?.detail === "Signature expired")
        await router.push({
          pathname: "/recover/expired/",
          query: { user_id: router.query.user_id },
        })

      await router.push("/login/")
    } catch {
      toast.dismiss(alert)
    }
  }

  return <RecoverSetPasswordForm onSubmit={onSubmit} />
}

export default RecoverSetPasswordFormContainer
