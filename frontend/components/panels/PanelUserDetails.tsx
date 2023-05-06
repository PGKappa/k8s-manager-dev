import React, { useContext, useEffect, useState, FC } from "react";
import { Button, Accordion } from "@canonical/react-components";
import FormUserDetails from "./forms/FormUserDetails";
import {
  requestUserDetails,
  requestUserEditDetails,
  RequestUserEditDetailsResponse,
  requestUserDelete,
  RequestUserDeleteResponse,
  RequestUserDetailsResponse,
} from "@/hooks/users";
import Loader from "@/components/Loader";
import { ThemeContext, AsidePanelContext } from "@/context";
import { toast } from "react-toastify";
import { useTranslation } from "@pg-ui/i18n";
type PanelUserDetailsProps = {
  userId: string;
  updatePage?: Function;
};

const PanelUserDetails: FC<PanelUserDetailsProps> = ({
  userId,
  updatePage,
}: PanelUserDetailsProps) => {
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(true);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState([]);
  const [userDetails, setUserDetails] = useState<{
      username: string;
      enabled: boolean;
      level: string;
      language: string;
    }>({
      username: "",
      enabled: true,
      level: "",
      language: "",
    }),
    { isDarkMode } = useContext(ThemeContext),
    { closeAsidePanel } = useContext(AsidePanelContext),
    [formErrors, setFormErrors] = useState({
      username: "",
      level: "",
      enabled: "",
      password: "",
      confirmPassword: "",
    });
  const { t } = useTranslation("");
  useEffect(() => {
    // setIsWaitingForResponse(false);

    if (userId) {
      requestUserDetails({
        userId: userId,
        onSuccess: (res: RequestUserDetailsResponse) => {
          setMessage(res.message);
          setErrors(res.errors || []);
          setIsWaitingForResponse(false);
          setUserDetails(res.details);
        },
        onError: (e) => {
          toast(t("error.userDetails"), {
            hideProgressBar: true,
            autoClose: 2000,
            type: "error",
          });
        },
      });
    }
  }, [userId]);

  function onDeleteButtonClick() {
    requestUserDelete({
      userId: userId,
      onSuccess: (res: RequestUserDeleteResponse) => {
        setMessage(res.message);

        toast(t("successful.userDelete"), {
          hideProgressBar: true,
          autoClose: 2000,
          type: "success",
        });

        updatePage();
        closeAsidePanel();
      },
      onError: (e) => {
        toast(t("error.userDelete"), {
          hideProgressBar: true,
          autoClose: 2000,
          type: "error",
        });
      },
    });
  }

  function handleUserUpdate(args) {
    requestUserEditDetails({
      args,
      userId: userId,
      onSuccess: (res: RequestUserEditDetailsResponse) => {
        setMessage(res.message);
        setErrors(res.errors || []);

        toast(t("successful.userUpdate"), {
          hideProgressBar: true,
          autoClose: 2000,
          type: "success",
        });
        updatePage();
        closeAsidePanel();
      },
      onError: (error) => {
        toast(t("error.userDelete"), {
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

  if (isWaitingForResponse) return <Loader />;

  return (
    <div className="u-fixed-width">
      <FormUserDetails
        isWaiting={isWaitingForResponse}
        message={message}
        errors={errors}
        submitText={t("user.panel.button_edit")}
        username={userDetails.username}
        enabled={userDetails.enabled}
        level={userDetails.level}
        language={userDetails.language}
        onSubmit={handleUserUpdate}
        validations={formErrors}
      />
      <Accordion
        sections={[
          {
            content: (
              <>
                <Button appearance="negative" onClick={onDeleteButtonClick}>
                  {t("user.panel.advanced.button")}
                </Button>
              </>
            ),
            title: t("user.panel.advanced.title"),
          },
        ]}
      />
    </div>
  );
};
export default PanelUserDetails;
