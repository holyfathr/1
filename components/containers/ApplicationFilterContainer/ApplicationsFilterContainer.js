import { Controller, useFormContext } from "react-hook-form"

import Select from "components/ui/Select"

import styles from "./application-filters.module.scss"

const ApplicationsFilterContainer = () => {

  return(
    <div className={styles.filters}>
      <Select placeholder="Статус вуза" options={[
        {value: 'A', label: 'Одобрена'},
        {value: 'R', label: 'Отклонена'},
        {value: 'W', label: 'Ожидает рассмотрения'},
        {value: 'I', label: 'Не соответствует требованиям'},
        {value: 'V', label: 'Отправлено визовое приглашение'}
      ]}/>
      <Select placeholder="Статус абитуриента" options={[
        {value: 'A', label: 'Получено согласие'},
        {value: 'W', label: 'Отозвана'},
        {value: 'P', label: 'Ожидается ответ абитуриента '}
      ]}/>
      <Select placeholder="Приоритет вуза" options={[
        {value: '1', label: '1'},
        {value: '2', label: '2'},
        {value: '3', label: '3'},
        {value: '4', label: '4'},
        {value: '5', label: '5'}
      ]}/>
      <Select placeholder="Страна"/>
      <Select placeholder="Сортировка" icon="bar-chart"/>
    </div>
  )
}

const Filter = ({ name, ...props }) => {
  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => <Select {...field} {...props} />}
    />
  )
}

export default ApplicationsFilterContainer