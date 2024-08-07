import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import clsx from "clsx";
import merge from "lodash/merge";

import Information from "./sections/Information";
import Description from "./sections/Description";
import Education from "./sections/Education";
import Qualify from "./sections/Qualify";
import Row from "components/ui/Row";

import schema from "validation/program-form";

import styles from "./program-form.module.scss";

const ProgramForm = ({ buttons, defaultValues, onSubmit, className, onButtonClick }) => {
  const methods = useForm({
    defaultValues: merge({ dvis: [], languages: [] }, defaultValues),
    resolver: zodResolver(schema),
  });

  className = clsx(styles.form, className);

  return (
    <FormProvider {...methods}>
      <form
        className={className}
        onSubmit={methods.handleSubmit(onSubmit)}
        data-dirty={methods.formState.isDirty}
      >
        <Information />
        <Description />
        <Education />
        <Qualify />
        {buttons && <Row>{buttons(methods)}</Row>}
      </form>
    </FormProvider>
  );
};

export default ProgramForm;
