import dynamic from "next/dynamic";
import { useState } from "react";

import ActionButton from "components/ui/ActionButton";
import EditableSubsection from "components/partials/EditableSubsection";
import ProgramsGrid from "components/partials/ProgramsGrid";
import ProgramCard from "components/ui/ProgramCard";
import ControlsWrapper from "components/ui/ControlsWrapper";
import CardControls from "components/partials/CardControls";

import useModal from "hooks/use-modal";

import styles from "./programs-control.module.scss";

const ProgramForm = dynamic(() => import("components/forms/ProgramForm"), {
  loading: () => <p>Загрузка...</p>,
});

const ProgramsControl = ({ programs, onAdd, onDelete, onEdit, ...props }) => {
  const { Modal, open, close } = useModal();
  const [program, setProgram] = useState(null);

  const onRequestEdit = (program) => {
    setProgram(program);
    open();
  };

  const preAdd = async (data) => {
    const result = await onAdd(data);
    if (result === true) close();
  };

  const preEdit = async (data) => {
    const result = await onEdit({ ...program, ...data });
    if (result === true) close();
  };

  const onClose = () => {
    setProgram(null);
  };

  const handleAddButtonClick = (formMethods) => {
    formMethods.handleSubmit(preAdd)();
  };

  const handleEditButtonClick = (formMethods) => {
    formMethods.handleSubmit(preEdit)();
  };

  return (
    <>
      <Modal onAfterClose={onClose}>
        <h1 className={styles.title}>Информация об образовательной программе</h1>
        <ProgramForm
          onSubmit={program? preEdit : preAdd}
          buttons={
            program
              ? (formMethods) => <EditButtons onCancel={close} onClick={() => handleEditButtonClick(formMethods)} />
              : (formMethods) => <AddButtons onCancel={close} onClick={() => handleAddButtonClick(formMethods)} />
          }
          className={styles.form}
          defaultValues={program}
        />
      </Modal>

      <EditableSubsection onAdd={open} {...props}>
        {(editing) => (
          <ProgramsGrid>
            {programs.map((program) => (
              <ProgramCardEditable
                program={program}
                key={program.id}
                onEdit={onEdit}
                onRequestEdit={onRequestEdit}
                onDelete={onDelete}
                editing={editing}
              />
            ))}
          </ProgramsGrid>
        )}
      </EditableSubsection>
    </>
  );
};

const ProgramCardEditable = ({ program, editing, onRequestEdit, onDelete, onEdit }) => {
  const preRequestEdit = () => onRequestEdit(program);
  const preDelete = () => onDelete(program);
  const preVisibleToggle = ({ target }) => onEdit({ ...program, visible: target.checked });

  return (
    <ControlsWrapper
      visible={editing}
      controls={
        <CardControls
          onEdit={preRequestEdit}
          onDelete={preDelete}
          onVisibleToggle={preVisibleToggle}
          visible={program.visible}
        />
      }
    >
      <ProgramCard program={program} showFooter={false} noneShadow={true} />
    </ControlsWrapper>
  );
};

const AddButtons = ({ onCancel, onClick }) => (
  <>
    <ActionButton icon="plus" type="button" onClick={onClick}>
      Добавить программу
    </ActionButton>
    <ActionButton icon="cross" variant="secondary" type="button" onClick={onCancel}>
      Отменить
    </ActionButton>
  </>
);

const EditButtons = ({ onCancel }) => (
  <>
    <ActionButton icon="checkmark" type="submit">
      Сохранить
    </ActionButton>
    <ActionButton icon="cross" variant="secondary" type="button" onClick={onCancel}>
      Отменить
    </ActionButton>
  </>
);

export default ProgramsControl;
