import { useRouter } from "next/router"

import SocialLogin from "components/partials/SocialLogin"

import useQueryOnce from "hooks/use-query-once"
import useDefinedQuery, { keys } from "hooks/use-defined-query"

import { saveTokens } from "helpers/tokens"

const SocialLoginContainer = (props) => {
  const router = useRouter()

  const { data: networks = [] } = useDefinedQuery(keys.socialNetworks)

  const login = async ({ access, refresh }) => {
    saveTokens(access, refresh)
    await router.push("/profile/")
  }

  const askEmail = async ({ user_id, signature }) => {
    await router.push({ pathname: "/set-email/", query: { user_id, signature } })
  }

  useQueryOnce({ access: undefined, refresh: undefined }, login)
  useQueryOnce(
    { error: "email_not_provided", user_id: undefined, signature: undefined },
    askEmail
  )

  return (
    <SocialLogin {...props}>
      {networks.map((network) => (
        <SocialLogin.Item href={network.href} icon={network.type} key={network.type} />
      ))}
    </SocialLogin>
  )
}

export default SocialLoginContainer
