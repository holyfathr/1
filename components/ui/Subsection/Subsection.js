import clsx from "clsx"

import styles from "./subsection.module.scss"

const Subsection = ({
  title,
  description,
  controls,
  children,
  className,
  contentClassName,
  hasError,
  ...props
}) => {
  className = clsx(styles.subsection, hasError && styles.error, className)

  return (
    <section className={className} {...props}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.controls}>{controls}</div>
      </div>

      {description && <p className={styles.description}>{description}</p>}

      <div className={contentClassName}>{children}</div>
    </section>
  )
}

export default Subsection
