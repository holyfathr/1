import React from "react";
import { useFormContext, useWatch, Controller } from "react-hook-form";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { arrayMoveImmutable } from "array-move";
import Subsection from "components/ui/Subsection";
import FileUploadContainer from "components/containers/FileUploadContainer";
import Icon from "components/ui/Icon";
import Label from "components/ui/Label";
import Input from "components/ui/Input";
import IconButton from "components/ui/IconButton";
import ActionButton from "components/ui/ActionButton";
import styles from "../university-profile-form.module.scss";

const Gallery = () => {
  const { control, setValue } = useFormContext();
  const photos = useWatch({ control, name: "gallery" }) || [];

  const onChange = (photos) => {
    setValue("gallery", photos);
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const newPhotos = arrayMoveImmutable(photos, oldIndex, newIndex).map((photo, index) => ({
      ...photo,
      position: index + 1,
    }));
    onChange(newPhotos);
  };

  const addPhoto = () => {
    const newPhoto = {
      position: photos.length + 1,
      image_link: "",
      description: "",
    };
    onChange([...photos, newPhoto]);
  };

  const removePhoto = (index) => {
    const newPhotos = photos.filter((_, i) => i !== index).map((photo, index) => ({
      ...photo,
      position: index + 1,
    }));
    onChange(newPhotos);
  };

  return (
    <Subsection title="Галерея" controls={<Controls addPhoto={addPhoto} />}>
      <Container onSortEnd={onSortEnd} >
        {photos.map((photo, index) => (
          <GalleryRow
            key={`photo-${photo.position}`}
            index={index}
            photo={photo}
            removePhoto={() => removePhoto(index)}
          />
        ))}
      </Container>
    </Subsection>
  );
};

const Container = SortableContainer(({ children }) => {
  return <div className={styles.grid}>{children}</div>;
});

const Controls = ({ addPhoto }) => (
  <ActionButton className={styles.addRow} variant="accent" icon="plus" onClick={addPhoto}>
    Добавить
  </ActionButton>
);

const GalleryRow = SortableElement(({ photo, removePhoto }) => {
  const { control, register } = useFormContext();

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.controls}>
          <span className={styles.index}>
            <span>{photo.position}</span>
            <div className={styles.order}>
              <Icon slug="burger" className={styles.icon} />
            </div>
          </span>

          <Controller
            control={control}
            name={`gallery[${photo.position - 1}].image_link`}
            render={({ field }) => (
              <FileUploadContainer
                key={`image-${photo.position}`} // Ensure unique key for each FileUploadContainer
                title="Добавить фотографию"
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
              {...register(`gallery[${photo.position - 1}].description`)}
            />
          </Label>
          <IconButton
            icon="trash"
            className={styles.clear}
            variant="danger"
            title="Удалить изображение"
            onClick={removePhoto}
          />
        </div>
      </div>
    </div>
  );
});

export default Gallery;
