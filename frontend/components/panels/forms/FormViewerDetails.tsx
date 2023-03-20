import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  Spinner,
  Select,
} from "@canonical/react-components";
import { ThemeContext, AsidePanelContext } from "@/context";
import { useTranslation } from "@pg-ui/i18n";

type FormData = {
  macaddress?: string;
  user?: string;
  monitor?: string;
  channel?: string;
  language?: string;
  videoURL?: string;
};
type onSubmitCallbackArguments = {} & FormData;

type onSubmitCallback = {
  // description: string;
  (args: onSubmitCallbackArguments): void;
};

type FormViewerCreateProps = {
  onSubmit: onSubmitCallback;
  submitText?: string;
  isWaiting: boolean;
  validations: {}[];
  values: {}[];
} & FormData;

const FormViewerDetails = ({
  onSubmit,
  submitText,
  isWaiting,
  macaddress = "",
  user = "",
  monitor = "",
  channel = "",
  language = "",
  videoURL = "",
  values = [],
  validations,
}: FormViewerCreateProps) => {
  const [formData, setFormData] = useState<FormData>({
    macaddress: macaddress,
    user: user,
    monitor: monitor,
    channel: channel,
    language: language,
    videoURL: videoURL,
  });

  const { isDarkMode } = useContext(ThemeContext),
    { t } = useTranslation(""),
    { closeAsidePanel } = useContext(AsidePanelContext);

  useEffect(() => {
    setFormData({
      macaddress: macaddress,
      user: user,
      monitor: monitor,
      channel: channel,
      language: language,
      videoURL: videoURL,
    });
  }, [macaddress, user, monitor, channel, language]);

  return (
    <Form>
      {/* <div className={"u-fixed-width " + (isDarkMode ? "is-dark" : "")}> */}
      <Input
        className={isDarkMode ? "is-dark" : ""}
        type="text"
        label={t("viewer.panel.macaddress")}
        onChange={(e) => {
          const newMacaddress = e.target.value;
          setFormData({
            ...formData,
            macaddress: newMacaddress,
          });
        }}
        value={formData.macaddress}
        error={validations.macaddress}
      />

      <Select
        className={isDarkMode ? "is-dark" : ""}
        defaultValue={formData.user}
        label={t('viewer.panel.user')}
        //   options={values.shops}
        options={[
          { value: "", disabled: false, label: t("input.select_default") },
          ...(values.shops || []).map((x) => {
            return {
              value: x.id,
              label: x.name,
            };
          }),
        ]}
        onChange={(e) => {
          const newUserId = e.target.value;
          setFormData({
            ...formData,
            user: newUserId,
          });
        }}
        error={validations.shops}
      />
      <Input
        className={isDarkMode ? "is-dark" : ""}
        type="text"
        label={t("viewer.panel.monitor")}
        onChange={(e) => {
          const newMonitorId = e.target.value;
          setFormData({
            ...formData,
            monitor: newMonitorId,
          });
        }}
        value={formData.monitor}
        error={validations.monitor}
      />

      <Select
        className={isDarkMode ? "is-dark" : ""}
        defaultValue={formData.channel}
        label={t("viewer.panel.channel")}
        options={[
          { value: "", disabled: false, label: t("viewer.input.select_default") },
          ...(values.channels || []).map((x) => {
            return {
              value: x.id,
              label: x.name + " - " + x.game,
            };
          }),
        ]}
        onChange={(e) => {
          const newChannelId = e.target.value;
          setFormData({
            ...formData,
            channel: newChannelId,
          });
        }}
        error={validations.channels}
      />

      <Select
        className={isDarkMode ? "is-dark" : ""}
        defaultValue={formData.language}
        label={t('viwer.panel.language')}
        options={[
          { value: "", disabled: false, label: t("viewer.input.select_default") },
          ...(values.languages || []).map((x) => {
            return {
              value: x.id,
              label: x.name,
            };
          }),
        ]}
        onChange={(e) => {
          const newLanguageId = e.target.value;
          setFormData({
            ...formData,
            language: newLanguageId,
          });
        }}
        error={validations.languages}
      />
      <Input
        className={isDarkMode ? "is-dark" : ""}
        type="text"
        label={t("viewer.panel.video_url")}
        //   placeholder=" url "
        onChange={(e) => {
          const newVideoUrl = e.target.value;
          setFormData({
            ...formData,
            videoURL: newVideoUrl,
          });
        }}
        value={formData.videoURL}
        error={validations.videoURL}
      />

      <Button
        appearance="positive"
        hasIcon={isWaiting}
        onClick={(e) => {
          onSubmit({
            args: formData,
            onSuccess: (response) => {
              closeAsidePanel();
            },
            onError: (e) => {},
          });
          e.preventDefault();
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

export default FormViewerDetails;
