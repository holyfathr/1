import { useMemo } from "react"
import { useMutation, useQueryClient } from "react-query"
import toast from "react-hot-toast"
import { useRouter } from "next/router"
import { format } from 'date-fns';

import ApplicationForm from "components/forms/ApplicationForm"

import useDefinedQuery, { keys } from "hooks/use-defined-query"

import { createApplication } from "api/application"
import { editEntrantAccount } from "api/entrant"

import errorHandler from "helpers/error-handler"

const ApplicationFormContainer = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  const { data: account } = useDefinedQuery(keys.account)
  const { data: entrant } = useDefinedQuery(keys.account.entrant)

  console.log(entrant)

  const createMutation = useMutation(createApplication, { onError: errorHandler })
  const editEntrantMutation = useMutation(editEntrantAccount, { onError: errorHandler })

  const onSubmit = async (formData) => {
    console.log("Form data:", formData)

    const { entrant, programs, ...application } = formData

    if (!entrant) {
      toast.error("Данные абитуриента отсутствуют.")
      return
    }

    try {
      console.log(entrant)
      await editEntrantMutation.mutateAsync(entrant)
      await queryClient.invalidateQueries({
        predicate: ({ queryKey }) => queryKey.includes("entrant"),
      })
    } catch (error) {
      toast.error("Ошибка при редактировании данных абитуриента.")
      console.error("Error editing entrant data:", error)
      return
    }

    const alert = toast.loading("Создание заявок...")

    const currentDate = format(new Date(), 'yyyy-MM-dd');

    for (let i = 0; i < programs.length; i++) {
      try {
        const applicationData = {
          educational_program: programs[i].id,
          needs_dormitory: entrant.needs_dormitory,
          priority: i + 1,
          has_agreement: application.has_agreement || false,
          entrant_status: application.entrant_status || "P",
          university_status: application.university_status || "D",
          position: application.position || "string",
          update_date: application.update_date || "2022-01-01",
          visa_city: application.visa_city || "A",
          is_final: application.is_final || true,
          withdrawn: application.withdrawn || false,
          date: currentDate,
          name: entrant.name || "Иван",
          surname: entrant.surname || "Иванов",
          middle_name: entrant.middle_name || "Иванович",
          phone_number: entrant.phone_number || "88005553535",
          sex: entrant.sex || "M",
          citizenship: application.citizenship || "Россия",
          face_image_link: entrant.face_image_link || "string",
          doc_type: application.doc_type || "passport",
          doc_date_issued: application.doc_date_issued || "2022-01-01",
          doc_country_issued: application.doc_country_issued || "Russia",
          doc_number: application.doc_number || "70707777",
          doc_image_link: entrant.doc_image_link || "string",
          education_level: entrant.education_level || "U",
          diploma_image_link: entrant.diploma_image_link || "string",
          diploma_date_issued: application.diploma_date_issued || "2022-01-01",
          russian_knowledge_level: entrant.russian_knowledge_level || "A1",
          date_of_birth: application.date_of_birth || "2022-01-01",
        }

        // console.log("Application data:", applicationData)

        const { id } = await createMutation.mutateAsync(applicationData)

        // await Promise.all(
        //   achievements.map((achievement) => {
        //     return achievementMutation.mutateAsync({ achievement, application_id: id })
        //   })
        // )
      } catch (error) {
        console.error("Error response from the server:", error.response)
        if (error.response && error.response.data) {
          console.error("Detailed error response:", error.response.data)
        }
        toast.error("Ошибка при создании заявки.")
        toast.dismiss(alert)
        return
      }
    }

    toast.dismiss(alert)
    await router.push({ pathname: "/applications/", query: { after_create: true } })
  }

  const defaultValues = useMemo(() => {
    if (!entrant || !account) return undefined
    return { contact: { email: account.username }, entrant }
  }, [entrant, account])

  if (!defaultValues) return "Загрузка..."

  return (
    <ApplicationForm
      defaultValues={defaultValues}
      onSubmit={onSubmit}
      phoneVerified={entrant.phone_verified}
    />
  )
}

export default ApplicationFormContainer
