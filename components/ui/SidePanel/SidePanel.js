import clsx from "clsx"

import useScrollLock from "hooks/use-scroll-lock"

import styles from "./side-panel.module.scss"

const SidePanel = ({
  visible,
  onRequestClose,
  children,
  overlayClassName,
  className,
  ...props
}) => {
  const onOverlayClick = ({ target }) => {
    target.className === overlayClassName && onRequestClose()
  }

  useScrollLock(visible)

  overlayClassName = clsx(styles.overlay, visible && styles.visible)
  className = clsx(styles.panel, className)

  return (
    <div className={overlayClassName} onClick={onOverlayClick}>
      <div className={className} {...props}>
        {children}
      </div>
    </div>
  )
}

export default SidePanel
