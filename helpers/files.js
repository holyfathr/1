import { getBase64Strings } from "exif-rotate-js"
import { getType } from "mime/lite"
import smartTruncate from "smart-truncate"

export const getFilePreview = async (file) => {
  const [base64] = await getBase64Strings([file], { type: getType(file.name) })

  return base64
}

export const getFileFromPreview = async (preview, name) => {
  const type = getType(name)

  const result = await fetch(preview)
  const buffer = await result.arrayBuffer()

  return new File([buffer], name, { type })
}

export const isFile = (value) => {
  return typeof File !== "undefined" && value instanceof File
}

export const isImage = (value) => {
  return isFile(value) && value.type.match(/image\/(png|jpg|jpeg)/i)
}

export const isPreview = (value) => {
  return typeof value === "string" && value.startsWith("data:image/")
}

export const isImageURL = (value) => {
  return typeof value === "string" && value.match(/\.(jpeg|jpg|png)$/)
}

export const isCroppableFile = (value) => {
  return isImage(value) || isPreview(value) || isImageURL(value)
}

export const getFileName = (value, maxLength) => {
  let name = undefined

  if (isFile(value)) {
    name = value.name
  } else if (typeof value === "string") {
    name = value.split("/").pop().split("#")[0].split("?")[0]
  }

  return name && maxLength
    ? smartTruncate(name, maxLength, { position: maxLength / 2 })
    : name
}
