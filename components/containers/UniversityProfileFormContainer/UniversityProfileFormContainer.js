import { useMemo } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";

import UniversityProfileForm from "components/forms/UniversityProfileForm";

import useDefinedQuery, { keys } from "hooks/use-defined-query";

import errorHandler from "helpers/error-handler";

import { editUniversityAccount } from "api/university";
import { editAccountContacts } from "api/account";

const UniversityProfileFormContainer = () => {
  const queryClient = useQueryClient();

  const { data: contacts } = useDefinedQuery(keys.account.contacts);
  const { data: university } = useDefinedQuery(keys.account.university);

  const editMutation = useMutation(editUniversityAccount, { onError: errorHandler });
  const editContactsMutation = useMutation(editAccountContacts, { onError: errorHandler });

  const onSubmit = async ({ contacts, ...data }) => {
    const alert = toast.loading("Сохранение профиля...");

    try {
      await editMutation.mutateAsync(data);
      await editContactsMutation.mutateAsync(contacts);
      await queryClient.invalidateQueries({
        predicate: ({ queryKey }) => queryKey.includes("account"),
      });

      toast.success("Профиль успешно сохранён", { id: alert });
    } catch {
      toast.dismiss(alert);
    }
  };

  const defaultValues = useMemo(() => {
    if (!university || !contacts) return undefined;
    return { ...university, contacts, gallery: university.gallery || [] };
  }, [university, contacts]);

  if (!defaultValues) return "Загрузка...";

  return (
    <UniversityProfileForm
      onSubmit={onSubmit}
      defaultValues={defaultValues}
      disabled={editMutation.isLoading || editContactsMutation.isLoading}
    />
  );
};

export default UniversityProfileFormContainer;
