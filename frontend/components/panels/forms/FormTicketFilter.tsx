import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  Input,
  SearchAndFilter,
  Button,
  Select,
  Spinner,
  Form,
} from "@canonical/react-components";
import { Loader } from "@pg-ui/components";
import { getTodayDate } from "@/utils";
import { ThemeContext } from "@/context";
import { useTranslation } from "@pg-ui/i18n";

type FormData = {
  shops: [];
  users: [];
  fromDate?: string;
  toDate?: string;
  type?: string;
  groupBy?: string;
};

type FormTicketDetailsProps = {
  onSubmit: Function;
  submitText?: string;
  isWaiting: boolean;
  validations: {
    groupBy;
    users;
    type;
    fromDate;
    toDate;
    shops;
  };
  shopAndUserFilterData: {}[];
} & FormData;

const FormTicketDetails = ({
  onSubmit,
  isWaiting,
  submitText = "Submit",
  shops = [],
  users = [],
  fromDate = "",
  toDate = "",
  type = "",
  groupBy = "",
  validations,
  shopAndUserFilterData,
}: FormTicketDetailsProps) => {
  const { t } = useTranslation("");
  const { isDarkMode } = useContext(ThemeContext),
    // [isWaitingForResponse, setIsWaitingForResponse] = useState(true),
    [formData, setFormData] = useState<FormData>({
      shops: shops,
      users: users,
      fromDate: fromDate,
      toDate: toDate,
      type: type,
      groupBy: groupBy,
    }),
    // [shopsFilterPanelData, setShopsFilterPanelData] = useState(),
    todayDate = getTodayDate();

  let usersFilter = [];

  function setUsers(params) {
    let userValues = [];
    params.map((item, idx) => (userValues = [...userValues, item.value]));
    usersFilter = userValues;
  }

  let shopsFilter = [];
  function setShops(params) {
    let shopValues = [];
    params.map((item, idx) => (shopValues = [...shopValues, item.value]));
    shopsFilter = shopValues;
  }

  let existingShops = [];
  if (formData.shops.length > 0 && formData.shops[0] != "") {
    formData.shops.forEach((item, index) => {
      return (existingShops = [
        ...existingShops,
        {
          lead: t("tickets.advance_filter.id"),
          value: item,
        },
      ]);
    });
  }

  let existingUsers = [];
  if (formData.users.length > 0 && formData.users[0] != "") {
    formData.users.forEach((item, index) => {
      return (existingUsers = [
        ...existingUsers,
        {
          lead: t("tickets.advance_filter.id"),
          value: item,
        },
      ]);
    });
  }

  const [searchByMode, setSearchByMode] = useState<string>(""),
    enabledSearchByUsers = useMemo(
      () => searchByMode == "users" || users[0] || groupBy == "users",
      [searchByMode]
    ),
    enabledSearchByShops = useMemo(
      () => searchByMode == "shops" || shops[0] || groupBy == "shops",
      [searchByMode]
    );

  if (!shopAndUserFilterData) {
    return (
      <div className="u-align--center u-align-text--center u-vertically-center test">
        <Loader />
      </div>
    );
  }

  const defaultValueOfSelectFilter = shops[0]
    ? "shops"
    : "" || users[0]
    ? "users"
    : "" || groupBy
    ? groupBy
    : "";

  return (
    <div className="u-fixed-width">
      <div>
        <Select
          className={isDarkMode ? "is-dark" : ""}
          name="filters"
          defaultValue={defaultValueOfSelectFilter}
          options={[
            {
              value: "",
              label: t('tickets.advance_filter.filters.all'),
            },
            {
              value: "shops",
              label: t('tickets.advance_filter.filters.shops'),
            },
            {
              value: "users",
              label: t('tickets.advance_filter.filters.users'),
            },
          ]}
          label={t('tickets.advance_filter.filters.title')}
          onChange={(e) => {
            setSearchByMode(e.target.value);
          }}
          error={validations.groupBy}
        />
      </div>
      {enabledSearchByUsers && (
        <div>
          <label>{t("ticket.advance_filter.filters.searchNfilterTitleUsers")}</label>
          <SearchAndFilter
            filterPanelData={shopAndUserFilterData.users}
            returnSearchData={function noRefCheck(users) {
              setUsers(users);
            }}
            existingSearchData={existingUsers}
          />
          {validations.users && (
            <div className="p-notification--negative">
              <div className="p-notification__content">
                <p className="p-notification__message">{validations.users}</p>
              </div>
            </div>
          )}
        </div>
      )}
      {enabledSearchByShops && (
        <div>
          <label>{t("ticket.advance_filter.filters.searchFilterTitleShops")}</label>
          <SearchAndFilter
            filterPanelData={shopAndUserFilterData.shops}
            returnSearchData={function noRefCheck(shops) {
              setShops(shops);
            }}
            existingSearchData={existingShops}
          />
          {validations.shops && (
            <div className="p-notification--negative">
              <div className="p-notification__content">
                <p className="p-notification__message">{validations.shops}</p>
              </div>
            </div>
          )}
        </div>
      )}
      <Select
        className={isDarkMode ? "is-dark" : ""}
        id="exampleSelectMulti2"
        defaultValue={type ? type : "transaction"}
        options={[
          {
            value: "transaction",
            label: t("ticket.advance_filters.filters.type.transaction"),
          },
          {
            value: "summary",
            label: t("ticket.advance_filters.filters.type.summary"),
          },
        ]}
        label={t("ticket.advance_filters.filters.type.label")}
        onChange={(e) => {
          const newTicketType = e.target.value;
          setFormData({
            ...formData,
            type: newTicketType,
          });
        }}
        error={validations.type}
      />

      <Input
        type="date"
        className={isDarkMode ? "is-dark" : ""}
        label={t("ticket.advance_filter.from")}
        defaultValue={fromDate}
        max={todayDate}
        onChange={(e) => {
          const newFromDate = e.target.value;
          setFormData({
            ...formData,
            fromDate: newFromDate,
          });
        }}
        error={validations.fromDate}
      />
      <Input
        type="date"
        className={isDarkMode ? "is-dark" : ""}
        label={t("ticket.advance_filter.to")}
        name="toDate"
        max={todayDate}
        defaultValue={toDate}
        onChange={(e) => {
          const newToDate = e.target.value;
          setFormData({
            ...formData,
            toDate: newToDate,
          });
        }}
        error={validations.toDate}
      />

      <Select
        className={isDarkMode ? "is-dark" : ""}
        name="groupBy"
        defaultValue={groupBy ? groupBy : ""}
        options={[
          {
            value: "",
            label: t("ticket.advance_filters.filters.groupBy.default"),
          },
          ...(enabledSearchByShops && !enabledSearchByUsers
            ? [
                {
                  value: "shops",
                  label: t("ticket.advance_filters.filters.groupBy.shops"),
                },
              ]
            : []),
          ...(!enabledSearchByShops && enabledSearchByUsers
            ? [
                {
                  value: "users",
                  label: t("ticket.advance_filters.filters.groupBy.users"),
                },
              ]
            : []),
          ...(!enabledSearchByShops && !enabledSearchByUsers
            ? [
                {
                  value: "users",
                  label: t("ticket.advance_filters.filters.groupBy.users"),
                },
                {
                  value: "shops",
                  label: t("ticket.advance_filters.filters.groupBy.shops"),
                },
              ]
            : []),
        ]}
        label={t("ticket.groupBy")}
        onChange={(e) => {
          const newGroupBy = e.target.value;
          setFormData({
            ...formData,
            groupBy: newGroupBy,
          });
        }}
        error={validations.groupBy}
      />
      <Button
        appearance="positive"
        hasIcon={isWaiting}
        onClick={(e) => {
          onSubmit({ formData, shops: shopsFilter, users: usersFilter });

          e.preventDefault();
        }}
        className={isDarkMode ? "is-dark" : ""}
      >
        {isWaiting && <Spinner text={submitText} />}
        {!isWaiting && (
          <>
            <i className="p-icon--plus is-light"></i> <span>{submitText}</span>
          </>
        )}
      </Button>
    </div>
  );
};
export default FormTicketDetails;
