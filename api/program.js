import cloneDeep from "lodash/cloneDeep"

import { instance } from "api/setup"

import { parseObjectDates } from "helpers/dates"

export const canApplyProgram = async (program, results) => {
  return Promise.resolve(true)
}

export const parseProgram = (program) => {
  program.dvis.map(parseObjectDates)

  return program
}

export const getProgram = async ({ id }) => {
  const { data: program } = await instance.get(
    `marketplace/view/educationalprogram/${id}/`
  )

  return program
}

export const getProgramQualifyTest = async ({id}) => {
  const { data: dvi } = await instance.get(
    `accounts/faculty/educationalprogram/${id}/dvi/`
  )
  
  return dvi
}

export const getPrograms = async ({ search, filters = {}, page = 1 } = {}) => {
  const parsedFilters = cloneDeep(filters)

  if (filters.extended) {
    filters.extended.forEach((value) => {
      if (value === "is_private") parsedFilters.is_national = false
      else parsedFilters[value] = true
    })
  }

  const { data } = await instance.get(
    "marketplace/view/educationalprogram-marketplace/",
    { params: { ...parsedFilters, search, p: page, page_size: 8 } }
  )

  return data
}

export const getProgramApplications = async ({ id }) => {
  const { data: applications } = await instance.get(
    `marketplace/view/educationalprogram/${id}/applications/`
  )

  return applications
}

export const getProgramApplicationsTable = async ({ id }) => {
  const { data: response } = await instance.get(
    `marketplace/view/educationalprogram/${id}/applications/table/`
  )

  return response.results
}

export const createProgram = async (program) => {
  const { data: createdProgram } = await instance.post(
    "accounts/faculty/educationalprogram/",
    program
  )

  return createdProgram
}

export const editProgram = async (data) => {
  await instance.put("accounts/faculty/educationalprogram/", data)
}

export const deleteProgram = async (data) => {
  await instance.delete("accounts/faculty/educationalprogram/", { data })
}

export const getProgramThresholds = async ({ id }) => {
  const { data: thresholds } = await instance.get(
    `accounts/faculty/educationalprogram/${id}/usethreshold/`
  )

  return thresholds
}
