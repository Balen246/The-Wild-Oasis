import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateSetting as updateSettingApi } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useUpdateSetting() {
  const queryClient = useQueryClient();
  const {
    isPending: isUpdating,
    mutate: updateSetting,

    // error,
  } = useMutation({
    mutationFn: (newInfo) => {
      console.log(newInfo);
      return updateSettingApi(newInfo);
    },
    onSuccess: () => {
      toast.success("Setting successfuly edited!");
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    onError: (error) => toast.error(error.message),
  });

  return { isUpdating, updateSetting };
}
