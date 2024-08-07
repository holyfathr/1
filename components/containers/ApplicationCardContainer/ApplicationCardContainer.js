import { useMutation, useQueryClient } from "react-query";
import toast from "react-hot-toast";

import ApplicationCard from "components/ui/ApplicationCard";
import { deleteApplication } from "api/application";
import errorHandler from "helpers/error-handler";

const ApplicationCardContainer = ({ application }) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation(deleteApplication, { onError: errorHandler });

  const onDelete = async () => {
    const alert = toast.loading("Отзыв заявки...");

    try {
      await deleteMutation.mutateAsync(application);
      await queryClient.invalidateQueries({
        predicate: ({ queryKey }) => queryKey.includes("application"),
      });

      toast.success("Заявка отозвана", { id: alert });
    } catch {
      toast.dismiss(alert);
    }
  };

  if (!application) return null;

  console.log(application)

  return <ApplicationCard onDelete={onDelete} application={application} />;
};

export default ApplicationCardContainer;
