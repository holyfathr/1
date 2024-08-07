import { z } from "zod";

const schema = z
  .object({
    previous_password: z.string().min(1),
    new_password: z.string()
      .min(10, "Не менее 10 символов")
      .regex(/[A-Z]/, "Не менее 1 прописной буквы")
      .regex(/\d/, "Не менее 1 цифры")
      .regex(/[!@#$%^&*(),.?":{}|<>]/, "Не менее 1 спец. знака"),
    password_confirm: z.string().min(1),
  })
  .refine((data) => data.new_password === data.password_confirm, {
    message: "Пароли не совпадают",
    path: ["password_confirm"],
  });

export const passwordConditions = [
  { regex: /.{10,}/, message: "Не менее 10 символов" },
  { regex: /[A-Z]/, message: "Не менее 1 прописной буквы" },
  { regex: /\d/, message: "Не менее 1 цифры" },
  { regex: /[!@#$%^&*(),.?":{}|<>]/, message: "Не менее 1 спец. знака" },
];

export default schema;
