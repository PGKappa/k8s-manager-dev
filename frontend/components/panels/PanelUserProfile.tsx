import React, { useContext, useEffect, useState, FC } from "react";
import FormUserProfile from "./forms/FormUserProfile";
import {
  requestUserEditDetails,
  RequestUserEditDetailsResponse,
} from "@/hooks/users";
import Loader from "@/components/Loader";
import { AsidePanelContext } from "@/context";
import { toast } from "react-toastify";
import { useTranslation } from "@pg-ui/i18n";

type PanelUserProfileProps = {
  user: {
    locale: string;
    id: string;
    username: string;
    operator: string;
  };
  updateUser?: Function;
};

const PanelUserProfile: FC<PanelUserProfileProps> = ({
  user,
  updateUser,
}: PanelUserProfileProps) => {
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
  const [message, setMessage] = useState<any>("");
  const [errors, setErrors] = useState<any>([]);
  const [userDetails, setUserDetails] = useState<{
      language: string;
      username: string;
      operator: string;
    }>({
      language: user.locale,
      username: user.username,
      operator: user.operator,
    }),
    // { isDarkMode } = useContext(ThemeContext),
    { closeAsidePanel } = useContext(AsidePanelContext),
    [formErrors, setFormErrors] = useState<any>({
      password: "",
      confirmPassword: "",
    });
    const {t} = useTranslation("");

  function handleUserUpdate(args) {
    requestUserEditDetails({
      args,
      userId: user.id,
      onSuccess: (res: RequestUserEditDetailsResponse) => {
        setMessage(res.message);
        setErrors(res.errors || []);
        setFormErrors(res.errors || [])

        toast(t('successful.userProfile'), {
          hideProgressBar: true,
          autoClose: 2000,
          type: "success",
        });
        updateUser();
        closeAsidePanel();
      },
      onError: (error) => {
        toast(t("error.userProfile"), {
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
      <FormUserProfile
        isWaiting={isWaitingForResponse}
        message={message}
        // errors={errors}
        submitText={t('edit')}
        onSubmit={handleUserUpdate}
        validations={formErrors}
        language={userDetails.language}
        username={userDetails.username}
        operator={userDetails.operator}
      />
    </div>
  );
};
export default PanelUserProfile;
