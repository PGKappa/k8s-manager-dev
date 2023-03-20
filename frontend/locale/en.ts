export const english = {
  // dict: new Dict().setData({
  login: {
    title: "Login",
    username: "Username",
    password: "Password",
    submit: "Submit",
    password_show: "Show",
  },
  submit: "Submit",
  edit: "Edit",
  sidebar: {
    dashboard: "Dashboard",
    users: "Users",
    ticketList: "Ticket List",
    summary: "Summary",
    viewers: "Viewers",
    profile: "Profile",
  },
  pagination: {
    perPage: "Per page",
  },
  dashboard: {
    title: "Manager - Dashboard",
    header: "Dashboard",
    today_card: {
      title: "Today's report",
      turnover: "Turnover",
      profit: "Profit",
      shopcount: "Active",
      dogs6: "Dogs6,",
      horses6: "Horses6",
    },
    weekly_report: {
      title: "Download Weekly Report",
      button: "Download",
    },
    chart: {
      title: " Report chart",
      start_date: "Start date",
      end_date: "End date",
      button: "Update",
    },
  },
  user: {
    title: "Manager - Users",
    header: "Users",
    table: {
      username: "Username",
      level: "Level",
      created_at: "Created at",
      updated_at: "Updated At",
    },
    panel: {
      title_details: "User details",
      title_create: "User create",
      username: "Username",
      level: "Level",
      password: "Password",
      password_button: "Show",
      confirm_password: "Confirm Password",
      language: {
        label: "Language",
        default: "Select an option",
        english: "English - United",
      },
      button_edit: "Edit",
      enabled: "Enabled",
      advanced: {
        title: "Advanced",
        button: "Delete",
      },
    },
    profil: {
      username: "Username: ",
      operator: "Operator: ",
    },
  },
  ticket: {
    from: "From",
    to: "To ",
    button: {
      update: "Update",
      filter: "Advanced filters",
    },
    list: {
      title: "Manager - Tickets",
      header: "Ticket List",
    },
    summary: {
      title: "Manager - Summary",
      header: "Summary",
    },
    type: {
      transaction: {
        id: "Id",
        external_id: "External Id",
        username: "User",
        type: "Type",
        time: "Time",
        amount_in: "In",
        amount_out: "Out",
        status: "Status",
      },
      transaction_shops: {
        id: "#",
        user_id: "id",
        type: "Type",
        time: "Time",
        amount_id: "In",
        amount_out: "Out",
      },
      transaction_users: {
        id: "#",
        time: "Time",
        currency_id: "Currency",
        amount_in: "In",
        amount_out: "Out",
        status: "Status",
      },
      summary: {
        active: "Active",
        in: "In",
        out: "Out",
        profit: "Profit",
        tickets: "Tickets",
      },
      summary_shops: {
        shop_id: "",
        sumIn: "",
        sumOut: "",
        cancatPercentage: "",
      },
      summaryusers: {},
    },
    advance_filter: {
      user_type: "Filter by user type",
      type: "Type",
      from: "From",
      to: "To",
      group_by: "Group by",
      button: "Submit",
      id: "ID ",
      filters: {
        title: "Filter by users",
        all: "all",
        shops: "Shops",
        users: "Kiosks and players",
        searchNfilterTitleUsers: "User IDs",
        searchNfilterTitleShops: "Shop IDs",
        type: {
          label: "Type",
          transaction: "List",
          summary: "Summary",
        },
        groupBy: {
          default: "Select Group by ",
          shops: "Shops",
          users: "Users",
        },
      },
    },
    panel: {
      details: "Ticket Details: ",
      filters: "Filters",
    },
  },
  viewer: {
    table: {
      id: "ID",
      macaddress: "Macaddress",
      user: "user",
      monitor: "monitor",
      channel: "Channel",
      language: "Language",
      url: {
        button: "Url",
        title: "Video Url",
      },
    },
    panel: {
      macaddress: "Macaddress",
      user: "User",
      monitor: "Monitor",
      channel: "Channel",
      language: "Language",
      video_url: "Video URL",
      button: "Edit",
      advanced: {
        title: "Advanced",
        button: "Delete",
      },
    },
  },
  default: "Select an option",
  input: {
    select_default: "Select an option",
  },
  profile: {
    button: "Profile",
    panel: {
      username: "Username: ",
      password: "Password",
      confirm_password: "Confirm password",
    },
  },
  dark_mode: "Dark mode",
  guide: {
    button: {
      skip: "Skip",
      next: "Next",
      startTour: "Tour",

      back: "Back",
      close: "Close",
      last: "Last",
      open: "Open the dialog",
    },
    tours: {
      downloadWeeklyReport: {
        question:
          "How can I download a Weekly Report into a file that I can open with Excel ? ",
        answer:
          "Navigate to Dashboard page, select the desire week, then click Download button.",
        steps: [
          {
            title: "Go to Dashboard Page.",
            content: "Click the button above!",
          },
          {
            title: "Welcome to Dashboard page",
          },
          {
            title: "This is weekly report container",
          },
          {
            title: "Select wanted week",
          },
          {
            title: "Click download",
          },
          {
            title: "Click the button above!",
          },
          {
            title: "This is the tour you finished",
          },
        ],
      },
      createNewAccount: {
        question: "How can I create a new account for my colleague ?",
        answer: "Navigate to User page. Click plus button.",
        steps: [
          {
            title: "1 Go to User Page.",
            content: "Click the button above!",
          },
          {
            title: "2 Welcome to User page",
          },
          {
            title: "3 This is create user button",
            content: "Click the button above!",
          },
          // {
          //   title: "4 This is create user button",
          //   content: "Where you create a new account",
          // },
          //   {
          //     title: "Input for username",
          //     content: "You enter account username ",
          //   },
          //   {
          //     title: "Select a account level",
          //   },
          //   {
          //     title: "Enter password",
          //   },
          //   {
          //     title: "Confirm the password you entered in previous input",
          //   },
          //   {
          //     title: "Click create",
          //   },
          //   {
          //     title: "Congrats you have made a new account ",
          //   },
        ],
      },
    },
  },
  error: {
    error: "Error",
    warning: "Warning",
    auth: "Authentication failed",
    no_result: "No results found.",
    tickets: "Failed to update tickets",
    ticketshops: "Failed to update shop tickets",
    // ticket_shops: "Ticket"
    data: "Failed to fetch data.",
    viewerCreate: "Failed to create viewer",
    viewerDetails: "Failed to open viewer details.",
    viewerDelete: "Failed to delete viewer.",
    viewerUpdate: "Failed to update viewer.",
    ticketFilter: "Failed to filter tickets.",
    userDetails: "Failed to open user details.",
    userCreate: "Failed to create user.",
    userDelete: "Failed to delete user.",
    userUpdate: "Failed to update user.",
    userProfile: "Failed to update your profile.",
  },
  successful: {
    ticketFilter: "Tickets filtered successfully!",
    viewerDetails: "Viewer updated successfully!",
    viewerDelete: "Viewer deleted successfully!",
    viewerCreate: "Failed to create viewer",
    viewerCreateReq: "Failed to receive viewer data",
    ticket_shops: "Tickets updated for shop: ",
    userCreate: "User created successfully!",
    userEdit: "Successfully update user!",
    userDelete: "Successfully deleted the user!",
    userUpdate: "Successfully updated the user!",
    userDetails: "Successfully updated your profile.",
  },
};
