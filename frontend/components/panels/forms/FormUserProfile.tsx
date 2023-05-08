import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  Spinner,
  Select,
  PasswordToggle,
  CheckboxInput,
} from "@canonical/react-components";
import { ThemeContext } from "@/context";
import { useTranslation } from "@pg-ui/i18n";

type FormData = {
  password?: string;
  language?: string;
  username?: string;
  operator?: string;
  confirmPassword?: string;
};
type onSubmitCallbackArguments = {} & FormData;

type onSubmitCallback = {
  (args: onSubmitCallbackArguments): void;
};

type FormUserProfileProps = {
  onSubmit: onSubmitCallback;
  submitText?: string;
  isWaiting: boolean;
  validations: {
    password
    confirmPassword
    username
    operator
    language
  };
//   allowedSubLevels: [];
  message;
} & FormData;

const FormUserProfile = ({
  onSubmit,
  submitText,
  isWaiting,
  password = "",
  confirmPassword = "",
  language = "",
  username = "",
  operator,
  validations,
  message,
}: FormUserProfileProps) => {
  const [formData, setFormData] = useState<FormData>({
    password: password,
    confirmPassword: confirmPassword,
    language: language,
  });
  const { t } = useTranslation("");

  const { isDarkMode } = useContext(ThemeContext),
    [showConfirmPassword, setShowConfirmPassword] = useState(false);
  useEffect(() => {
    setFormData({
      password: password,
      confirmPassword: confirmPassword,
      language: language,
      username: username,
      operator: operator,
    });
  }, [password, confirmPassword, language]);

  const languages = [
    {
      label: t("user.panel.language.default"),
      value: "",
    },
    {
      label: t("user.panel.language.english"),
      value: "en-US",
    },
    // {
    //   label: "Italian",
    //   value: "it-IT",
    // },
  ];

  return (
    <Form>
      {formData.username && <p>{t('user.profile.username')} {formData.username} </p>}
      {formData.operator && <p>{t('user.profile.operaotr')} {formData.operator} </p>}
      <Select
        id={"language"}
        className={isDarkMode ? "is-dark" : ""}
        defaultValue={formData ? formData.language : ""}
        label={t('user.panel.language.label')}
        required
        options={languages}
        onChange={(e) => {
          const newLanguage = e.target.value;
          setFormData({
            ...formData,
            language: newLanguage,
          });
        }}
        error={validations.language}
      />

      <PasswordToggle
        className={isDarkMode ? "is-dark" : ""}
        id="form-user-password"
        label={t("user.panel.password")}
        //   placeholder="******"
        type="button"
        onChange={(e) => {
          const newPassword = e.target.value;
          setFormData({
            ...formData,
            password: newPassword,
          });
          if (!showConfirmPassword) {
            setShowConfirmPassword(true);
          }
        }}
        error={validations.password}
      />

      {showConfirmPassword && (
        <PasswordToggle
          className={isDarkMode ? "is-dark" : ""}
          id="form-user-confirm-password"
          label={t("user.panel.confirm_password")}
          type="button"
          onChange={(e) => {
            const newConfirmPassword = e.target.value;
            setFormData({
              ...formData,
              confirmPassword: newConfirmPassword,
            });
          }}
          error={validations.confirmPassword}
        />
      )}
      <Button
        appearance="positive"
        hasIcon={isWaiting}
        onClick={(e) => {
          onSubmit({ args: formData });
          e.preventDefault();
        }}
      >
        {isWaiting && <Spinner text={submitText} />}
        {!isWaiting && <span>{submitText}</span>}
      </Button>
      {/* </div> */}
    </Form>
  );
};

export default FormUserProfile;
