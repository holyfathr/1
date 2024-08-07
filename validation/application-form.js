import { z } from "zod"

import { isFile } from "helpers/files"

const programs = z
  .array(
    z.object({
      training_form: z.enum(["B", "P", "A"]),
      id: z.number().int().nonnegative(),
    })
  )
  .nonempty()

const programStep = z.object({ programs })

const personalInfoStep = z.object({
  entrant: z.object({
    face_image_link: z.custom(isFile).or(z.string().url()).nullish(),
    sex: z.enum(["M", "F"]),
    surname: z.string().min(1),
    name: z.string().min(1),
    middle_name: z.string().nullish(),
    russian_knowledge_level: z.boolean().or(z.string().min(1)),
    needs_dormitory: z.boolean(),
    citizenship: z.string().min(1),
    diploma_image_link: z.custom(isFile).or(z.string().url()).nullish(),
    doc_image_link: z.custom(isFile).or(z.string().url()).nullish(),
  }),
  // phone_number: z.string().min(1),
  date_of_birth: z.string().refine((date) => !isNaN(Date.parse(date))),
  visa_city: z.string().min(1),
  doc_type: z.string().min(1),
  doc_country_issued: z.string().min(1),
  doc_number: z.string().regex(/^\d{2} \d{2} \d{6}$/),
  doc_date_issued: z.string().refine((date) => !isNaN(Date.parse(date))),
  education_level: z.string().min(1).nullish(),
  diploma_date_issued: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)))
    .nullish(),
})
// .refine(async (data) => {
//   for (const program of data.programs) {
//     const canApply = await canApplyProgram(program, data.exam_results)

//     if (!canApply) {
//       const fullProgram = await getProgram({ id: program.id })
//       toast.error(`Ты не проходишь на программу ${formatProgram(fullProgram)}`)
//       return false
//     }
//   }

//   return true
// })

const agreementStep = z.object({
  agreements: z.literal(true),
})

const steps = [programStep, z.any(), personalInfoStep, agreementStep, z.any()]

const schema = steps.reduce((result, step) => z.intersection(result, step), z.any())

export { steps, schema }
