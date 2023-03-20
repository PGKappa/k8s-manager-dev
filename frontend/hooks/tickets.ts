// import axios from "axios";
import axios from "@/lib/axios";
export type RequestTicketListArgs = {
  params: any;
  onSuccess: onSuccessCallback;
  onError: Function;
};

export type RequestTicketListResponse = {
  mode: string;
  headers: [];
  reports: [];
  pagination: {
    chunk: 1;
    last_chunk: 1;
    total: 1;
    limit: 1;
  };
  totalSum: {
    amount_in: "";
    amount_out: "";
    id: "";
    shop_id: "";
    status: "";
    time: "";
  }[];
  totalSumOfPerPage: {
    amount_in: "";
    amount_out: "";
    id: "";
    shop_id: "";
    status: "";
    time: "";
  }[];
  params: {
    type: "string";
    groupBy: "string";
    fromDate: "string";
    toDate: "string";
    shops: {}[];
    users: {}[];
  };
  status: number;
};

type onSubmitCallbackArguments = {};

type onSuccessCallback = {
  (args: onSubmitCallbackArguments): void;
};

export function requestTicketList({
  params,
  onSuccess,
  onError,
}: RequestTicketListArgs) {
  axios
    .get("/api/mui/manager/tickets", { params: params })

    .then((response) => {
      const res: RequestTicketListResponse = response.data;
      onSuccess(res);
    })
    .catch((error) => {
      console.warn(error);
        onError(error.response.data);
    });
}

enum TicketSummaryGroupBy {
  shop = "shop",
  operator = "operator",
  date = "date",
}

type RequestTicketSummaryArgs = {
  params: {
    groupBy?: TicketSummaryGroupBy;
    fromDate: string;
    toDate: string;
    shop?: string;
    type: string;
  };
  onSuccess: Function;
  onError: Function;
};

export type RequestTicketSummaryResponse = {
  mode: string;
  params: {
    type: string;
    groupBy: string;
    fromDate: string;
    toDate: string;
  };
  reports: {
    // reports: {
    shop_id?: string;
    user_id?: string;
    gross_in: string;
    active_shops: number;
    date: string;
    sumIn: string;
    sumOut: string;
    amountUnpaid: string;
    sumProfit: string;
    sumPercentage: string;
    in?:string ,
    profit?: string,
    active?: string,
    // };
  }[];
  pagination: {
    total: number;
    chunk: number;
    limit: number;
    last_chunk: number;
  };
  totalSum: {
    shop_id?: string;
    operator_id: string;
    sumIn: string;
    sumOut: string;
    concatPercentage: string;
  };
  totalSumOfPerPage: {}[];
};

export function requestTicketSummary({
  params,
  onSuccess,
  onError,
}: RequestTicketSummaryArgs) {
  axios
    .get("/api/mui/manager/tickets", { params: params })
    .then((response) => {
      const res: RequestTicketSummaryResponse = response.data;
      onSuccess(res);
    })
    .catch((error) => {
      console.warn(error);
        onError(error.response);
    });
}

type RequestTicketDetailsArgs = {
  params: {
    ticketId: string;
  };
  onSuccess?: Function;
  onError?: Function;
};

type RequestTicketDetailsResponse = {
  // ret_code: RetCode;????
  description: string;
  info: {
    bet_type: string;
    ticket_id: string;
    time: string;
    intl: {
      currency: string;
      locale: string;
      num_significant_decimal_digits: string;
    };
    amount: number;
    amount_won: number;
    status: number;
    selections: {
      game: {
        dict: {
          misc: {
            name: string;
          };
        };
        constraints: {
          event_closes_in_seconds: string;
        };
      };

      gameDuration: number;
      raceDuration: number;
      trackName: string;
      startTime: string;
      channelName: string;

      gameId: string;
      channelId: string;
      palimpsestId: string;
      eventId: string;
      isBanker: boolean;
      status: string;
      markets: {
        description: string;
        selections: {
          description: string;
          odds: string;
          status: string;
        }[];
      }[];
    }[];
    system: {
      [groupSize: string]: number;
    };
  };
};

export function requestTicketDetails({
  params,
  onSuccess,
  onError,
}: RequestTicketDetailsArgs) {
  axios
    .get(`/api/mui/manager/tickets/${params.ticketId}`)
    .then((response) => {
      const res: RequestTicketDetailsResponse = response.data;
      onSuccess((typeof res == "string" ? JSON.parse(res) : res) || {});
    })
    .catch((error) => {
      onError(error.response.data);
    });
}

type TicketParamLimit = 10 | 25 | 50 | 100 | 2000;

type RequestTicketFilterParams = {
  toDate: string;
  fromDate: string;
  limit: TicketParamLimit;
  type: string;
  shops: string;
  users: string;
  chunk: number;
  groupBy: string;
};

export type requestTicketFilterArgs = {
  params: RequestTicketFilterParams;
  onSuccess: onSuccessCallback;
  onError: Function;
};

export function requestTicketFilter({
  params,
  onSuccess,
  onError,
}: requestTicketFilterArgs) {
  axios
    .get("/api/mui/manager/tickets", { params: params })
    .then((response) => {
      const res: RequestTicketSummaryResponse = response.data;
      onSuccess(res);
    })
    .catch((error) => {
      onError(error.response.data);
    });
}
export type requestTicketShopsArgs = {
  onSuccess: onSuccessCallback;
  onError: Function;
};

export function requestTicketShops({
  onSuccess,
  onError,
}: requestTicketShopsArgs) {
  axios
    .get("/api/mui/manager/autocomplete/shops")
    .then((response) => {
      onSuccess(response.data);
    })
    .catch((error) => {
      onError(error.response.data);
    });
}
