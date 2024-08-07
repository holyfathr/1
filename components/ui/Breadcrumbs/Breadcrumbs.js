import clsx from "clsx"
import { forwardRef } from "react"

import styles from "./breadcrumbs.module.scss"

const Breadcrumbs = ({ children, className, underline, underlineColor, ...props }) => {
  className = clsx(styles.breadcrumbs, className, {
    [styles.underline]: underline && !underlineColor,
    [styles['underline-custom']]: underline && underlineColor,
  });

  const style = underlineColor ? { borderBottomColor: underlineColor } : {};

  return (
    <div className={className} {...props} style={style}>
      {children}
    </div>
  );
};

const Item = ({ children, className, ...props }, ref) => {
  className = clsx(styles.item, className)

  return (
    <div className={className} {...props} ref={ref}>
      {children}
    </div>
  )
}

Breadcrumbs.Item = forwardRef(Item)

export default Breadcrumbs
