import capitalize from "lodash/capitalize"

import { instance } from "api/setup"

export const getSocialNetworks = async () => {
  return Promise.resolve([
    // {
    //   type: "yandex",
    //   href: process.env.NEXT_PUBLIC_API_ROOT + "auth/social/login/yandex-oauth2",
    // },
    {
      type: "google",
      href: process.env.NEXT_PUBLIC_API_ROOT + "auth/social/login/google-oauth2",
    },
    // {
    //   type: "mailru",
    //   href: process.env.NEXT_PUBLIC_API_ROOT + "auth/social/login/mailru",
    // },
    // {
    //   type: "vk",
    //   href: process.env.NEXT_PUBLIC_API_ROOT + "auth/social/login/vk-oauth2",
    // },
    // {
    //   type: "odnoklassniki",
    //   href: process.env.NEXT_PUBLIC_API_ROOT + "auth/social/login/odnoklassniki-oauth2",
    // },
    {
      type: "steam",
      href: process.env.NEXT_PUBLIC_API_ROOT + "auth/social/login/steam",
    },
  ])
}

export const getSubjects = async () => {
  const { data: subjects } = await instance.get("accounts/account/examtable/")

  return subjects
}

export const getLanguages = async () => {
  const { data: languages } = await instance.get("accounts/language/")

  return languages
}

export const getDurations = async () => {
  return Promise.resolve([
    { label: "2 года", value: "2 года" },
    { label: "3 года", value: "3 года" },
    { label: "4 года", value: "4 года" },
    { label: "5 лет", value: "5 лет" },
    { label: "6 лет", value: "6 лет" },
  ])
}

export const getInterests = async () => {
  const { data: interests } = await instance.get("accounts/account/interest/")

  return interests
}

export const getCities = async () => {
  const { data: cities } = await instance.get("marketplace/view/unique-cities/")

  return cities
}

export const getDisciplines = async () => {
  let { data: disciplines } = await instance.get("marketplace/view/fields-of-study/")

  // TODO: remove
  disciplines = disciplines.filter((discipline) => !!discipline.supercategory)

  // TODO: remove
  disciplines.forEach((discipline) => {
    discipline.title = capitalize(discipline.title)
    discipline.supercategory = capitalize(discipline.supercategory)
  })

  return disciplines
}

export const getFormsOfEducation = async () => {
  return Promise.resolve([
    { value: "О", label: "Очная" },
    { value: "ОЗ", label: "Очно-заочная" },
    { value: "З", label: "Заочная" },
  ])
}

export const getLevelsOfEducation = async () => {
  return Promise.resolve([
    { value: "P", label: "Подготовительный факультет"},
    { value: "S", label: 'Специалитет'},
    { value: "B", label: "Бакалавриат" },
 // { value: "M", label: "Магистратура" },
  ])
}

export const getLanguagesOfEducation = async () => {
  return Promise.resolve([
    { value: "R", i18nLabel: "filters.educationLanguageOptions.ru" },
    { value: "E", i18nLabel: "filters.educationLanguageOptions.en" },
  ])
}

export const getSearchFilters = async () => {
  const [cities, disciplines, formsOfEducation, levelsOfEducation, languagesOfEducation] =
    await Promise.all([
      getCities(),
      getDisciplines(),
      getFormsOfEducation(),
      getLevelsOfEducation(),
      getLanguagesOfEducation(),
    ])

  return {
    form_of_education: {
      i18nLabel: "filters.educationForm",
      type: "select",
      options: formsOfEducation,
    },
    level_of_education: {
      i18nLabel: "filters.educationLevel",
      type: "select",
      options: levelsOfEducation,
    },
    languages_of_education: {
      i18nLabel: "filters.educationLanguage",
      type: "select",
      options: languagesOfEducation,
    },
    extended: {
      i18nLabel: "filters.extended",
      type: "select",
      options: [
        // { value: "has_military_department", i18nLabel: "filters.extendedOptions.migrationSupport" },
        // { value: "has_scholarships_and_discounts", i18nLabel: "filters.extendedOptions.hasScholarshipsAndDiscounts" },
        { value: "is_dormitory_available", i18nLabel: "filters.extendedOptions.isDormitoryAvailabel" },
      ],
    },
    faculty_city: {
      i18nLabel: "filters.facultyCity",
      type: "select",
      options: cities.map((city) => ({ value: city, label: city })),
    },
    discipline_code: {
      i18nLabel: "filters.fieldOfStudy",
      type: "select",
      options: disciplines.map((discipline) => ({
        value: discipline.code,
        label: discipline.title,
        category: discipline.supercategory,
      })),
    },
    commerce_cost: {
      i18nLabel: "filters.cost",
      type: "range",
    },
    ordering: {
      i18nLabel: "filters.ordering",
      type: "pick",
      options: [
        { value: "title", i18nLabel: "filters.orderingOptions.title" },
        { value: "-title", i18nLabel: "filters.orderingOptions.titleDesc" },
        { value: "commerce_cost", i18nLabel: "filters.orderingOptions.commerceCost" },
        { value: "-commerce_cost", i18nLabel: "filters.orderingOptions.commerceCostDesc" },
        // { value: "last_year_passing_score", i18nLabel: "filters.orderingOptions.lastYearPassingScore" },
        // { value: "-last_year_passing_score", i18nLabel: "filters.orderingOptions.lastYearPassingScoreDesc" },
      ],
    },
  }
}
