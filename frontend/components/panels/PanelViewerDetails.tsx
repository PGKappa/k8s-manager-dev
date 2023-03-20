import React, { useContext, useEffect, useState, FC } from "react";
import { Button, Accordion } from "@canonical/react-components";
import FormViewerDetails from "./forms/FormViewerDetails";
import {
  requestViewerDetails,
  requestViewerEditDetails,
  RequestViewerEditDetailsResponse,
  requestViewerDelete,
  RequestViewerDeleteResponse,
} from "@/hooks/viewers";
import { ThemeContext, AsidePanelContext } from "@/context";
import Loader from "@/components/Loader";
import { toast } from "react-toastify";
import { useTranslation } from "@pg-ui/i18n";

type PanelViewerDetailsProps = {
  viewerId: string;
  updatePage?: Function;
};

const PanelViewerDetails: FC<PanelViewerDetailsProps> = ({
  viewerId,
  updatePage,
}: PanelViewerDetailsProps) => {
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(true),
   [message, setMessage] = useState(""),
   [errors, setErrors] = useState([]),
   [viewerDetails, setViewerDetails] = useState<{
      macaddress: string;
      user: string;
      monitor: string;
      channel: string;
      language: string;
      videoURL: string;
    }>({
      macaddress: "",
      user: "",
      monitor: "",
      channel: "",
      language: "",
      videoURL: "",
    }),
    // { isDarkMode } = useContext(ThemeContext),
    { closeAsidePanel } = useContext(AsidePanelContext),
   [allowedValues, setAllowedValues] = useState(),
    [formErrors, setFormErrors] = useState({
      macaddress: "",
      user: "",
      monitor: "",
      channel: "",
      language: "",
      videoURL: "",
    }),
    {t} = useTranslation("") ;

  useEffect(() => {
    if (viewerId) {
      requestViewerDetails({
        viewerId: viewerId,
        onSuccess: (res: RequestViewerDetailsResponse) => {
          setMessage(res.message);
          setErrors(res.errors || []);
          setIsWaitingForResponse(false);
          setViewerDetails(res.viewer);
          setAllowedValues(res.values);
        },
        onError: (e) => {
          toast(t("error.viewerDetails"), {
            hideProgressBar: true,
            autoClose: 2000,
            type: "error",
          });
        },
      });
    }
  }, [viewerId]);

  function onDeleteButtonClick() {
    requestViewerDelete({
      viewerId: viewerId,
      onSuccess: (res: RequestViewerDeleteResponse) => {
        setMessage(res.message);

        toast(t("successful.viewerDelete"), {
          hideProgressBar: true,
          autoClose: 2000,
          type: "success",
        });
        updatePage();
        closeAsidePanel();
      },
      onError: (e) => {
        toast(t("error.viewerDelete"), {
          hideProgressBar: true,
          autoClose: 2000,
          type: "error",
        });
      },
    });
  }

  function handleViewerUpdate(args) {
    requestViewerEditDetails({
      args,
      viewerId: viewerId,
      onSuccess: (res: RequestViewerEditDetailsResponse) => {
        setMessage(res.message);
        setErrors(res.errors || []);

        toast(t("successful.viewerDetails"), {
          hideProgressBar: true,
          autoClose: 2000,
          type: "success",
        });
        updatePage();
        closeAsidePanel();
      },
      onError: (error) => {
        toast(t('error.viewerUpdate'), {
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
      <FormViewerDetails
        isWaiting={isWaitingForResponse}
        message={message}
        errors={errors}
        submitText={t("viewer.panel.button")}
        macaddress={viewerDetails.macaddress}
        user={viewerDetails.user}
        monitor={viewerDetails.monitor}
        channel={viewerDetails.channel}
        language={viewerDetails.language}
        videoURL={viewerDetails.videoURL}
        onSubmit={handleViewerUpdate}
        values={allowedValues}
        validations={formErrors}
      />
      <Accordion
        sections={[
          {
            content: (
              <>
                <Button appearance="negative" onClick={onDeleteButtonClick}>
                  {t("viewer.panel.advanced.button")}
                </Button>
              </>
            ),
            title: t('viewer.panel.advanced.title'),
          },
        ]}
      />
    </div>
  );
};
export default PanelViewerDetails;
