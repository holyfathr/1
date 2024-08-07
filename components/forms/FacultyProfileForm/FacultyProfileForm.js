import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"

import EventsControlContainer from "components/containers/EventsControlContainer"
import ProgramsControlContainer from "components/containers/ProgramsControlContainer"

import Button from "components/ui/Button"
import Logo from "./sections/Logo"
import Titles from "./sections/Titles"
import Description from "./sections/Description"
import Contacts from "./sections/Contacts"

import schema from "validation/faculty-profile-form"

import styles from "./faculty-profile-form.module.scss"

const FacultyProfileForm = ({ defaultValues, onSubmit, disabled, ...props }) => {
  const methods = useForm({
    defaultValues,
    resolver: zodResolver(schema),
  })

  console.log(defaultValues)

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className={styles.form}
        data-dirty={methods.formState.isDirty}
        {...props}
      >
        <Logo />
        <Titles />
        <EventsControlContainer title="Дни открытых дверей" />
        <ProgramsControlContainer title="Образовательные программы" />
        <Contacts />

        <Button type="submit" disabled={disabled}>
          Сохранить изменения
        </Button>
      </form>
    </FormProvider>
  )
}

export default FacultyProfileForm
