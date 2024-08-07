import { instance } from "api/setup"

export const editEvent = async (event) => {
  await instance.put(
    event.educational_program
      ? "accounts/faculty/educationalprogram/openday/"
      : "accounts/faculty/openday/",
    event
  )
}

export const createEvent = async (event) => {
  const { data: createdEvent } = await instance.post(
    event.educational_program
      ? "accounts/faculty/educationalprogram/openday/"
      : "accounts/faculty/openday/",
    event
  )

  return createdEvent
}

export const deleteEvent = async (event) => {
  await instance.delete(
    event.educational_program
      ? "accounts/faculty/educationalprogram/openday/"
      : "accounts/faculty/openday/",
    { data: { id: event.id } }
  )
}
