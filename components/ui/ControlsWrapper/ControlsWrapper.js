import clsx from "clsx"
import { useEffect, useRef } from "react"

import styles from "./controls-wrapper.module.scss"

const ControlsWrapper = ({ children, className, visible, controls, ...props }) => {
  const overlayRef = useRef(null)

  useEffect(() => {
    const contentNode = overlayRef.current.firstChild
    const styles = window.getComputedStyle(contentNode)

    // Sync wrapper's border-radius with children's one
    overlayRef.current.style.borderRadius = styles.borderRadius
  }, [])

  className = clsx(styles.wrapper, visible && styles.visible, className)

  return (
    <div className={className} {...props} ref={overlayRef}>
      {children}
      {visible && controls && <div className={styles.controls}>{controls}</div>}
    </div>
  )
}

export default ControlsWrapper
