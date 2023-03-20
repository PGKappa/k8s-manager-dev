import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  Spinner,
  Select,
  PasswordToggle,
} from "@canonical/react-components";
import { ThemeContext } from "@/context";
import { getUserLevels } from "@/Users";
import { useTranslation } from "@pg-ui/i18n";

type FormData = {
  username?: string;
  level?: string;
  password?: string;
  confirmPassword?: string;
};
type onSubmitCallbackArguments = {} & FormData;

type onSubmitCallback = {
  // description: string;
  (args: onSubmitCallbackArguments): void;
};

type FormUserCreateProps = {
  onSubmit: onSubmitCallback;
  submitText?: string;
  isWaiting: boolean;
  validations: {};
  allowedSubLevels: [];
  auth: {};
} & FormData;

const FormUserCreate = ({
  onSubmit,
  submitText,
  isWaiting,
  username = "",
  level = "",
  //   enabled = true,
  password = "",
  confirmPassword = "",
  validations,
  auth,
}: FormUserCreateProps) => {
  const [formData, setFormData] = useState<FormData>({
    username: username,
    level: level,
    // enabled: enabled,
    password: password,
    confirmPassword: confirmPassword,
  });
  const { isDarkMode } = useContext(ThemeContext),
    // { closeAsidePanel } = useContext(AsidePanelContext);
    { t } = useTranslation(""),
    allowedSubLevels = getUserLevels(auth),
    languages = [
      {
        label: t("user.language.default"),
        value: "",
      },
      {
        label: t("user.english"),
        value: "en-US",
      },
      //   {
      //     label: "Italian",
      //     value: "it-IT",
      //   },
    ];
  useEffect(() => {
    setFormData({
      username: username,
      level: level,
      //   enabled: enabled,
      password: password,
      confirmPassword: confirmPassword,
    });
  }, [
    username,
    level,
    // enabled,
    password,
    confirmPassword,
  ]);

  return (
    <Form id="user-create-form">
      <Input
        id={"username-input"}
        className={isDarkMode ? "is-dark" : ""}
        type="text"
        label={t("user.panel.username")}
        required
        onChange={(e) => {
          const newUsername = e.target.value;
          setFormData({
            ...formData,
            username: newUsername,
          });
        }}
        value={formData.username}
        error={validations.username}
      />
      <Select
        id={"level-input"}
        className={isDarkMode ? "is-dark" : ""}
        defaultValue={formData ? formData.level : ""}
        label={t("user.panel.level")}
        required
        options={allowedSubLevels}
        onChange={(e) => {
          const newLevel = e.target.value;
          setFormData({
            ...formData,
            level: newLevel,
          });
        }}
        error={validations.level}
      />

      <Select
        id={"language"}
        className={isDarkMode ? "is-dark" : ""}
        defaultValue={formData ? formData.language : ""}
        label={t("user.language.label")}
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
        id="password-input"
        label={t("user.password")}
        type="button"
        onChange={(e) => {
          const newPassword = e.target.value;
          setFormData({
            ...formData,
            password: newPassword,
          });
        }}
        error={validations.password}
      />

      <PasswordToggle
        className={isDarkMode ? "is-dark" : ""}
        id="confirm-password-input"
        label={t("user.confirm_password")}
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
      <Button
        id={"create-user-button"}
        appearance="positive"
        hasIcon={isWaiting}
        onClick={(e) => {
          e.preventDefault();
          onSubmit({ args: formData });
        }}
      >
        {isWaiting && <Spinner text={submitText} />}
        {!isWaiting && (
          <>
            <i className="p-icon--plus is-light"></i> <span>{submitText}</span>
          </>
        )}
      </Button>
      {/* </div> */}
    </Form>
  );
};

export default FormUserCreate;
