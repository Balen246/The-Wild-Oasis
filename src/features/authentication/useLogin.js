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
      queryClient.setQueryData(["user", user ? user.user : ""]);
      navigate("/dashboard", { replace: true });
    },
    onError: () => toast.error("Provided email or password is incorrect"),
  });

  return { login, isLoading };
}
