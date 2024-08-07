import { Toaster as ReactToaster } from "react-hot-toast"

const TOAST_OPTIONS = {
  duration: 4000,
  loading: {
    duration: Infinity,
  },
  style: {
    width: "max-content",
    maxWidth: "var(--max-width)",
  },
}

const Toaster = () => <ReactToaster toastOptions={TOAST_OPTIONS} />

export default Toaster
