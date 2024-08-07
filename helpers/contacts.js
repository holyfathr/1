import { z } from "zod"

export const isContactsDefined = (contacts) =>
  hasValidAddress(contacts) ||
  hasTelegram(contacts) ||
  hasValidEmail(contacts) ||
  hasValidPhoneNumber(contacts) ||
  hasValidSiteLink(contacts)

export const hasValidAddress = (contacts) => {
  return z.string().min(1).safeParse(contacts?.address).success
}

export const hasValidEmail = (contacts) => {
  return z.string().email().safeParse(contacts?.email).success
}

export const hasValidPhoneNumber = (contacts) => {
  return z.string().min(1).safeParse(contacts?.phone_number).success
}

export const hasValidSiteLink = (contacts) => {
  return z.string().url().safeParse(contacts?.site_link).success
}

export const hasTelegram = (contacts) => {
  return z.string().url().safeParse(contacts?.telegram).success
}