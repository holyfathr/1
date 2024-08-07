import { useRouter } from "next/router"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import useDefinedQuery, { keys } from "hooks/use-defined-query"

import withProtection from "hocs/with-protection"

const ProfilePage = () => {
  const router = useRouter()

  const { data: account, isLoading } = useDefinedQuery(keys.account)
  if (isLoading) return "Загрузка..."

  switch (account?.role) {
    case "A":
      router.push("/pro/admin/profile/")
      break
    case "F":
      router.push("/pro/faculty/profile/")
      break
    case "U":
      router.push("/pro/university/profile/")
      break
    default:
      router.push("/profile/")
      break
  }

  return null
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "header"])),
    },
  }
}

export default withProtection(ProfilePage)
