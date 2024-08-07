import Cropper from "react-cropper"
import { useState } from "react"
import clsx from "clsx"

import Button from "components/ui/Button"

import { getFileFromPreview } from "helpers/files"

import "cropperjs/dist/cropper.css"
import styles from "./image-crop.module.scss"

const ImageCrop = ({ image, className, onCancel, onSave }) => {
  const [cropper, setCropper] = useState()

  const preSave = async () => {
    if (typeof cropper === "undefined") return

    const preview = cropper.getCroppedCanvas().toDataURL()
    const file = await getFileFromPreview(preview, "image.jpg")
    onSave(file)
  }

  className = clsx(styles.crop, className)

  return (
    <div className={styles.wrapper}>
      <Cropper
        src={image}
        className={className}
        viewMode={2}
        autoCropArea={1}
        checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
        onInitialized={setCropper}
        background={false}
        modal={false}
      />

      <div className={styles.buttons}>
        <Button onClick={preSave}>Сохранить</Button>
        <Button variant="outline" onClick={onCancel}>
          Отмена
        </Button>
      </div>
    </div>
  )
}

export default ImageCrop
