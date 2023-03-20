import { ThemeContext, AsidePanelContext } from "@/context";
import React, { useContext, useEffect, useState } from "react";
import {
  requestTicketShops,
  requestTicketFilter,
  RequestTicketListResponse,
} from "@/hooks/tickets";
import FormTicketDetails from "./forms/FormTicketFilter";
import { toast } from "react-toastify";
import { useTranslation } from "@pg-ui/i18n";

export type onSubmitCallbackArguments = {} & FormData;

type FormData = {
  shop: [];
  fromDate?: string;
  toDate?: string;
  type?: string;
  groupBy?: string;
};

type FormFiltersProps = {
  //   onSubmit: Function;
  //   submitText: string;
  //   isWaiting: boolean;
  validations: {};
  updatePage: Function;
} & FormData;

const PanelTicketFilters = ({
  //   onSubmit,
  //   isWaiting,
  //   submitText = "Submit",
  shops = [],
  users = [],
  fromDate = "",
  toDate = "",
  type = "",
  groupBy = "",
  validations,
  updatePage,
}: FormFiltersProps) => {
  const { isDarkMode } = useContext(ThemeContext),
    { closeAsidePanel } = useContext(AsidePanelContext),
    [isWaitingForResponse, setIsWaitingForResponse] = useState(false),
    [shopsFilterPanelData, setShopsFilterPanelData] = useState(),
    [formFilterErrors, setFormFilterErrors] = useState({
      shops: "",
      users: "",
      fromDate: "",
      toDate: "",
      type: "",
      groupBy: "",
    });
    const {t} = useTranslation("");

  useEffect(() => {
    requestTicketShops({
      onSuccess: (res) => {
        setShopsFilterPanelData(res);
      },
      onError: (e) => {
        setIsWaitingForResponse(false);
      },
    });
  }, []);

  function handleFilterChange(advancedFilters) {
    setIsWaitingForResponse(true);

    requestTicketFilter({
      params: {
        shops: advancedFilters.shops,
        users: advancedFilters.users,
        fromDate: advancedFilters.formData.fromDate,
        toDate: advancedFilters.formData.toDate,
        type: advancedFilters.formData.type,
        groupBy: advancedFilters.formData.groupBy,
      },
      onSuccess: (res: RequestTicketListResponse) => {
        setIsWaitingForResponse(false);

        updatePage(res);

        closeAsidePanel();

        toast(t("successful.ticketFilter"), {
          hideProgressBar: true,
          autoClose: 2000,
          type: "success",
        });
      },
      onError: (error) => {
        toast(t("error.ticketFilter"), {
          hideProgressBar: true,
          autoClose: 2000,
          type: "error",
        });
        if (error.errors) {
          setFormFilterErrors(error.errors);
        }
      },
    });
  }

  return (
    <FormTicketDetails
      isWaiting={isWaitingForResponse}
      onSubmit={handleFilterChange}
      validations={formFilterErrors}
      shopAndUserFilterData={shopsFilterPanelData}
      shops={shops}
      users={users}
      fromDate={fromDate}
      toDate={toDate}
      type={type}
      groupBy={groupBy}
    />
  );
};

export default PanelTicketFilters;
