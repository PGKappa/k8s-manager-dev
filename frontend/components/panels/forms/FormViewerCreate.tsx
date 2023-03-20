import React, { useContext, useEffect, useState, FC } from "react";
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
  validations: {};
  availableData: {};
} & FormData;

const FormViewerCreate = ({
  onSubmit,
  submitText ,
  isWaiting,
  macaddress = "",
  user = "",
  monitor = "",
  channel = "",
  language = "",
  videoURL = "",
  validations,
  availableData,
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
    {t} = useTranslation(""),
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
      <Input
        className={isDarkMode ? "is-dark" : ""}
        type="text"
        label={t('viewer.panel.macaddress')}
        required
        onChange={(e) => {
          const newMacaddress = e.target.value;
          setFormData({
            ...formData,
            macaddress: newMacaddress,
          });
        }}
        //   value={formData.macaddress}
        error={validations.macaddress}
      />

      <Select
        className={isDarkMode ? "is-dark" : ""}
        label={t('viewer.panel.user')}
        required
        options={[
          { value: "", disabled: false, label: t("input.select_default") },
          ...(availableData.shops || []).map((x) => {
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
        error={validations.user}
      />

      <Input
        className={isDarkMode ? "is-dark" : ""}
        type="text"
        label={t('viewer.panel.monitor')}
        //   placeholder="User"
        required
        onChange={(e) => {
          const newMonitorId = e.target.value;
          setFormData({
            ...formData,
            monitor: newMonitorId,
          });
        }}
        error={validations.monitor}
      />

      <Select
        className={isDarkMode ? "is-dark" : ""}
        label={t("viewer.panel.channel")}
        required
        options={[
          { value: "", disabled: false, label: t("input.select_default") },
          ...(availableData.channels || []).map((x) => {
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
        error={validations.channel}
      />

      <Select
        className={isDarkMode ? "is-dark" : ""}
        label={t("viewer.pangel.language")}
        required
        options={[
          { value: "", disabled: false, label: t("input.select_default") },
          ...(availableData.languages || []).map((x) => {
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
        error={validations.language}
      />

      <Input
        className={isDarkMode ? "is-dark" : ""}
        type="text"
        label={t("viewer.panel.video_url")}
        required
        onChange={(e) => {
          const newVideoUrl = e.target.value;
          setFormData({
            ...formData,
            videoURL: newVideoUrl,
          });
        }}
        error={validations.videoURL}
      />

      <Button
        appearance="positive"
        hasIcon={isWaiting}
        onClick={(e) => {
          onSubmit({ args: formData });
          e.preventDefault();
        }}
      >
        {isWaiting && <Spinner text={submitText} />}
        {!isWaiting && (
          <>
            <i className="p-icon--plus is-light"></i>
            <span>{submitText}</span>
          </>
        )}
      </Button>
    </Form>
  );
};

export default FormViewerCreate;
