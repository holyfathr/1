import FileDownload from "js-file-download"
import flatten from "lodash/flatten"

import { instance } from "api/setup"
import { uploadObjectFiles } from "api/files"
import { parseEntrantAccount } from "api/entrant"
import { parseProgram } from "api/program"

import { parseObjectDates } from "helpers/dates"

export const getFaculty = async ({ id }) => {
  const { data: faculty } = await instance.get(`marketplace/view/faculty/${id}/`)

  return faculty
}

/**
 * Creates new faculty.
 *
 * @param {object} faculty - Faculty to create
 *
 * @returns {Promise<object>} Created faculty
 */
export const createFaculty = async (faculty) => {
  const { data: createdFaculty } = await instance.post(
    "accounts/university/university-faculties/",
    faculty
  )

  return createdFaculty
}

export const getFacultyEvents = async () => {
  const { data: events } = await instance.get("accounts/faculty/openday/")

  return events.map(parseObjectDates)
}

export const getFacultyProgramsEvents = async () => {
  const { data: events } = await instance.get("accounts/faculty/opendays-alleduprograms/")

  return flatten(events).map(parseObjectDates)
}

export const getFacultyAccount = async () => {
  const { data: faculty } = await instance.get("accounts/faculty/")

  return faculty
}

export const editFacultyAccount = async (data) => {
  await uploadObjectFiles(data)
  await instance.put("accounts/faculty/", data)
}

export const getFacultyPrograms = async () => {
  const { data: programs } = await instance.get("accounts/faculty/educationalprogram/")

  return programs
}

export const getFacultyAnalytics = async () => {
  const { data: analytics } = await instance.get("marketplace/view/analytics/faculty/")

  return analytics
}

export const getFacultyApplications = async (page) => {
  const { data: response } = await instance.get(
    "marketplace/view/faculty/applications/",
    { params: { p: page, page_size: 8 } }
  )

  return response
}

export const downloadFacultyApplications = async ({ programId, format }) => {
  const { data: table } = await instance.get(
    `marketplace/download/educationalprogram/${programId}/applications/table/${format}/`,
    { responseType: "blob" }
  )

  FileDownload(table, `${programId}.${format}`)
}

export const getFacultyApplication = async ({ id }) => {
  const { data: application } = await instance.get(
    `/marketplace/view/educationalprogram/application/full/${id}/`
  )

  parseEntrantAccount(application.entrant)

  return application
}

export const editFaculty = async (data) => {
  await instance.put("accounts/university/university-faculties/", data)
}

export const deleteFaculty = async ({ id }) => {
  await instance.delete("accounts/university/university-faculties/", { data: { id } })
}
