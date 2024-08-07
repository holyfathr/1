export const getFormOfEducationTitle = (value) => {
  switch (value) {
    case "О":
      return "Очная"
    case "ОЗ":
      return "Очно-заочная"
    case "З":
      return "Заочная"
  }
}

export const getLevelOfEducationDegreeTitle = (value) => {
  switch (value) {
    case "B":
      return "Бакалавриат"
    case "M":
      return "Магистратура"
    case "P":
      return "Подготовительный факультет"
    case "S":
      return "Специалитет"
  }
}

export const getQualifyTestType = (value) => {
  switch (value) {
    case "T":
      return "Тестирование"
    case "I":
      return "Интервью"
    case "P":
      return "Конкурс портфолио"
    case "N": 
      return "Нет"
  }
}

export const getEntrantSex = (value) => {
  switch (value) {
    case "M":
      return "Мужской"
    case "F":
      return "Женский"
  }
}

export const getProgramLanguage = (languages) => {

  return languages
    .map(obj => obj.russian_title || "")
    .join(", "); 
}

export const getCitizenship = (value) => {
  switch (value) {
    case "N":
      return "Лицо без гражданства"
    case "BY":
      return "Беларусь"
    case "EG":
      return "Египет"
    case "IN":
      return "Индия"
    case "KZ":
      return "Казахстан"
    case "KG":
      return "Киргизия"
    case "CN":
      return "Китай"
    case "MA":
      return "Марокко"
    case "NG":
      return "Нигерия"
    case "SR":
      return "Сербия"
    case "SY":
      return "Сирия"
    case "TJ":
      return "Таджикистан"
    case "TH":
      return "Таиланд"
    case "TM":
      return "Туркменистан"
    case "TR":
      return "Турция"
    case "UZ":
      return "Узбекистан"
  }
}

// export const getLevelOfEducationDegreeTitle = (lng, value) => {
//   if (lng === "ru") {
//     switch (value) {
//       case "B":
//         return "Бакалавр"
//       case "M":
//         return "Магистр"
//       case "P":
//         return "Аспирантура"  
//       case "S":
//         return "Специалитет"
//     }
//  if (lng === "en") {
//     switch (value) {
//       case "B":
//         return "Bachelor"
//       case "M":
//         return "Master"
//       case "P":
//         return "Postgraduate"
//       case "S":
//         return "Specialist"
//     }
//   }

//   return null
// }


// export const getFormOfEducationTitle = (lng, value) => {

//   if (lng === "ru") {
//     switch (value) {
//       case "О":
//         return "Очная"
//       case "ОЗ":
//         return "Очно-заочная"
//       case "З":
//         return "Заочная"
//     }
//   }
//   else if (lng === "en") {
//     switch (value) {
//       case "О":
//         return "Full-time"
//       case "ОЗ":
//         return "Part-time"
//       case "З":
//         return "Absentee"
//     }
//   }

//   return null
// }

export const getTrainingFormTitle = (lng, value) => {
  if (lng === "ru") {
    switch (value) {
      case "B":
        return "Бюджет"
      case "P":
        return "Коммерция"
      case "A":
        return "Бюджет + коммерция"
    }
  }
  else if (lng === "en"){
    switch (value) {
      case "B":
        return "Бюджет"
      case "P":
        return "Коммерция"
    }
  }

  return null
}
