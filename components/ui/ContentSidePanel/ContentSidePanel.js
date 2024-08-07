import clsx from "clsx"

import IconButton from "components/ui/IconButton"
import SidePanel from "components/ui/SidePanel"

import styles from "./content-side-panel.module.scss"

const ContentSidePanel = ({ visible, children, className, ...props }) => {
  className = clsx(styles.panel, className)

  return (
    <SidePanel visible={visible} className={className} {...props}>
      {children}
    </SidePanel>
  )
}

const Header = ({ className, children, ...props }) => {
  className = clsx(styles.header, className)

  return (
    <header className={className} {...props}>
      {children}
    </header>
  )
}

const Button = ({ className, children, ...props }) => {
  className = clsx(styles.button, className)

  return (
    <IconButton className={className} variant="accent" {...props}>
      {children}
    </IconButton>
  )
}

const Title = ({ className, children, ...props }) => {
  className = clsx(styles.title, className)

  return (
    <p className={className} {...props}>
      {children}
    </p>
  )
}

const Content = ({ className, children, ...props }) => {
  className = clsx(styles.content, className)

  return (
    <div className={className} data-scroll-lock-scrollable {...props}>
      {children}
    </div>
  )
}

const Footer = ({ className, children, ...props }) => {
  className = clsx(styles.footer, className)

  return (
    <footer className={className} {...props}>
      {children}
    </footer>
  )
}

Header.Button = Button
Header.Title = Title

ContentSidePanel.Header = Header
ContentSidePanel.Content = Content
ContentSidePanel.Footer = Footer

export default ContentSidePanel
