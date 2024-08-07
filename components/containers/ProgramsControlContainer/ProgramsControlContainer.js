import toast from "react-hot-toast"
import { useMutation, useQueryClient } from "react-query"

import ProgramsControl from "components/partials/ProgramsControl"

import useDefinedQuery, { keys } from "hooks/use-defined-query"

import { createProgram, deleteProgram, editProgram } from "api/program"

import errorHandler from "helpers/error-handler"

const ProgramsControlContainer = (props) => {
  const queryClient = useQueryClient()

  const { data: programs = [] } = useDefinedQuery(keys.account.faculty.programs)

  console.log(programs)

  const createMutation = useMutation(createProgram, { onError: errorHandler })
  const editMutation = useMutation(editProgram, { onError: errorHandler })
  const deleteMutation = useMutation(deleteProgram, { onError: errorHandler })

  const updateProgramsQueries = async () => {
    await queryClient.invalidateQueries({
      predicate: ({ queryKey }) => queryKey.includes("program"),
    })
  }

  const onAdd = async (data) => {
    const alert = toast.loading("Добавление образовательной программы...")

    try {
      await createMutation.mutateAsync(data)
      await updateProgramsQueries()

      toast.success("Образовательная программа успешно добавлена", { id: alert })
      return true
    } catch  (error){
      console.error("Error response from the server:", error.response);

      if (error.response && error.response.data) {
        console.error("Detailed error response:", error.response.data);
      }
      toast.dismiss(alert);
    }
    return false;
  }

  const onEdit = async (data) => {
    const alert = toast.loading("Редактирование образовательной программы...")

    try {
      await editMutation.mutateAsync(data)
      await updateProgramsQueries()

      toast.success("Образовательная программа успешно отредактирована", { id: alert })
      return true
    } catch {
      toast.dismiss(alert)
    }

    return false
  }

  const onDelete = async (program) => {
    const alert = toast.loading("Удаление образовательной программы...")

    try {
      await deleteMutation.mutateAsync({ id: program.id })
      await updateProgramsQueries()

      toast.success("Образовательная программа успешно удалена", { id: alert })
    } catch {
      toast.dismiss(alert)
    }
  }

  return (
    <ProgramsControl
      onAdd={onAdd}
      onDelete={onDelete}
      onEdit={onEdit}
      programs={programs}
      {...props}
    />
  )
}

export default ProgramsControlContainer
