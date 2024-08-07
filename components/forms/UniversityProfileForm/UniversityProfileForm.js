import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "components/ui/Button";
import Contacts from "./sections/Contacts";
import Images from "./sections/Images";
import Background from "./sections/Background";
import Information from "./sections/Information";
import Options from "./sections/Options";
import Gallery from "./sections/Gallery";
import FacultiesControlContainer from "components/containers/FacultiesControlContainer";

import schema from "validation/university-profile-form";

import styles from "./university-profile-form.module.scss";

const UniversityProfileForm = ({ defaultValues, onSubmit, disabled, ...props }) => {
  const methods = useForm({
    defaultValues,
    resolver: zodResolver(schema),
  });

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className={styles.form}
        data-dirty={methods.formState.isDirty}
        {...props}
      >
        <Images />
        <Background />
        <Information />
        <Options />
        <Contacts />
        <Gallery />
        <FacultiesControlContainer />
        
        <Button type="submit" className={styles.submit} disabled={disabled}>
          Сохранить изменения
        </Button>
      </form>
    </FormProvider>
  );
};

export default UniversityProfileForm;
