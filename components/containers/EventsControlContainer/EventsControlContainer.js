import toast from "react-hot-toast"
import { useMutation, useQueryClient } from "react-query"

import EventsControl from "components/partials/EventsControl"

import useDefinedQuery, { keys } from "hooks/use-defined-query"

import { createEvent, deleteEvent, editEvent } from "api/event"

import errorHandler from "helpers/error-handler"

const EventsControlContainer = (props) => {
  const queryClient = useQueryClient()

  const { data: events = [] } = useDefinedQuery(keys.account.faculty.events)
  const { data: programsEvents = [] } = useDefinedQuery(
    keys.account.faculty.programs.events
  )

  const createMutation = useMutation(createEvent, { onError: errorHandler })
  const deleteMutation = useMutation(deleteEvent, { onError: errorHandler })
  const editMutation = useMutation(editEvent, { onError: errorHandler })

  const updateEventsQueries = async () => {
    await queryClient.invalidateQueries({
      predicate: ({ queryKey }) => queryKey.includes("event"),
    })
  }

  const onAdd = async (data) => {
    const alert = toast.loading("Добавление дня открытых дверей...")

    try {
      await createMutation.mutateAsync(data)
      await updateEventsQueries()

      toast.success("День открытых дверей успешно добавлен", { id: alert })
      return true
    } catch {
      toast.dismiss(alert)
    }

    return false
  }

  const onEdit = async (event) => {
    const alert = toast.loading("Редактирование дня открытых дверей...")

    try {
      await editMutation.mutateAsync(event)
      await updateEventsQueries()

      toast.success("День открытых дверей успешно отредактирован", { id: alert })
      return true
    } catch {
      toast.dismiss(alert)
    }

    return false
  }

  const onDelete = async (event) => {
    const alert = toast.loading("Удаление дня открытых дверей...")

    try {
      await deleteMutation.mutateAsync(event)
      await updateEventsQueries()

      toast.success("День открытых дверей успешно удалён", { id: alert })
    } catch {
      toast.dismiss(alert)
    }
  }

  return (
    <EventsControl
      events={[...events, ...programsEvents]}
      onAdd={onAdd}
      onDelete={onDelete}
      onEdit={onEdit}
      {...props}
    />
  )
}

export default EventsControlContainer
