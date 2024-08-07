import { useRouter } from "next/router"
import toast from "react-hot-toast"
import { useMutation } from "react-query"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import Layout from "components/partials/Layout"
import IllustrationMessage from "components/partials/IllustrationMessage"
import Page from "components/partials/Page"

import useQueryOnce from "hooks/use-query-once"

import { confirm } from "api/auth"

import errorHandler from "helpers/error-handler"

const ConfirmationPage = () => {
  const router = useRouter()

  const confirmMutation = useMutation(confirm, { onError: errorHandler })

  const handleConfirm = async (data) => {
    const alert = toast.loading("Подтверждение почты...")

    try {
      const response = await confirmMutation.mutateAsync(data)

      // TODO: replace with 410 check
      if (response?.detail === "Signature expired")
        await router.push("/confirmation/expired/")

      await router.push("/profile/")
    } catch {
      toast.dismiss(alert)
    }
  }

  useQueryOnce(
    { user_id: undefined, signature: undefined, timestamp: undefined },
    handleConfirm
  )

  return (
    <Layout title="Подтверждение почты">
      <Page>
        <IllustrationMessage
          illustration="plane"
          title="Чтобы воспользоваться Альматором – подтверди свою почту"
        >
          Мы отправили ссылку на твою почту, она будет действительна 24 часа
        </IllustrationMessage>
      </Page>
    </Layout>
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "header"])),
    },
  }
}

export default ConfirmationPage
