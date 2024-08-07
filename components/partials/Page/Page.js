import clsx from "clsx"

import Wrapper from "components/ui/Wrapper"

import styles from "./page.module.scss"

const Page = ({
  title,
  controls,
  className,
  headerClassName,
  contentClassName,
  children,
  ...props
}) => {
  className = clsx(styles.page, className)
  headerClassName = clsx(styles.header, headerClassName)

  return (
    <Wrapper className={className} {...props}>
      {(title || controls) && (
        <div className={headerClassName}>
          <h1>{title}</h1>
          {controls && <div>{controls}</div>}
        </div>
      )}

      <div className={contentClassName}>{children}</div>
    </Wrapper>
  )
}

export default Page
