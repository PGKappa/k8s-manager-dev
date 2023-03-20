import { useAuth } from "@/hooks/auth";

export const USERS_HEADERS = [
  {
    name: "Username",
    accessor: "username",
    sortable: true,
  },
  {
    name: "Level",
    accessor: "level",
    sortable: true,
  },
  {
    name: "Created at",
    accessor: "created_at",
    sortable: true,
  },
  {
    name: "Updated at",
    accessor: "updated_at",
    sortable: true,
  },
];

export function getUserLevels(user) {
  //   const user = useAuth();
  let allowedLevel;
  switch (user.level) {
    case "root":
      allowedLevel = [
        {
          label: "Select an option",
          value: "",
        },
        {
          label: "admin",
          value: "2",
        },
        {
          label: "support",
          value: "3",
        },
        {
          label: "analyst",
          value: "4",
        },
      ];

      break;
    case "admin":
      allowedLevel = [
        {
          label: "Select an option",
          value: "",
        },
        {
          label: "support",
          value: "3",
        },
        {
          label: "analyst",
          value: "4",
        },
      ];

      break;
    case "support":
      allowedLevel = [
        {
          label: "Select an option",
          value: "",
        },
        {
          label: "analyst",
          value: "4",
        },
      ];
      break;
    case "analyst":
      allowedLevel = [
        {
          label: "Select an option",
          value: "",
        },
        {
          label: "analyst",
          value: "4",
        },
      ];

      break;

    default:
      console.warn("ERROR GETIN USER LEVEL");
      break;
  }
  return allowedLevel;
}
