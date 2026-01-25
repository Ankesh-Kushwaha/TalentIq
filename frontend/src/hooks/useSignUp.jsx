import { useState } from "react";
import { signUpAPi } from "../apis/auth.api";
import { useAuthContext } from "./useAuthContext";

export default function useSignUp() {
  const { login } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const signupUser = async (payload) => {
    try {
      setLoading(true);
      setError(null);

      const data = await signUpAPi(payload);
      login(data); 
    } catch (err) {
      setError(err.message || "Signup failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { signupUser, loading, error };
}
