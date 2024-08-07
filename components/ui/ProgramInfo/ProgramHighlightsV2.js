import clsx from "clsx"
import HighlightV2 from "components/ui/HighlightV2"

import { getFormOfEducationTitle, getLevelOfEducationDegreeTitle, getQualifyTestType } from "helpers/enums"
import { formatPrice } from "helpers/language"
import { getProgramLanguage } from "helpers/enums"

import { useTranslation } from "next-i18next"

import Row from "../Row"

const ProgramHighlightsV2 = ({ program, className, ...props }) => {
  const { i18n: { language }, t } = useTranslation('stat-card')
  className = clsx(className)

  return (
    <div className={className} {...props}>
      <Row>
        <div className="highlightCollumn">
          {program.form_of_education && (
            <HighlightV2 title={t("educationLevel")} value={getLevelOfEducationDegreeTitle(program.level_of_education)} />
          )}
          {program.languages && (
            <HighlightV2 title={t("educationLang")} value={getProgramLanguage(program.languages)}/>
          )}
          {program.language && (
            <HighlightV2 title={t("educationLang")} value={getProgramLanguage(program.language)}/>
          )}
          {Number.isFinite(program.commerce_cost) && (
            <HighlightV2 title={t("educationFees")} value={formatPrice(program.commerce_cost)} />
          )}
        </div>
        <div className="highlightCollumn">
          {program.level_of_education && (
              <HighlightV2 title={t("educationForm")} value={getFormOfEducationTitle(program.form_of_education)} />
          )}
          {program?.dvi[0]?.type && (
            <HighlightV2 title={t("entrTest")} value={getQualifyTestType(program.dvi[0].type)}/>
          )}
          <HighlightV2 title={t("programDuration")} value={program.duration} />
        </div>
      </Row>
    </div>
  )
}

export default ProgramHighlightsV2
