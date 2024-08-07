import { instance } from "api/setup"
import { uploadObjectFiles } from "api/files"

/**
 * Creates new achievement.
 *
 * @param {object} param0 - Function arguments object
 * @param {object} param0.achievement - Achievement object
 * @param {number} param0.application_id - Unique identifier of the
 * application the given achievement will be attached to
 *
 * @returns {Promise<object>} Created achievement
 */
export const createAchievement = async ({ achievement, application_id }) => {
  await uploadObjectFiles(achievement)

  const { data: uploadedAchievement } = await instance.post(
    `application/${application_id}/achievement/`,
    achievement
  )

  return uploadedAchievement
}

/**
 * Creates new application.
 *
 * @param {object} application - Application to create
 *
 * @returns {Promise<object>} Created application
 */
export const createApplication = async (application) => {
  const { data: createdApplication } = await instance.post("application/", application)

  return createdApplication
}

/**
 * Deletes the given application.
 *
 * @param {object} param0 - Application
 * @param {number} param0.id - Unique identifier of the application
 */
export const deleteApplication = async ({ id }) => {
  await instance.delete("application/", { data: { id } })
}

/**
 * Passes agreement to the given application.
 *
 * @param {object} application - Application to pass agreement to
 */
export const passApplicationAgreement = async ({ id }) => {
  await instance.put("application/", { id, has_agreement: true })
}

/**
 * Retracts agreement from the given application.
 *
 * @param {object} application - Application to retract agreement from
 */
export const retractApplicationAgreement = async ({ id }) => {
  await instance.put("application/", { id, has_agreement: false })
}
