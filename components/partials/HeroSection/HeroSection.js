import clsx from "clsx"

import Section from "components/partials/Section"

import styles from "./hero-section.module.scss"

const HeroSection = ({ children, className, ...props }) => {
  className = clsx(styles.section, className)

  return (
    <Section className={className} {...props}>
      {children}
    </Section>
  )
}

export default HeroSection
