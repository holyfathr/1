import { useQuery } from "react-query"

import * as account from "api/account"
import * as entrant from "api/entrant"
import * as faculty from "api/faculty"
import * as university from "api/university"
import * as program from "api/program"
import * as utils from "api/utils"

const useDefinedQuery = (key, options = {}) => {
  const query = useQuery(key.name, key.fn, options)

  return query
}

export const keys = {
  account: {
    name: ["account"],
    fn: account.getAccount,

    contacts: {
      name: ["account", "contacts"],
      fn: account.getAccountContacts,
    },

    entrant: {
      name: ["account", "entrant"],
      fn: entrant.getEntrantAccount,

      subjects: {
        name: ["account", "entrant", "subject", "list"],
        fn: entrant.getEntrantSubjects,
      },

      recommendations: {
        name: ["account", "entrant", "recommendation", "list"],
        fn: entrant.getEntrantRecommendations,
      },

      favourites: (page) => ({
        name: ["account", "entrant", "favourite", "list", page],
        fn: () => entrant.getEntrantFavourites({ page }),
      }),

      applications: (page) => ({
        name: ["account", "entrant", "application", "list", page],
        fn: () => entrant.getEntrantApplications({ page }),
      }),

      application: (id) => ({
        name: ["account", "entrant", "application", id],
        fn: () => entrant.getEntrantApplication({ id }),
      }),
    },

    faculty: {
      name: ["account", "faculty"],
      fn: faculty.getFacultyAccount,

      events: {
        name: ["account", "faculty", "event", "list"],
        fn: faculty.getFacultyEvents,
      },

      programs: {
        name: ["account", "faculty", "program", "list"],
        fn: faculty.getFacultyPrograms,

        events: {
          name: ["account", "faculty", "program", "list", "event", "list"],
          fn: faculty.getFacultyProgramsEvents,
        },
      },

      analytics: {
        name: ["account", "faculty", "analytics"],
        fn: faculty.getFacultyAnalytics,
      },

      applications: (page) => ({
        name: ["account", "faculty", "application", "list"],
        fn: () => faculty.getFacultyApplications(page),
      }),

      application: (id) => ({
        name: ["account", "faculty", "application", id],
        fn: () => faculty.getFacultyApplication({ id }),
      }),
    },

    university: {
      name: ["account", "university"],
      fn: university.getUniversityAccount,

      analytics: {
        name: ["account", "university", "analytics"],
        fn: university.getUniversityAnalytics,
      },

      faculties: {
        name: ["account", "university", "faculty", "list"],
        fn: university.getUniversityFaculties,
      },

      faculty: (id) => ({
        analytics: {
          name: ["account", "university", "faculty", id, "analytics"],
          fn: () => university.getUniversityFacultyAnalytics({ id }),
        },
      }),
    },

    admin: {
      universities: {
        name: ["account", "admin", "university", "list"],
        fn: university.getUniversities,
      },
    },
  },

  faculty: (id) => ({
    name: ["faculty", id],
    fn: () => faculty.getFaculty({ id }),
  }),

  university: (id) => ({
    name: ["university", id],
    fn: () => university.getUniversity({ id }),
  }),

  socialNetworks: {
    name: ["social-network", "list"],
    fn: utils.getSocialNetworks,
  },

  subjects: {
    name: ["subject", "list"],
    fn: utils.getSubjects,
  },

  formsOfEducation: {
    name: ["form-of-education", "list"],
    fn: utils.getFormsOfEducation,
  },

  levelsOfEducation: {
    name: ["level-of-education", "list"],
    fn: utils.getLevelsOfEducation,
  },

  interests: {
    name: ["interest", "list"],
    fn: utils.getInterests,
  },

  searchFilters: {
    name: ["search-filter", "list"],
    fn: utils.getSearchFilters,
  },

  languages: {
    name: ["language", "list"],
    fn: utils.getLanguages,
  },

  durations: {
    name: ["duration", "list"],
    fn: utils.getDurations,
  },

  programs: (query) => ({
    name: ["program", "list", JSON.stringify(query)],
    fn: () => program.getPrograms(query),
  }),

  program: (id) => ({
    name: ["program", id],
    fn: () => program.getProgram({ id }),

    applications: {
      name: ["program", id, "application", "list"],
      fn: () => program.getProgramApplications({ id }),

      table: {
        name: ["program", id, "application", "list", "table"],
        fn: () => program.getProgramApplicationsTable({ id }),
      },
    },

    dvi: {
      name: ["program", id, "dvi"],
      fn: () => program.getProgramQualifyTest({id})
    }
  }),
}

export default useDefinedQuery
