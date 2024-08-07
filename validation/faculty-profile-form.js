import { z } from "zod"

import { isImage, isImageURL } from "helpers/files"

const schema = z.object({
  logo_link: z.custom(isImage).or(z.custom(isImageURL)).nullish(),
  title: z.string().min(1),
  abbreviation: z.string().min(1),
  short_description: z.string().max(200).nullish(),
  full_description: z.string().max(1000).nullish(),
  city: z.string().nullish(),
  contacts: z.object({
    address: z.string().nullish(),
    site_link: z.string().url().or(z.literal("")).nullish(),
    email: z.string().email().or(z.literal("")).nullish(),
    phone_number: z.string().nullish(),
    telegram: z.string().nullish(),
  }),
})

export default schema
