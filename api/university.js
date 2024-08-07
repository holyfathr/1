import { instance } from "api/setup"
import { uploadObjectFiles, uploadGalleryFiles } from "api/files"

/**
 * Creates new university.
 *
 * @param {object} university - University to create
 *
 * @returns {Promise<object>} Created university
 */
export const createUniversity = async (university) => {
  const { data: createdUniversity } = await instance.post(
    "accounts/administration/admin/",
    university
  )

  return createdUniversity
}

/**
 * Returns all universities.
 *
 * @returns {Promise<Array<object>>} Universities
 */
export const getUniversities = async () => {
  const { data: universities } = await instance.get("accounts/administration/admin/")

  return universities
}

/**
 * Returns the given university.
 *
 * @param {object} param0 - University to get
 * @param {number} param0.id - Unique identifier
 *
 * @returns {Promise<object>} - University
 */
export const getUniversity = async ({ id }) => {
  const { data: university } = await instance.get(`marketplace/view/university/${id}/`)

  return university
}

/**
 * Updates the given university.
 *
 * @param {object} university - New university
 */
export const editUniversity = async (university) => {
  await instance.put("accounts/administration/admin/", university)
}

/**
 * Deletes the given university.
 *
 * @param {object} param0 - University to delete
 * @param {number} param0.id - Unique identifier
 */
export const deleteUniversity = async ({ id }) => {
  await instance.delete("accounts/administration/admin/", { data: { id } })
}

/**
 * Returns current university account.
 *
 * @returns {Promise<object>} - Current university account
 */
export const getUniversityAccount = async () => {
  const { data: university } = await instance.get("accounts/university/")

  return university
}

/**
 * Updates current university account.
 *
 * @param {object} university - New university
 */
export const editUniversityAccount = async (university) => {
  await uploadObjectFiles(university)
  await uploadGalleryFiles(university.gallery)
  await instance.put("accounts/university/", university)
}

/**
 * Returns current university account analytics.
 *
 * @returns {Promise<object>} - University analytics
 */
export const getUniversityAnalytics = async () => {
  const { data: analytics } = await instance.get("marketplace/view/analytics/university/")

  return analytics
}

export const getUniversityFaculties = async () => {
  const { data: faculties } = await instance.get(
    "accounts/university/university-faculties/"
  )

  return faculties
}

export const getUniversityFacultyAnalytics = async ({ id }) => {
  const { data: analytics } = await instance.get(
    `marketplace/view/analytics/university/faculty/${id}/`
  )

  return analytics
}
