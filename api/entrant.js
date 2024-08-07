import intersectionWith from "lodash/intersectionWith"

import { instance } from "api/setup"
import { uploadObjectFiles, uploadGalleryFiles } from "api/files"
import { getSubjects } from "api/utils"

import { parseObjectDates } from "helpers/dates"

/**
 * Parses JSON fields of entrant account.
 *
 * @param {object} account - Entrant account
 *
 * @returns {object} Entrant account with parsed fields
 */
export const parseEntrantAccount = (account) => {
  try {
    account.passport_info = JSON.parse(account.passport_info || {})
  } catch {
    account.passport_info = {}
  }

  try {
    account.education_document = JSON.parse(account.education_document || {})
  } catch {
    account.education_document = {}
  }

  try {
    account.education_document_grades_number = JSON.parse(
      account.education_document_grades_number || {}
    )
  } catch {
    account.education_document_grades_number = {}
  }

  parseObjectDates(account)
  parseObjectDates(account.passport_info)
  parseObjectDates(account.education_document)

  return account
}

/**
 * Returns current entrant account.
 *
 * @returns {object} Current entrant account
 */
export const getEntrantAccount = async () => {
  const { data: account } = await instance.get("accounts/entrant/")

  parseEntrantAccount(account)

  // TODO: remove
  account.citizenship = "Российская Федерация"

  return account
}

export const getEntrantSubjects = async () => {
  const [subjects, { exam_results }] = await Promise.all([
    getSubjects(),
    getEntrantAccount(),
  ])

  return intersectionWith(subjects, exam_results, (subject, result) => {
    return subject.id === result.exam
  })
}

export const editEntrantAccount = async (data) => {
  console.log(data)
  await Promise.all([
    await uploadObjectFiles(data),
    // await uploadGalleryFiles(data.doc_image_link || {}),
    // await uploadObjectFiles(data.diploma_image_link || {}),
  ])

  // data.doc_image_link = JSON.stringify(data.doc_image_link || {})
  // data.diploma_image_link = JSON.stringify(data.diploma_image_link || {})
  // data.education_document_grades_number = JSON.stringify(
  //   data.education_document_grades_number || {}
  // )

  await instance.put("accounts/entrant/", data)
}

export const addEntrantFavourite = async ({ id }) => {
  await instance.post("accounts/entrant/favourites/", { educational_program: id })
}

export const deleteEntrantFavourite = async ({ id }) => {
  await instance.delete("accounts/entrant/favourites/", { data: { id } })
}

export const getEntrantRecommendations = async () => {
  const { data: recommendations } = await instance.get(
    "marketplace/view/recommendededuprograms-application/"
  )

  return recommendations
}

export const getEntrantFavourites = async ({ page }) => {
  const { data: response } = page
    ? await instance.get("marketplace/view/favouriteeduprogram/", {
        params: { p: page, page_size: 8 },
      })
    : await instance.get("accounts/entrant/favourites/")

  return response
}

export const getEntrantApplications = async ({ page = 1 }) => {
  const { data: response } = await instance.get("marketplace/view/my-applications/", {
    params: { p: page, page_size: 8 },
  })

  return response
}

/**
 * Returns application by its unique identifier.
 *
 * @param {object} param0 - Application
 * @param {number} param0.id - Unique identifier of the application
 *
 * @returns {Promise<object>} Application
 */
export const getEntrantApplication = async ({ id }) => {
  const { data: application } = await instance.get(
    `marketplace/view/my-applications/full/${id}/`
  )

  return application
}
