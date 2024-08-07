import { Splide, SplideSlide } from "@splidejs/react-splide"
import clsx from "clsx"

import "@splidejs/splide/dist/css/splide.min.css"
import styles from "./snap-picker.module.scss"

const SPLIDE_OPTIONS = {
  arrows: false,
  direction: "ttb",
  type: "loop",
  trimSpace: false,
  focus: "center",
  pagination: false,
  isNavigation: true,
  updateOnMove: true,
  autoplay: true,
  interval: 1000,
}

const SnapPicker = ({ options = {}, className, children }) => {
  className = clsx(styles.picker, className)

  return (
    <Splide className={className} options={{ ...SPLIDE_OPTIONS, ...options }}>
      {children}
    </Splide>
  )
}

const Item = ({ className, children }) => {
  className = clsx(styles.item, className)

  return <SplideSlide className={className}>{children}</SplideSlide>
}

SnapPicker.Item = Item

export default SnapPicker
