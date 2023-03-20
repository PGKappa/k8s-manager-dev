import React, { useContext, useState, FC } from "react";
import FormUserCreate from "./forms/FormUserCreate";
import { requestCreateUser } from "@/hooks/users";
import { ThemeContext, AsidePanelContext } from "@/context";
import { toast } from "react-toastify";
import { useTranslation } from "@pg-ui/i18n";

type PanelUserCreateProps = {
  updatePage?: Function;
  auth;
};

const PanelUserCreate: FC<PanelUserCreateProps> = ({ updatePage, auth }) => {
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false),
    // { isDarkMode } = useContext(ThemeContext),
    [formErrors, setFormErrors] = useState({
      username: "",
      level: "",
      password: "",
      confirmPassword: "",
    }),
    { closeAsidePanel } = useContext(AsidePanelContext);
  const { t } = useTranslation("");

  function handleUserCreate(args) {
    requestCreateUser({
      args: args,
      onSuccess: (res) => {
        closeAsidePanel();

        toast(t("successful.userCreate"), {
          hideProgressBar: true,
          autoClose: 2000,
          type: "success",
        });
        updatePage();
      },
      onError: (error) => {
        toast(t("error.userCreate"), {
          hideProgressBar: true,
          autoClose: 2000,
          type: "error",
        });

        if (error.errors) {
          setFormErrors(error.errors);
        }
      },
    });
  }

  return (
    <div className="u-fixed-width">
      <FormUserCreate
        isWaiting={isWaitingForResponse}
        onSubmit={handleUserCreate}
        validations={formErrors}
        auth={auth}
        submitText={t("submit")}
      />
    </div>
  );
};
export default PanelUserCreate;
