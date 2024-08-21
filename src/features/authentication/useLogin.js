import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginUser } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isPending: isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginUser({ email, password }),
    onSuccess: (user) => {
      if (user && user.user) {
        queryClient.setQueryData(["user"], user.user); // Simplified key ["user"]
        navigate("/dashboard", { replace: true });
      } else {
        toast.error("Failed to retrieve user data.");
      }
    },
    onError: () => toast.error("Provided email or password is incorrect"),
  });

  return { login, isLoading };
}
