import axios from "@/lib/axios";
import React, { useContext, useEffect, useState, FC, useCallback } from "react";

type onSubmitCallbackArguments = {};

type onSuccessCallback = {
  (args: onSubmitCallbackArguments): void;
};

type RequestUsersListArgs = {
  pageIndex?: number;
  numItemsPerPage?: number;
  onSuccess: Function;
  onError: Function;
};

export type RequestUsersResponse = {
  headers: {
    id: string;
    text: string;
  }[];
  users: {
    id: string;
    username: string;
    level: string;
    created_at: string;
    updated_at: string;
  }[];
  pagination: {
    chunk: number;
    last_chunk: number;
    total: number;
    limit: number;
  };
};

function requestUsers({
  onSuccess,
  onError,
  pageIndex,
  numItemsPerPage,
}: RequestUsersListArgs) {
  axios
    .get("/api/mui/manager/users", {
      params: {
        chunk: pageIndex,
        limit: numItemsPerPage,
      },
    })
    .then((response) => {
      const res: RequestUsersResponse = response.data;
      onSuccess(res);
    })
    .catch((error) => {
      onError(error.response.data);
    });
}

export function useUsersPages({ itemsPerPage }) {
  const [needsNewRequest, setNeedsNewRequest] = useState(true);
  const [data, setData] = useState({
    users: [],
    waiting: true,
    pagination: {
      chunk: 1,
      last_chunk: 1,
      total: 1,
      limit: itemsPerPage,
      displayedItems: 1,
    },

    // goToPage: (pagination) => {
    //     console.log('PAGGGINATION IN useUsersPages',pagination)
    //   setData({
    //     ...data,
    //     pagination: {
    //       ...data.pagination,
    //       chunk: pagination.chunk,
    //       limit: pagination.limit,
    //     },
    //   });
    //   setNeedsNewRequest(true);
    // },
    goToPage: (pageIndex, numItemsPerPage?, args?) => {
      //   console.log("PAGGGINATION IN useUsersPages", pagination);
      setData({
        ...data,
        pagination: {
          ...data.pagination,
          chunk: pageIndex,
          limit: numItemsPerPage,
        },
      });
      setNeedsNewRequest(true);
    },
    updatePage: () => {},
  });

  useEffect(() => {
    if (!needsNewRequest) return;

    setNeedsNewRequest(false);

    setData({
      ...data,
      waiting: true,
    });

    requestUsers({
      pageIndex: data.pagination.chunk,
      numItemsPerPage: data.pagination.limit,
      onSuccess: (res: RequestUsersResponse) => {
        setData({
          ...data,
          waiting: false,
          users: res.users,
          pagination: res.pagination,
        });
      },
      onError: (e) => {
        setData({
          ...data,
          waiting: false,
          // users: res.users,
          // pagination: res.pagination,
        });
        // setIsWaitingForResponse(false);
      },
    });
  }, [data, needsNewRequest]);

  return data;
}

type RequestUsersCreateArgs = {
  args: onSubmitCallbackArguments;
  onSuccess: Function;
  onError: Function;
};

export function requestCreateUser({
  args,
  onSuccess,
  onError,
}: RequestUsersCreateArgs) {
  axios
    .post("/api/mui/manager/users/create", args.args)
    .then((response) => {
      onSuccess(response);
    })
    .catch((error) => {
      onError(error.response.data);
    });
}

type UserDetails = {
  username: string;
  level: string;
  enabled: number;
};

export type RequestUserDetailsResponse = {
  message: string;
  errors?: {
    [key: string]: string[];
  };
  details: UserDetails;
  subLevels: [];
};

type RequestUserDetailsParams = {
  userId: string;
  onSuccess: Function;
  onError: Function;
};

export function requestUserDetails({
  userId,
  onSuccess,
  onError,
}: RequestUserDetailsParams): void {
  axios
    .get(`/api/mui/manager/users/${userId}`)
    .then((response) => {
      const res: RequestUserDetailsResponse = response.data;
      onSuccess(res);
    })
    .catch((error) => {
      onError(error.response.data);
    });
}

type RequestUserEditDetailsParams = {
  onSuccess: Function;
  onError: Function;
  userId: string;
  args: {
    confirmPassword: string;
    enabled: boolean;
    level: string;
    password: string;
    username: string;
  };
};

export type RequestUserEditDetailsResponse = {
  message: string;
  errors?: {
    [key: string]: string[];
  };
};

export function requestUserEditDetails({
  args,
  onSuccess,
  onError,
  userId,
}: RequestUserEditDetailsParams) {
  axios
    .post(`/api/mui/manager/users/${userId}`, args.args)
    .then((response) => {
      const res: RequestUserEditDetailsResponse = response.data;
      onSuccess(res);
    })
    .catch((error) => {
      onError(error.response.data);
    });
}

export type RequestUserDeleteParams = {
  onSuccess: Function;
  onError: Function;
  userId: string;
};

export type RequestUserDeleteResponse = {};

export function requestUserDelete({
  userId,
  onSuccess,
  onError,
}: RequestUserDeleteParams) {
  axios
    .delete(`/api/mui/manager/users/${userId}`)
    .then((response) => {
      const res: RequestUserEditDetailsResponse = response.data;
      onSuccess(res);
    })
    .catch((error) => {
      onError(error.response.data);
    });
}
