import { useEffect } from "react"
import { useDebounce } from "use-debounce"

/**
 * Watches for viewport height changes
 * and updates custom --vh CSS property.
 */
const use100vh = () => {
  const [debouncedHandler] = useDebounce(updateHeight, 250)

  useEffect(() => {
    debouncedHandler()

    window.addEventListener("resize", debouncedHandler, { passive: true })
    return () => window.removeEventListener("resize", debouncedHandler)
  }, [debouncedHandler])
}

const updateHeight = () => {
  const height = document.documentElement?.clientHeight || window.innerHeight
  document.documentElement.style.setProperty("--vh", `${height / 100}px`)
}

export default use100vh
