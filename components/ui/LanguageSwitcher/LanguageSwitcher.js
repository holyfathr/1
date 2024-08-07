import Link from "components/ui/Link"
import { useRouter } from "next/router"

const LanguageSwitcher = () => {
  const { asPath, locale, locales, ...rest } = useRouter()

  return (
    <div>
      {locales.map((l, i) => (
        <span key={l}>
          <Link href={asPath} variant={l !== locale ? "default" : "accent"} locale={l}>
            {l}
          </Link>
          {i !== locales.length - 1 ? <span>{" / "}</span> : null}
        </span>
      ))}
    </div>
  )
}

export default LanguageSwitcher