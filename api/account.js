import { instance } from "api/setup"

/**
 * Returns current user account.
 *
 * @returns {Promise<object>} User account
 */
export const getAccount = async () => {
  const { data: account } = await instance.get("accounts/account/")
  // const { data: account } = await instance.get("accounts/account/", {
  //   headers: { Language: "en" },
  // })

  return account
}

/**
 * Returns current user contacts.
 *
 * @returns {Promise<object>} User contacts
 */
export const getAccountContacts = async () => {
  const { data: contacts } = await instance.get("accounts/contact/")

  return contacts
}

/**
 * Updates current user contacts.
 *
 * @param {object} contacts - New contacts
 */
export const editAccountContacts = async (contacts) => {
  await instance.put("accounts/contact/", contacts)
}

/**
 * Retracts agreement from the given application.
 *
 * @param {object} application - Application to retract agreement from
 */
export const putApplication = async ({ id, entrant_status, university_status }) => {
  await instance.put("/accounts/entrant/application-status-change/", {
    id,
    entrant_status,
    university_status,
  })
}

/**
 * Retracts agreement from the given application.
 *
 * @param {object} application - Application to retract agreement from
 */
export const putApplicationFac = async ({ id, entrant_status, university_status }) => {
  await instance.put("/accounts/faculty/application-status-change/", {
    id,
    entrant_status,
    university_status,
  })
}

/**
 * Retracts agreement from the given application.
 *
 * @param {object} application - Application to retract agreement from
 */
export const putUniversityComment = async ({ id, university_comment, educational_program_id }) => {
  await instance.put(`/accounts/faculty/educationalprogram/${educational_program_id}/application-comment/`, {
    id,
    university_comment,
  })
}
