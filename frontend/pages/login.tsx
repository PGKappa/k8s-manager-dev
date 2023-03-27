import GuestLayout from "@/components/Layouts/GuestLayout";
import InputError from "@/components/InputError";
import Link from "next/link";
import { useAuth } from "@/hooks/auth";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Form,
  Input,
  Button,
  Spinner,
  PasswordToggle,
  CheckboxInput,
} from "@canonical/react-components";
import { DictionaryContext, useTranslation } from "@pg-ui/i18n";

import axios from "@/lib/axios";
import { ThemeContext } from "@/context";

axios.defaults.headers.common["Content-Type"] = `application/json`;
axios.defaults.headers.common["Accept"] = `application/json`;

const Login = () => {
  const { query } = useRouter();
  const { setShowLogo } = useContext(ThemeContext);
  const { login } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/",
  });

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [shouldRemember, setShouldRemember] = useState<boolean>(false);
  const [errors, setErrors] = useState<any>([]);
  const [status, setStatus] = useState(null);
  const [isWaitingForResponse, setIsWaitingForResponse] =
    useState<boolean>(false);
  const { t } = useTranslation();
  const [togglePassword, setTogglePassword] = useState(false);

  useEffect(() => {
    if (query.reset?.length > 0 && errors.length === 0) {
      setStatus(atob(query.reset));
    } else {
      setStatus(null);
    }
    if (query.show_logo) {
      setShowLogo(query.show_logo);
    } else {
      setStatus(true);
    }
  });

  const submitForm = async (event) => {
    event.preventDefault();

    login({
      username,
      password,
      remember: shouldRemember,
      setErrors,
      setStatus,
    });

    setIsWaitingForResponse(false);
  };

  return (
    <GuestLayout>
      <form onSubmit={submitForm}>
        {/* <div className={"p-panel " + (isDarkMode ? "is-dark" : "")}> */}
        <div className={"p-panel"}>
          <div className="p-panel__header" id="login-page-header">
            <h4 className="p-panel__title">{t("login.title")}</h4>
          </div>

          <div
            className="p-card u-vertically-center u-align--center"
            id="login-page-panel"
          >
            <div className="p-card">
              <div className="u-align-text--left">
                <Input
                  takeFocus={true}
                  placeholder="Username"
                  id="list-input-12"
                  type="text"
                  label={t("login.username")}
                  value={username}
                  className="block mt-1 w-full "
                  onChange={(event) => setUsername(event.target.value)}
                  required
                  autoFocus
                />
                {/* <InputError messages={errors.username} className="mt-2" /> */}
              </div>
              <div className="mt-4">
                {/* <PasswordToggle
                  id="examplePassword1"
                  label={t("password")}
                  // required
                  // onChange={(e) => {
                  //     setPassword(e.target.value);
                  // }}
                  value={password}

                  required
                  autoComplete="current-password"
                /> */}

                <div className="p-form-password-toggle">
                  <label>{t("login.password")}</label>
                  <button
                    className="p-button--base u-no-margin--bottom has-icon"
                    aria-live="polite"
                    aria-controls="password"
                    onClick={(e) => {
                      e.preventDefault();
                      setTogglePassword(!togglePassword);
                    }}
                  >
                    <span className="p-form-password-toggle__label">
                      {t("login.password_show")}
                    </span>
                    <i className="p-icon--show"></i>
                  </button>
                </div>
                <input
                  type={togglePassword ? "text" : "password"}
                  name="password"
                  id="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />

                {/* <InputError messages={errors.password} className="mt-2" /> */}
              </div>

              {/* <CheckboxInput label="Remember me" /> */}
              <div className="p-form__group row">
                <Button
                  appearance="positive"
                  hasIcon={isWaitingForResponse}
                  onClick={(e) => {
                    setIsWaitingForResponse(true);
                  }}
                >
                  {isWaitingForResponse && <Spinner text={t("submit")} />}
                  {!isWaitingForResponse && <span>{t("submit")}</span>}
                </Button>
              </div>
              <div className="p-form__group p-form-validation is-error">
                <p className="p-form-validation__message">
                  {errors.message}
                  {/* <InputError messages={[errors.message]} className="mt-2" /> */}
                </p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </GuestLayout>
  );
};

export default Login;
