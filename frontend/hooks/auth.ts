import useSWR from "swr";
import axios from "@/lib/axios";
import { useEffect } from "react";
import { useRouter } from "next/router";
type AuthProps = {
    middleware?: string,
    redirectIfAuthenticated?: string;
}
export const useAuth = ({ middleware, redirectIfAuthenticated }: AuthProps) => {
  const router = useRouter();

  const {
    data: user,
    error,
    mutate,
  } = useSWR("/api/mui/manager/user", () =>
    axios
      .get("/api/mui/manager/user")
      .then((res) => res.data)
      .catch((error) => {
        if (error.response.status !== 409) throw error;

        router.push("/api/mui/manager/verify-email");
      })
  );

  const csrf = () => axios.get("/sanctum/csrf-cookie");

  //   const token = ({setErrors, props}) => {
  //     setErrors([]);
  //     axios
  //       .post("/sanctum/token", props)
  //       .then((response) => {
  //         const res = response.data;
  //         axios.defaults.headers.common["Authorization"] = `Bearer ${res.token}`;
  //       })
  //       .catch((error) => {
  //         if (error.response.status !== 422) throw error;

  //         setErrors(error.response.data.errors);
  //       });
  //   };

  const register = async ({ setErrors, ...props }) => {
    await csrf();

    setErrors([]);

    axios
      .post("/api/mui/manager/register", props)
      .then(() => mutate())
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        setErrors(error.response.data.errors);
      });
  };

  const login = async ({ setErrors, setStatus, ...props }) => {
    await csrf();
    setErrors([]);
    setStatus(null);
    // await token({setErrors,props});
    axios.defaults.headers.common["Content-Type"] = `application/json`;
    axios.defaults.headers.common["Accept"] = `application/json`;

    axios
      .post("/api/mui/manager/login", props)
      .then(() => mutate())
      .catch((error) => {
        console.log(error);
        setErrors(error.response.data);
        // if (error.response.status !== 422) throw error;
      });
  };

  const forgotPassword = async ({ setErrors, setStatus, email }) => {
    await csrf();

    setErrors([]);
    setStatus(null);

    axios
      .post("/api/mui/manager/forgot-password", { email })
      .then((response) => setStatus(response.data.status))
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        setErrors(error.response.data.errors);
      });
  };

  const resetPassword = async ({ setErrors, setStatus, ...props }) => {
    await csrf();

    setErrors([]);
    setStatus(null);

    axios
      .post("/api/mui/manager/reset-password", {
        token: router.query.token,
        ...props,
      })
      .then((response) =>
        router.push(
          "/api/mui/manager/login?reset=" + btoa(response.data.status)
        )
      )
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        setErrors(error.response.data.errors);
      });
  };

  const resendEmailVerification = ({ setStatus }) => {
    axios
      .post("/api/mui/manager/email/verification-notification")
      .then((response) => setStatus(response.data.status));
  };

  const logout = async () => {
    if (!error) {
      await axios.post("/api/mui/manager/logout").then(() => mutate());
    }

    window.location.pathname = "/manager/login";
  };

  useEffect(() => {
    if (middleware === "guest" && redirectIfAuthenticated && user) {
      router.push(redirectIfAuthenticated);
    }
    if (
      window.location.pathname === "/api/mui/manager/verify-email" &&
      user?.email_verified_at
    )
      router.push(redirectIfAuthenticated);
    if (middleware === "auth" && error) logout();
  }, [user, error]);

  return {
    user,
    register,
    login,
    forgotPassword,
    resetPassword,
    resendEmailVerification,
    logout,
  };
};
