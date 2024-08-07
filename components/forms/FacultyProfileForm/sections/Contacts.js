import { Controller, useFormContext } from "react-hook-form"

import Input from "components/ui/Input"
import Label from "components/ui/Label"
import Subsection from "components/ui/Subsection"
import AddressInput from "components/ui/AddressInput"
import PhoneInput from "components/ui/PhoneInput"

import styles from "../faculty-profile-form.module.scss"

const Contacts = () => {
  const { register, formState, control, setValue } = useFormContext()

  const onAddressChange = (suggestion) => {
    if (!formState.dirtyFields.hasOwnProperty("city"))
      setValue("city", suggestion.data.city)
  }

  return (
    <Subsection title="Контакты" contentClassName={styles.contacts}>
      <Label title="Ссылка на сайт" hasError={formState.errors.contacts?.site_link}>
        <Input {...register("contacts.site_link")} type="url" />
      </Label>

      <Label title="Введите ваш E-mail" hasError={formState.contacts?.email}>
        <Input {...register("contacts.email")} type="email" />
      </Label>

      <Label title="Адрес" hasError={formState.errors.contacts?.address}>
        <Controller
          name="contacts.address"
          control={control}
          render={({ field }) => (
            <AddressInput onSuggestionChange={onAddressChange} {...field} />
          )}
        />
      </Label>

      <Label title="Телефон" hasError={formState.contacts?.phone_number}>
        <PhoneInput {...register("contacts.phone_number")} />
      </Label>

      <Label title="Телеграмм (опционально) – ссылка" hasError={formState.errors.telegram}>
        <Input {...register("contacts.telegram")} />
      </Label>

    </Subsection>
  )
}

export default Contacts
