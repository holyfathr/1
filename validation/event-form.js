import { z } from "zod"

const schema = z.object({
  id: z.any().transform((value) => (Number.isFinite(value) ? value : undefined)),
  address: z.string().nullish(),
  description: z.string().min(1),
  virtual_meeting: z.string().url().or(z.literal("")).nullish(),
  date: z.string().refine((value) => !isNaN(Date.parse(value))),
  educational_program: z.array(z.number().int().positive()).nullable(),
})

export default schema
