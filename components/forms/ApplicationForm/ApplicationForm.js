import { useEffect, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import merge from "lodash/merge"
import dynamic from "next/dynamic"

import StepProgressBar from "components/ui/StepProgressBar"
import ManyDocumentsModal from "components/partials/ManyDocumentsModal"
import Program from "./sections/Program"

import { steps } from "validation/application-form"

import styles from "./application-form.module.scss"

const Priorities = dynamic(() => import("./sections/Priorities"))
const Information = dynamic(() => import("./sections/Information"))
const Agreements = dynamic(() => import("./sections/Agreements"))
const Overview = dynamic(() => import("./sections/Overview"))
const Code = dynamic(() => import("./sections/Code"))

const ApplicationForm = ({ onSubmit, defaultValues, phoneVerified }) => {
  const [step, setStep] = useState(0)

  const methods = useForm({
    defaultValues: merge({ programs: [] }, defaultValues),
    resolver: zodResolver(steps[step]),
    mode: "onTouched",
    reValidateMode: "onChange",
    shouldFocusError: true,
  })

  const onStepChange = async (newStep) => {
    const currentValues = methods.getValues()
    methods.clearErrors()

    for (let i = 0; i < newStep; i++) {
      const { success, error } = await steps[i].safeParseAsync(currentValues)
      if (!success)
        return error.issues.map((issue) => methods.setError(issue.path.join(".")))
    }

    setStep(newStep)
  }

  const onNext = async () => {
    const isStepValid = await methods.trigger()
    if (!isStepValid) return

    console.log(step)
    if (step === 4 && phoneVerified) {
      console.log("должен отправить запрос")
      await methods.handleSubmit(onSubmit)()
      return void 0
    }

    if (step === 5) {
      const alert = toast.loading("Проверка кода...")

      try {
        await verifyMutation.mutateAsync({ code })
        onNext()
      } catch {
        toast.dismiss(alert)
      }

      await methods.handleSubmit(onSubmit)()
      return void 0
    }

    setStep(step + 1)
  }

  const onPrev = () => setStep(step - 1)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [step])

  return (
    <FormProvider {...methods}>
      <StepProgressBar current={step} onChange={onStepChange} className={styles.wizard}>
        <StepProgressBar.Step>Направление</StepProgressBar.Step>
        <StepProgressBar.Step>Приоритеты</StepProgressBar.Step>
        <StepProgressBar.Step>Личные данные</StepProgressBar.Step>
        <StepProgressBar.Step>Согласия</StepProgressBar.Step>
        <StepProgressBar.Step>Проверка</StepProgressBar.Step>
      </StepProgressBar>

      <form
        data-dirty={methods.formState.isDirty}
        onSubmit={methods.handleSubmit(onNext)}
      >
        {/* <ManyDocumentsModal /> */}

        {step === 0 && <Program onNext={methods.handleSubmit(onNext)} />}
        {step === 1 && (
          <Priorities onPrev={onPrev} onNext={methods.handleSubmit(onNext)} />
        )}
        {step === 2 && (
          <Information onPrev={onPrev} onNext={methods.handleSubmit(onNext)} />
        )}
        {step === 3 && (
          <Agreements onPrev={onPrev} onNext={methods.handleSubmit(onNext)} />
        )}
        {step === 4 && (
          <Overview
            onPrev={onPrev}
            onSave={methods.handleSubmit(onSubmit)}
          />
        )}
        {step === 5 && <Code onNext={methods.handleSubmit(onSubmit)} onPrev={onPrev} />}
      </form>
    </FormProvider>
  )
}

export default ApplicationForm
