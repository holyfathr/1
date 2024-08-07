import { pluralize } from "numeralize-ru"
import isValid from "date-fns/isValid"
import parseISO from "date-fns/parseISO"
import format from "date-fns/format"
import { ru } from "date-fns/locale"
import capitalize from "lodash/capitalize"

export const formatCount = (count, one, two, five) => {
  return `${count} ${formatCountNoun(count, one, two, five)}`
}

export const formatCountNoun = (count, one, two, five) => {
  return pluralize(count, one, two, five)
}

export const formatNumber = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
}

export const formatDate = (date, formatString = "d MMMM yyyy") => {
  if (!isValid(date)) date = parseISO(date)

  return isValid(date) ? format(date, formatString, { locale: ru }) : undefined
}

export const formatDateString = (date, formatString = "dd.MM.yyyy") => {
  if (!isValid(date)) date = parseISO(date)

  return isValid(date) ? format(date, formatString, { locale: ru }) : undefined
}


export const formatDateYear = (date, formatString = " yyyy ") => {
  if (!isValid(date)) date = parseISO(date)

  return isValid(date) ? format(date, formatString, { locale: ru }) : undefined
}

export const formatPrice = (price) => {
  return Number.isFinite(price) ? formatNumber(price) + " ₽" : undefined
}

export const formatNameShort = (name, surname, middleName) => {
  if (name && surname && middleName) {
    return `${capitalize(surname)} ${capitalize(name)[0]}. ${capitalize(middleName)[0]}.`
  } else if (name && surname && !middleName) {
    return `${capitalize(surname)} ${capitalize(name)[0]}.`
  } else if (name) {
    return capitalize(name)
  }

  return undefined
}

export const formatName = (name, surname, middleName) => {
  if (!name && !surname && !middleName) return undefined

  return [surname, name, middleName].join(" ").trim()
}

export const formatProgram = (program) => {
  if (program?.university_obj?.abbreviation && program?.title) {
    return `«${program.title}» от ${program.university_obj.abbreviation}`
  } else if (program?.title) {
    return `«${program.title}»`
  }

  return undefined
}
