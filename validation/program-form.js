import { z } from "zod"

const schema = z.object({
  title: z.string().min(1),
  form_of_education: z.string().min(1),
  level_of_education: z.string().min(1),
  discipline_code: z.string().nullable(),
  full_description: z.string().max(1000),
  duration: z.string(),
  commerce_cost: z.number().int().nonnegative().nullable(),
  languages: z.array(z.number().int().positive()),
  link_to_university_info: z.string().url().nullable(),
  closing_date: z.string().refine((date) => {
    const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(date);
    return isValidDate && !isNaN(Date.parse(date));
  }),
  dvis: z.array(
    z.object({
      type: z.string().min(1),
      description: z.string().nullish(),
      exams: z.array(z.number()).nullish(),
    })
  )
})

export default schema
