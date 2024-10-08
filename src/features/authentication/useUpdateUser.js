import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCurrentUser } from "../../services/apiAuth";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const {
    isPending: isUpdating,
    mutate: updateUser,
    // error,
  } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: (user) => {
      toast.success("user successfuly updated!");
      // queryClient.setQueryData(["user"],user);
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: (error) => toast.error(error.message),
  });

  return { isUpdating, updateUser };
}
