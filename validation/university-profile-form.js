import { z } from "zod";

import { isImage, isImageURL } from "helpers/files";

const schema = z.object({
  logo_link: z.custom(isImage).or(z.custom(isImageURL)).nullish(),
  image_link: z.custom(isImage).or(z.custom(isImageURL)).nullish(),
  background_color: z
    .string()
    .regex(/^#(?:[0-9a-f]{3}){1,2}$/i)
    .or(z.literal(""))
    .nullish(),
  title: z.string().min(1),
  city: z.string().nullish(),
  abbreviation: z.string().min(1),
  is_national: z.boolean().nullish(),
  short_description: z.string().max(200).nullish(),
  full_description: z.string().max(2000).nullish(),
  has_visa_support: z.boolean().nullish(),
  has_migration_support: z.boolean().nullish(),
  is_dormitory_available: z.boolean().nullish(),
  contacts: z.object({
    address: z.string().nullish(),
    site_link: z.string().url().or(z.literal("")).nullish(),
    email: z.string().email().or(z.literal("")).nullish(),
    phone_number: z.string().nullish(),
    telegram: z.string().nullish(),
  }),
  gallery: z.array(z.object({
    position: z.number(),
    image_link: z.custom(isImage).or(z.custom(isImageURL)),
    description: z.string(),
  })).nullish()
});

export default schema;
