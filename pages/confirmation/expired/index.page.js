import toast from "react-hot-toast"
import { useRouter } from "next/router"
import { useMutation } from "react-query"

import Layout from "components/partials/Layout"
import IllustrationMessage from "components/partials/IllustrationMessage"
import Page from "components/partials/Page"
import Button from "components/ui/Button"

import { resendConfirmation } from "api/auth"

import errorHandler from "helpers/error-handler"

const ConfirmationExpiredPage = () => {
  const router = useRouter()

  const resendMutation = useMutation(resendConfirmation, { onError: errorHandler })

  const onResend = async () => {
    const alert = toast.loading("Отправка письма...")

    try {
      await resendMutation.mutateAsync({ user_id: router.query.user_id })
      await router.push("/confirmation/")
    } catch {
      toast.dismiss(alert)
    }
  }

  return (
    <Layout title="Подтверждение почты">
      <Page>
        <IllustrationMessage illustration="plane" title="Срок подтверждения истёк :(">
          <p>Нажми на кнопку, чтобы получить новую ссылку</p>
          <br />
          <Button href="/recover/" onClick={onResend}>
            Оправить письмо
          </Button>
        </IllustrationMessage>
      </Page>
    </Layout>
  )
}

export default ConfirmationExpiredPage
