import clsx from "clsx"
import TypewriterComponent from "typewriter-effect"
import PropTypes from "prop-types"

import styles from "./typewriter.module.scss"

const Typewriter = ({
  as: Component = "span",
  options = {},
  children,
  className,
  ...props
}) => {
  className = clsx(styles.wrapper, className)

  return (
    <Component className={className} {...props}>
      {/* Ensures there are no height changes during animation */}
      <span className={styles.placeholder}>{children}</span>

      <span className={styles.type}>
        <TypewriterComponent
          options={{ delay: 50, autoStart: true, strings: [children], ...options }}
        />
      </span>
    </Component>
  )
}

Typewriter.propTypes = {
  as: PropTypes.string,
  options: PropTypes.object,
  children: PropTypes.any,
  className: PropTypes.string,
}

export default Typewriter
