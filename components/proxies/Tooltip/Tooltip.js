import clsx from "clsx"
import Tippy from "@tippyjs/react"
import PropTypes from "prop-types"

import "tippy.js/dist/tippy.css"
import styles from "./tooltip.module.scss"

const Tooltip = ({ children, className, ...props }) => {
  className = clsx(styles.tooltip, className)

  return (
    <Tippy className={className} arrow theme="light" {...props}>
      {children}
    </Tippy>
  )
}

Tooltip.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
}

export default Tooltip
