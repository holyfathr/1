import clsx from "clsx"
import { useEffect, useRef } from "react"
import PropTypes from "prop-types"

import styles from "./tip-overlay.module.scss"

const TipOverlay = ({ content, visible, children, className, ...props }) => {
  const overlayRef = useRef(null)

  useEffect(() => {
    const contentNode = overlayRef.current.nextSibling
    const styles = window.getComputedStyle(contentNode)

    // Sync wrapper's border-radius with children's one
    overlayRef.current.style.borderRadius = styles.borderRadius
  }, [])

  className = clsx(styles.wrapper, visible && styles.visible, className)

  return (
    <div className={className} {...props}>
      <div className={styles.overlay} ref={overlayRef}>
        {content}
      </div>

      {children}
    </div>
  )
}

TipOverlay.propTypes = {
  content: PropTypes.any,
  visible: PropTypes.bool,
  children: PropTypes.any,
  className: PropTypes.string,
}

export default TipOverlay
