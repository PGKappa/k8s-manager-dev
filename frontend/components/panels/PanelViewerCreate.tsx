import React, { useContext, useEffect, useState, FC } from "react";
import FormViewerCreate from "./forms/FormViewerCreate";
import { requestCreateViewer, requestViewerCreateData } from "@/hooks/viewers";
import { ThemeContext, AsidePanelContext } from "@/context";
import Loader from "@/components/Loader";
import { toast } from "react-toastify";
import { useTranslation } from "@pg-ui/i18n";
type PanelViewerCreateProps = {
  updatePage?: Function;
};

const PanelViewerCreate: FC<PanelViewerCreateProps> = ({ updatePage }) => {
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(true),
    { isDarkMode } = useContext(ThemeContext),
    { closeAsidePanel } = useContext(AsidePanelContext),
    [formError, setFormError] = useState({
      macaddress: "",
      user: "",
      monitor: "",
      channel: "",
      language: "",
      videoURL: "",
    }),
    [availableData, setAvailableData] = useState({});
  const { t } = useTranslation("");

  function handleCreateViewer(args) {
    setIsWaitingForResponse(true);
    requestCreateViewer({
      args,
      onSuccess: (res) => {
        setIsWaitingForResponse(false);
        updatePage();
        closeAsidePanel();
        toast(t("successful.viewerCreate"), {
          hideProgressBar: true,
          autoClose: 2000,
          type: "success",
        });
      },
      onError: (error) => {
        if (error.errors) {
          setFormError(error.errors);
        }

        toast(t("error.viewerCreate"), {
          hideProgressBar: true,
          autoClose: 2000,
          type: "error",
        });
      },
    });
  }

  useEffect(() => {
    if (isWaitingForResponse) {
      requestViewerCreateData({
        onSuccess: (res) => {
          setAvailableData(res);
          setIsWaitingForResponse(false);
        },
        onError: (error) => {
          if (error.errors) {
            setFormError(error.errors);

            toast(t("error.viewerCreateReq"), {
              hideProgressBar: true,
              autoClose: 2000,
              type: "error",
            });
          }
        },
      });
    }
  });

  if (isWaitingForResponse) return <Loader />;

  return (
    <div className="u-fixed-width">
      <FormViewerCreate
        isWaiting={isWaitingForResponse}
        onSubmit={handleCreateViewer}
        validations={formError}
        availableData={availableData}
      />
    </div>
  );
};

export default PanelViewerCreate;
