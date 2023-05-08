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

type FormData = {
  username?: string;
  level?: string;
  enabled?: boolean|number;
  password?: string;
  language?: string;
  confirmPassword?: string;
};
type onSubmitCallbackArguments = {} & FormData;

type onSubmitCallback = {
  (args: onSubmitCallbackArguments): void;
};

type FormUserDetailsProps = {
  onSubmit: onSubmitCallback;
  submitText?: string;
  isWaiting: boolean;
  validations: {};
  allowedSubLevels: [];
} & FormData;

const FormUserDetails = ({
  onSubmit,
  submitText = "Submit",
  isWaiting,
  username = "",
  level = "",
  enabled = 1,
  password = "",
  confirmPassword = "",
  language = "",
  validations,
}: FormUserDetailsProps) => {
  const [formData, setFormData] = useState<FormData>({
    username: username,
    level: level,
    enabled: enabled,
    password: password,
    confirmPassword: confirmPassword,
    language: language,
  });

  const { isDarkMode } = useContext(ThemeContext),
    [showConfirmPassword, setShowConfirmPassword] = useState(false);
  useEffect(() => {
    setFormData({
      username: username,
      level: UserCode[level],
      enabled: enabled,
      password: password,
      confirmPassword: confirmPassword,
      language: language,
    });
  }, [username, level, enabled, password, confirmPassword , language]);

  const UserCode = {
      analyst: "4",
      support: "3",
      admin: "2",
    },
    languages = [
      {
        label: "Select an option",
        value: "",
      },
      {
        label: "English - United States",
        value: "en-US",
      },
      {
        label: "Italian",
        value: "it-IT",
      },
    ];

  return (
    <Form>
      {/* <div className="u-fixed-width"> */}
      <Input
        type="text"
        label="Username"
        className={isDarkMode ? "is-dark" : ""}
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
        className={isDarkMode ? "is-dark" : ""}
        defaultValue={UserCode[formData.level]}
        label="Level"
        options={[
          {
            label: "admin",
            value: "2",
          },
          {
            label: "support",
            value: "3",
          },
          {
            label: "analyst",
            value: "4",
          },
        ]}
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
        label="Language"
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

      <CheckboxInput
        label="Enabled"
        defaultChecked={formData.enabled}
        onClick={(e) => {
          setFormData({
            ...formData,
            enabled: !formData.enabled,
          });
        }}
        //   error={validations.enabled}        a
      />

      <PasswordToggle
        className={isDarkMode ? "is-dark" : ""}
        id="form-user-password"
        label="Password"
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
          label="Confirm Password"
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

export default FormUserDetails;
