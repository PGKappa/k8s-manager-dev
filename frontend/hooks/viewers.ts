import axios from "@/lib/axios";

export const VIEWERS_HEADERS = [
  {
    name: "id",
    accessor: "id",
    sortable: true,
    defaultSort: "asc",
  },
  {
    name: "macaddress",
    accessor: "macaddress",
    sortable: true,
  },
  {
    name: "user",
    accessor: "user",
    sortable: true,
  },
  {
    name: "monitor",
    accessor: "monitor",
    sortable: true,
  },
  {
    name: "channel",
    accessor: "channel",
    sortable: true,
  },
  {
    name: "language",
    accessor: "language",
    sortable: true,
  },
  {
    name: "videoURL",
    accessor: "videoURL",
  },
];
type onSubmitCallbackArguments = {};

type onSuccessCallback = {
  (args: onSubmitCallbackArguments): void;
};

type RequestViewersListArgs = {
  pageIndex?: number;
  numItemsPerPage?: number;
  onSuccess: Function;
  onError: Function;
  args?: {};
  viewerId?: string;
};

export type RequestViewersResponse = {
  viewers: {
    id: string;
    macaddress: string;
    user_id: string;
    monitor: string;
    channel_id: string;
    language: string;
    url: string;
  }[];
  pagination: {
    chunk: number;
    last_chunk: number;
    total: number;
    limit: number;
  };
};

export function requestViewers({
  onSuccess,
  onError,
  pageIndex,
  numItemsPerPage,
  args,
}: RequestViewersListArgs) {
  axios
    .get("/api/mui/manager/viewers", {
      params: {
        ...args,
        chunk: pageIndex,
        limit: numItemsPerPage,
      },
    })
    .then((response) => {
      const res: RequestViewersResponse = response.data;
      onSuccess(res);
    })
    .catch((error) => {
      onError(error);
    });
}
type RequestViewerCreateArgs = {
  args: onSubmitCallbackArguments;
  onSuccess: Function;
  onError: Function;
};

export function requestCreateViewer({ args, onSuccess, onError }) {
  axios
    .post("/api/mui/manager/viewers/create", args.args)
    .then((response) => {
      onSuccess(response);
    })
    .catch((error) => {
      onError(error.response.data);
    });
}

type RequestViewerDataCreateArgs = {
  onSuccess: Function;
  onError: Function;
};

type RequestAvailableCreateDataResponse = {
  channels: {}[];
  shops: {}[];
  languages: {}[];
};
export function requestViewerCreateData({
  onSuccess,
  onError,
}: RequestViewerDataCreateArgs) {
  axios
    .get("/api/mui/manager/viewers/create")
    .then((response) => {
      const res: RequestAvailableCreateDataResponse = response.data;
      onSuccess(res);
    })
    .catch((error) => {
      onError(error);
    });
}

type RequestViewerDetailsArgs = {
  viewerId: string;
  onSuccess?: Function;
  onError?: Function;
};

type RequestTicketDetailsResponse = {};

export function requestViewerDetails({ viewerId, onSuccess, onError }) {
  axios
    .get(`/api/mui/manager/viewers/${viewerId}`)
    .then((response: AxiosResponse) => {
      const res: RequestTicketDetailsResponse = response.data;
      onSuccess(res);
    })
    .catch((error) => {
      onError(error.response.data);
    });
}

export function requestViewerEditDetails({
  onSuccess,
  onError,
  pageIndex,
  numItemsPerPage,
  viewerId,
  args,
}: RequestViewersListArgs) {
  axios
    .post(`/api/mui/manager/viewers/${viewerId}`, args.args)
    .then((response: AxiosResponse) => {
      const res: RequestViewerEditDetailsResponse = response.data;
      onSuccess(res);
    })
    .catch((error) => {
      onError(error.response.data);
    });
}

export function requestViewerDelete({ viewerId, onSuccess, onError }) {
  axios
    .delete(`/api/mui/manager/viewers/${viewerId}`)
    .then((response) => {
      const res: RequestViewerEditDetailsResponse = response.data;
      onSuccess(res);
    })
    .catch((e) => {
      onError(e);
    });
}
export type RequestViewerEditDetailsResponse = {
  message: string;
  errors?: {
    [key: string]: string[];
  };
};

export type RequestViewerDeleteResponse = {
    message
};
