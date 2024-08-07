import { Controller, useFormContext } from "react-hook-form"

import Subsection from "components/ui/Subsection"
import Label from "components/ui/Label"
import Input from "components/ui/Input"
import AddressInput from "components/ui/AddressInput"
import PhoneInput from "components/ui/PhoneInput"

import styles from "../university-profile-form.module.scss"

const Contacts = () => {
  const { register, formState, control, setValue } = useFormContext()

  const onAddressChange = (suggestion) => {
    setValue("city", suggestion.data.city)
  }

  return (
    <Subsection title="Контакты" contentClassName={styles.contacts}>
      <Label title="Ссылка на сайт*" hasError={formState.errors.contacts?.site_link}>
        <Input {...register("contacts.site_link")} type="url" placeholder="Ссылка на сайт вуза"/>
      </Label>

      <Label title="Email*" hasError={formState.errors.contacts?.email}>
        <Input {...register("contacts.email")} type="email" placeholder="Email вуза"/>
      </Label>

      <Label title="Адрес* " hasError={formState.errors.contacts?.address}>
        <Controller
          name="contacts.address"
          control={control}
          render={({ field }) => (
            <AddressInput onSuggestionChange={onAddressChange} {...field} placeholder="Адрес вуза"/>
          )}
        />
      </Label>

      <Label title="Телефон*" hasError={formState.errors.contacts?.phone_number}>
        <PhoneInput {...register("contacts.phone_number")} />
      </Label>

      <Label title="Telegram ссылка (опционально)">
        <PhoneInput {...register("contacts.telegram")} placeholder="t.me/"/>
      </Label>
    </Subsection>
  )
}

export default Contacts
