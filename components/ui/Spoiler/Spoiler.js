import clsx from "clsx"
import Collapsible from "react-collapsible"

import styles from "./spoiler.module.scss"

const Spoiler = ({ title, children, ...props }) => {
  return (
    <Collapsible
      trigger={title}
      transitionTime={+styles.duration}
      triggerClassName={styles.title}
      triggerOpenedClassName={clsx(styles.title, styles.opened)}
      contentOuterClassName={styles.content}
      {...props}
    >
      {children}
    </Collapsible>
  )
}

export default Spoiler
