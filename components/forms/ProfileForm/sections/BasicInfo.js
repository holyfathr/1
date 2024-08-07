import { useFormContext, Controller } from "react-hook-form"

import Input from "components/ui/Input"
import Label from "components/ui/Label"
import Subsection from "components/ui/Subsection"
import PhoneInput from 'react-phone-input-2';

import 'react-phone-input-2/lib/style.css';
import styles from "../profile-form.module.scss"

const BasicInfo = () => {
  const { register, formState, control } = useFormContext()

  return (
    <Subsection
      title="Заполни основную информацию"
      required
      contentClassName={styles.inputs}
    >
      <Label title="Твоё имя" hasError={formState.errors.name}>
        <Input {...register("name")} />
      </Label>

      <Label title="Твоя фамилия" hasError={formState.errors.surname}>
        <Input {...register("surname")} />
      </Label>

      <Label title="Твоё отчество (при наличии)" hasError={formState.errors.middle_name}>
        <Input {...register("middle_name")} />
      </Label>

      <Label title="Твой E-mail">
        <Input {...register("email")} type="email" disabled />
      </Label>

      <Label
        title={"Твой телефон"}
        hasError={formState.errors?.phone_number}
      >

        <Controller
          name="phone_number"
          control={control}
          render={({ field }) => (
            <PhoneInput
              country={'ru'}
              value={field.value}
              onChange={(value) => field.onChange(value)}
              inputClass={styles.phoneInput}
              inputStyle={{ 
                border: '1px solid #000000', 
                borderRadius:' 22px',
                padding: '0 auto',
                marginLeft: '1.3rem',
                width: '337px',
                height: '2.75rem', 
                fontSize: '0.9rem',
              }}
              buttonStyle={{
                border: '1px solid #000000',
                borderRadius: '22px 0px 0px 22px',
                paddingLeft: '0.9rem',
                paddingRight: '0.4rem', 
                height: '2.75rem', 
                backgroundColor: '#fff',
              }}
              dropdownStyle={{
                width: '328px',
                border: '1px solid #1E60F6',
                borderRadius:'22px',
                scrollbarWidth:' none',
                scrollbarGutter:' stable both-edges',
              }}
            />
          )}
        />
      </Label>
    </Subsection>
  )
}

export default BasicInfo
