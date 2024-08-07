import { SortableContainer, SortableElement } from "react-sortable-hoc"
import { arrayMoveImmutable } from "array-move"
import { Controller, useFormContext } from "react-hook-form"

import FileUploadContainer from "components/containers/FileUploadContainer"

import clsx from "clsx";

import Icon from "../Icon";
import Label from "../Label";
import Input from "../Input";
import IconButton from "../IconButton";

import styles from "./gallery-list.module.scss"

const GalleryList = ({ program }) => {
  // const [galleryPhoto, setGalleryPhoto ] = useState()

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const newPrograms = arrayMoveImmutable(programs, oldIndex, newIndex)
    onChange(newPrograms)
  }

  return(
      <Container onSortEnd={onSortEnd}>
        <GalleryRow/>
      </Container>
  )
}

export default GalleryList

const Container = SortableContainer(({ children }) => {
    return <div className={styles.grid}>{children}</div>
  })
  
const GalleryRow = SortableElement(({ program, renderCard, key }) => {
  const { register, control } = useFormContext()

  return(
    <div className={styles.container}>
      {program?.gallery.map((photo) =>{
        <div className={styles.row}>
          <div className={styles.controls}>
            <p className={styles.index}>{photo?.position}</p>
            <div className={styles.order}>
              <Icon slug="burger" className={styles.icon} />
            </div>
            <Controller
              control={control}
              name="photo?.image_link"
              render={({ field }) => (
                <FileUploadContainer
                  title="Загрузите Ваш логотип"
                  description="(jpeg, png)"
                  accept="image/jpeg,image/png"
                  className={styles.cardWrapper}
                  {...field}
                />
              )}
            />
            <Label title="Подпись к фотографии (опционально)">
              <Input 
                placeholder="Например: Главный зал"
                className={styles.galleryDesc}
                {...register("photo?.description")}
              />
            </Label>
            <IconButton         
              icon="trash"
              className={styles.clear}
              variant="danger"
              title="Удалить изображение"
            />
          </div>
        </div>
      })}
    </div>
  )
})