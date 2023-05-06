export const TRANSACTION_HEADERS = [
  {
    name: "Id",
    accessor: "id",
    sortable: true,
    defaultSort: "asc",
  },
  {
    name: "External Id",
    accessor: "external_id",
    sortable: true,
    // defaultSort: "asc"
  },
  // {
  //   name: "id",
  //   accessor: "user_id",
  //   sortable: true,
  // }
  {
    name: "User",
    accessor: "username",
    sortable: true,
  },
  {
    name: "Type",
    accessor: "type",
    sortable: true,
  },
  {
    name: "Time",
    accessor: "time",
    sortable: true,
  },
  // {
  //   name: "Currency",
  //   accessor: "currency_id",
  //   sortable: true,
  // },
  {
    name: "In",
    accessor: "amount_in",
    sortable: true,
  },
  {
    name: "Out",
    accessor: "amount_out",
    sortable: true,
  },
  {
    name: "Status",
    accessor: "status",
    sortable: true,
  },
];

export const SUMMARY_HEADERS = [
  {
    name: "Active",
    accessor: "active",
    defaultSort: "asc",
  },
  {
    name: "In",
    accessor: "in",
    sortable: true,
  },
  {
    name: "Out",
    accessor: "out",
    sortable: true,
  },
  {
    name: "Profit",
    accessor: "profit",
    sortable: true,
  },
  {
    name: "Tickets",
    accessor: "tickets",
    sortable: true,
  },
];

export const SUMMARY_BY_SHOP_HEADERS = [
  {
    name: "Shop",
    accessor: "shop_id",
    sortable: true,
    defaultSort: "desc",
  },
  {
    name: "In",
    accessor: "sumIn",
    sortable: true,
  },
  {
    name: "Out",
    accessor: "sumOut",
    sortable: true,
  },
  {
    name: "Profit",
    accessor: "concatPercentage",
    sortable: true,
  },
];

export const TRANSACTION_SHOPS_HEADERS = [
  {
    name: "#",
    accessor: "id",
    sortable: true,
    defaultSort: "asc",
  },
  {
    name: "id",
    accessor: "user_id",
    sortable: true,
  },
  {
    name: "Type",
    accessor: "type",
    sortable: true,
  },
  {
    name: "Time",
    accessor: "time",
    sortable: true,
  },
  // {
  //   name: "Currency",
  //   accessor: "currency_id",
  //   sortable: true,
  // },
  {
    name: "In",
    accessor: "amount_in",
    sortable: true,
  },
  {
    name: "Out",
    accessor: "amount_out",
    sortable: true,
  },
  {
    name: "Status",
    accessor: "status",
    sortable: true,
  },
];

export const SUMMARY_USERS_HEADERS = [];

export const TRANSACTION_USERS_HEADERS = [
  {
    name: "#",
    accessor: "id",
    sortable: true,
    defaultSort: "asc",
  },
  //   {
  //     name: "id",
  //     accessor: "user_id",
  //     sortable: true,
  //   },
  //   {
  //     name: "Type",
  //     accessor: "type",
  //     sortable: true,
  //   },
  {
    name: "Time",
    accessor: "time",
    sortable: true,
  },
  {
    name: "Currency",
    accessor: "currency_id",
    sortable: true,
  },
  {
    name: "In",
    accessor: "amount_in",
    sortable: true,
  },
  {
    name: "Out",
    accessor: "amount_out",
    sortable: true,
  },
  {
    name: "Status",
    accessor: "status",
    sortable: true,
  },
];

export function getHeaders(mode) {
  switch (mode) {
    case "summary":
      return SUMMARY_HEADERS;
      break;
    case "transaction":
      return TRANSACTION_HEADERS;
      break;
    case "summaryShops":
      return SUMMARY_BY_SHOP_HEADERS;
      break;
    case "transactionShops":
      return TRANSACTION_SHOPS_HEADERS;
      break;

    case "transactionUsers":
      return TRANSACTION_USERS_HEADERS;
      break;
    case "summaryUsers":
      return SUMMARY_USERS_HEADERS;
      break;

    default:
      return "FAILED TO DISTINCT MODE";
  }
}
