import { instance } from "api/setup"

import { isFile } from "helpers/files"

/**
 * Uploads the given file to a remote
 * destination.
 *
 * @param {File} file - File to upload
 *
 * @returns {Promise<string>} URL of the uploaded file
 */
export const uploadFile = async (file) => {
  const data = new FormData()
  data.append("file", file)

  const { data: link } = await instance.post("files/", data, {
    headers: { "Content-Type": "multipart/form-data" },
  })

  return link
}

/**
 * Uploads all object files replacing
 * corresponding properties with URLs.
 * ! Only first-level properties are replaced.
 *
 * @param {object} obj - Object to upload files of
 *
 * @returns {Promise<object>} Same object with all files replaced with URLs
 */
export const uploadObjectFiles = async (obj) => {
  for (const [key, value] of Object.entries(obj)) {
    if (isFile(value)) {
      obj[key] = await uploadFile(value)
    }
  }

  return obj
}

/**
 * Uploads all files in the gallery array
 * and replaces corresponding properties with URLs.
 *
 * @param {Array} gallery - Array of gallery objects
 *
 * @returns {Promise<Array>} Same array with all files replaced with URLs
 */
export const uploadGalleryFiles = async (gallery) => {
  if (!Array.isArray(gallery)) return gallery;

  for (const item of gallery) {
    if (item && item.image_link && isFile(item.image_link)) {
      item.image_link = await uploadFile(item.image_link);
    }
  }

  return gallery;
}
