import toast from "react-hot-toast";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteCabin() {
  const queryClient = useQueryClient();
  const {
    isPending: isDeleting,
    mutate: deleteCabin,
    //  error
  } = useMutation({
    mutationFn: (id) => deleteCabinApi(id),
    onSuccess: () => {
      toast.success("cabin successfuly deleted!");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (error) => toast.error(error.message),
  });
  return { isDeleting, deleteCabin };
}
