import { z } from "zod"

const schema = z
  .object({
    previous_password: z.string().min(1),
    password: z.string().min(1),
    password_confirm: z.string().min(1),
  })
  .refine((data) => data.password === data.password_confirm, {
    path: ["password_confirm"],
  })

export default schema
