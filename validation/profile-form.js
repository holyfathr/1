import { z } from "zod"

const schema = z.object({
  name: z.string().min(1),
  surname: z.string().min(1),
  middle_name: z.string().min(1),
  phone_number: z.string().min(1),
  education_level:  z.string().max(1),
  // sex: z.enum(["M", "F"]),
  interests: z.array(
    z.object({
      id: z.number().int().positive(),
    })
  ),
})

export default schema
