import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { signUp as signUpApi } from "../../services/apiAuth";

export function useSignup() {
  const { mutate: signup, isPending: isLoading } = useMutation({
    mutationFn: signUpApi,
    onSuccess: (user) => {
      console.log(user);
      toast.success(
        "Account successfuly created! Please verify the new account from the user's email address"
      );
    },
  });

  return { signup, isLoading };
}
