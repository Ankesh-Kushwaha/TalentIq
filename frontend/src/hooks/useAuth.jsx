import { useState } from "react";
import { loginApi } from "../apis/auth.api";
import { useAuthContext } from "./useAuthContext";

export default function useAuth() {
  const { login } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loginUser = async (credentials) => {
    try {
      setLoading(true);
      setError(null);

      const data = await loginApi(credentials);
      login(data); //save data

      return data.user.role;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { loginUser, loading, error };
}
