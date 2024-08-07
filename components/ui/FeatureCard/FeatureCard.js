import clsx from "clsx"

import Card from "components/ui/Card"

import styles from "./feature-card.module.scss"

const FeatureCard = ({ children, className, ...props }) => {
  className = clsx(styles.card, className)

  return (
    <Card className={className} {...props}>
      <div className={styles.wrapper}>{children}</div>
    </Card>
  )
}

const Header = ({ children, className, ...props }) => {
  className = clsx(styles.header, className)

  return (
    <div className={className} {...props}>
      {children}
    </div>
  )
}

const Content = ({ children, className, ...props }) => {
  className = clsx(styles.content, className)

  return (
    <div className={className} {...props}>
      {children}
    </div>
  )
}

FeatureCard.Header = Header
FeatureCard.Content = Content

export default FeatureCard
