import clsx from "clsx"
import { forwardRef } from "react"

import Icon from "components/ui/Icon"
import IconButton from "components/ui/IconButton"

import styles from "./file-upload.module.scss"

const FileUpload = (
  {
    title,
    className,
    variant = "default",
    description,
    preview,
    onClear,
    onCrop,
    value,
    objectFit = "contain",
    hasError,
    readOnly,
    ...props
  },
  ref
) => {
  className = clsx(
    styles.upload,
    styles[variant],
    hasError && styles.error,
    readOnly && styles.readOnly,
    className
  )

  return (
    <div className={className}>
      <Controls onCrop={onCrop} onClear={onClear} />

      <input type="file" className={styles.input} value={value} {...props} ref={ref} />

      {readOnly && (
        <a
          href={preview}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        />
      )}

      {preview && (
        /* eslint-disable-next-line */
        <img src={preview} alt="" className={styles.preview} style={{ objectFit }} />
      )}

      <div className={styles.content}>

        <span className={styles.title}>{title}</span>
        {description && <span className={styles.description}>{description}</span>}
        {/* {staple && <Icon className={styles.staple} slug="staple"/>} */}
      </div>
    </div>
  )
}

const Controls = ({ onCrop, onClear }) => (
  <div className={styles.controls}>
    {/* {onCrop && (
      <IconButton
        icon="crop"
        className={styles.crop}
        variant="accent"
        onClick={onCrop}
        title="Обрезать изображение"
      />
    )} */}

    {onClear && (
      <IconButton
        icon="trash"
        className={styles.clear}
        variant="danger"
        onClick={onClear}
        title="Удалить изображение"
      />
    )}
  </div>
)

export default forwardRef(FileUpload)
