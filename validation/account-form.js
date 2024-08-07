import { z } from "zod"

const schema = z.object({
  title: z.string().min(1),
  email: z.string().email(),
  visible: z.boolean(),
})

export default schema
