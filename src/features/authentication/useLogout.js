import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Logout } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: logout, isPending: isLoading } = useMutation({
    mutationFn: Logout,
    onSuccess: () => {
      queryClient.removeQueries();
      navigate("/login", { replace: true });
    },
  });

  return { logout, isLoading };
}

export default useLogout;
