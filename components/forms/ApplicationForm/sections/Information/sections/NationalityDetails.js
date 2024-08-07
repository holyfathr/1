import { Controller, useFormContext } from "react-hook-form"

import Input from "components/ui/Input"
import Select from "components/ui/Select"
import Label from "components/ui/Label"
import Subsection from "components/ui/Subsection"

import styles from "../information.module.scss"

const NationalityDetails = () => {

  const { register, control, formState } = useFormContext()

  return (
    <Subsection 
      title="Данные о гражданстве"
    >
      <div className={styles.program}>
        <p className={styles.text}>
          Если ты подаёшься из-за пределов России, выбери гражданство, указанное в твоём паспорте. Если у тебя двойное гражданство и тебе 
          нужна виза для въезда в Россию, выбери гражданство, указанное в паспорте, который ты собираешься использовать при въезде в Россию. 
          Если у тебя нет действующего гражданства, укажи страну, выдавшую проездной документ, который ты собираешься использовать при въезде в Россию.
        </p>
        <p className={styles.bold}>
          Согласно российскому законодательству, если у тебя есть российский паспорт,
          ты должен(на) подать заявку как гражданин России.
        </p>
        <span className={styles.rowInputs}>
          <Label title="Твоё гражданство*" hasError={formState.errors?.citizenship}>
              <Controller
                control={control}
                name="citizenship"
                render={({ field }) => (
                  <Select
                    placeholder="Выбери из списка"
                    variant="thin"
                    hasError={formState.errors?.citizenship}
                    options={[
                      { "value": "N", "label": "Лицо без гражданства" },
                      { "value": "BY", "label": "Беларусь" },
                      { "value": "EG", "label": "Египет" },
                      { "value": "IN", "label": "Индия" },
                      { "value": "KZ", "label": "Казахстан" },
                      { "value": "KG", "label": "Киргизия" },
                      { "value": "CN", "label": "Китай" },
                      { "value": "MA", "label": "Марокко" },
                      { "value": "NG", "label": "Нигерия" },
                      { "value": "SR", "label": "Сербия" },
                      { "value": "SY", "label": "Сирия" },
                      { "value": "TJ", "label": "Таджикистан" },
                      { "value": "TH", "label": "Таиланд" },
                      { "value": "TM", "label": "Туркменистан" },
                      { "value": "TR", "label": "Турция" },
                      { "value": "UZ", "label": "Узбекистан" }
                    ]}
                    {...field}
                    ref={register(field.name).ref}
                  />
                )}
              />
            </Label>
            
          <Label
            title="Где ты планируешь податься на визу?"
            hasError={formState.errors.entrant?.visa_city}
          >
            <Input type="text" {...register("visa_city")} />
          </Label>
        </span>
      </div>
    </Subsection>
  )
}

export default NationalityDetails