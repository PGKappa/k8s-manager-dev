# Guidelines for PGV Manager

**PGV Manager** is a backoffice management system.
Note that the words "manager" and "backoffice" are used as synonyms in this document.
The access to the backoffice must be permitted to known users only.
Users that can access to the backoffice can be: created, edited and removed by the backoffice itself.
Users will be able to manage the PGV's database elements via this system, following the rules defined in this document.
There are different types of users which have different role and permissions.

## Implementation

The implementation will be made in Laravel, and the manager will be used as a composer package, installed on the main laravel application package.

Queries must be implemented using methods which are in _Models_ defined in `pgvirtual-core/src/Models`

Graphical Design follows "PG Area".

## Features

- multilanguage support
- download spreadsheet of week report
- activity history (time, user, description, details)

### Accounting

Every type of user can see the accounting, in a selected date range and with some specific query option:

- start date
- end date
- shop/user (or whole network under the operator which the user is linked to)
  The result will be a table with the following columns:
- user identifier,
- in,
- out,
- profit

#### Type of Users

- "root" -> god
- "admin":
  an "admin" linked to an operator
- support:
  a "support" user is linked to an operator
- analyst

#### User Permissions/Roles - Menu List

|                        | Root: Read | Root: Write | Root: Delete | Admin: Read | Admin: Write | Admin: Delete | Support: Read | Support: Write | Support: Delete | Analyst: Read |
| ---------------------- | ---------- | ----------- | ------------ | ----------- | ------------ | ------------- | ------------- | -------------- | --------------- | ------------- |
| **API Logs**           | X          |             |              |             |              |               |               |                |                 |
| **Channels**           | X          | X           | X            | X           |              |               | X             |                |                 |
| **Configurations**     | X          | X           | X            | X           |              |               |               |                |                 |
| **Currencies**         | X          | X           |              |             |              |               |               |                |                 |
| **Events**             | X          |             |              | X           |              |               | X             |                |                 |
| **Event Scheduling**   | X          |             |              | X           |              |               | X             |                |                 |
| **Games**              | X          | X           |              |             |              |               |               |                |                 |
| **Languages**          | X          | X           |              | X           |              |               |               |                |                 |
| **Latecomers**         | X          |             |              | X           |              |               |               |                |                 |
| **Manager Users**      | X          | X           |              | X           | X            |               |               |                |                 |
| **Multipliers**        | X          | X           |              | X           |              |               |               |                |                 |
| **Operator**           | X          | X           |              |             |              |               |               |                |                 |
| **Racers Registry**    | X          | X           |              |             |              |               |               |                |                 |
| **Tickets**            | X          |             |              | X           |              |               | X             | X              |                 |
| **Users**              | X          | X           |              | X           | X            |               | X             | X              |                 |
| **User-Channel Links** | X          | X           | X            | X           | X            | X             | X             | X              | X               |
| **User Levels**        | X          |             |              | X           |              |               | X             |                |                 |
| **Video**              | X          |             |              |             |              |               |               |                |                 |
| **Video Metadata**     | X          | X           |              |             |              |               |               |                |                 |
| **Reports**            | X          |             |              | X           |              |               | X             |                |                 | X             |
| **Logs**               | X          | X           | X            | X           | X            | X             | X             | X              | X               |

### Home

The home page will be

- Card "Today Profits (Horses6 and Dogs6)"

  - This card shows the "Turnover"
  - This card shows the "Profit"
  - This card shows the "Shop Count"
    - -> TO BE DEFINED:
      - total shop count or
      - number of shops belonging to an operator.

- Charts for "Business Report"
  - User can select:
    - the game ("All", "Horses6", "Dogs6")
    - the start date for the query
    - the end date for the query
    -

## Accounting Implementation

### Routes

Route - /manager/accounting - GET (`AccountingRoute`)
Route - /manager/report - POST (`ReportRoute`)
Route - /manager/filter/shop/ - GET

### View

- Dashboard
- Users
- Ticket list
- Summary
- Viewers

### Controller

- AccountingController
- ExportController
- FrontendController
- ReportController
- UserController
- ViewerController

Sequence "
user opens page Accounting"

- clicks on Accounting
- navigate to AccountingRoute
- the system shows the AccountingView to the user

[UserWhoSurfsTheWeb] -> [AccountingView]: Browser GET
[AccountingView] -> [AccountingRoute]

```text

/manager/ac&counting?page=1&perPage=25&filter[gameProviders][]=pgvirtual

```

[AccountingRoute] -> [AccountingController]
[AccountingController] -> [ReportController]: getReport()
[ReportController] --> [AccountingController]: reportData
[AccountingController] --> [AccountingView]: fills the view

Sequence "API Report"
[UserWhoLovesAPI] -> [ReportRoute]: POST
POST `{ "type": "transaction", //? "limit": 0, // optional === ?perPage=25 from browser Get "chunk": 0, // optional === ?page=1 from the Browser Get "groupBy": [ "provider", "player" ], "filter": { "players": [2], "gameCategories": ["virtual"], "gameProviders": ["pgvirtual"] } }`
[ReportRoute] -> [ReportController]: getReportResponse()
[ReportController] -> [ReportController]: getReport()
[ReportController] -> [UserWhoLovesAPI]: return json api response

#### User Permission and features

|                             | Root       | Admin   | Support | Analyst |
| --------------------------- | ---------- | ------- | ------- | ------- |
| User Page                   | everything | ->      | ->      | ?       |
| User Edit                   | everything | ->      | ->      | ?       |
| User Update                 | everything | ->      | ->      | ?       |
| Reports Page                | everything | opertor | opertor | opertor |
| Reports - Summary Page      | everything | opertor | opertor | opertor |
| Reports - TicketList Page   | everything | opertor | opertor | opertor |
| Reports - transaction       | everything | opertor | opertor | opertor |
| Reports - summary           | everything | opertor | opertor | opertor |
| Reports - summary shops     | everything | opertor | opertor | opertor |
| Reports - transaction shops | everything | opertor | opertor | opertor |
| Reports - summary date      | everything | opertor | opertor | opertor |
| Reports - transaction Users | everything | opertor | opertor | opertor |
| Reports - summary users     | everything | opertor | opertor | opertor |
| Viewers Page                | X          | X       | X       | X       |
| Viewers Edit                | X          | X       | X       | X       |
| Viewers Add                 | X          | X       | X       | X       |
| Viewers Delete              | X          | X       | X       | X       |
| FAQ Page                    | X          | X       | X       | X       |
| FAQ-1                       | X          | X       | X       | X       |
| FAQ-2                       | X          | X       | X       | X       |
| FAQ-3                       | X          | X       | X       | X       |
| FAQ-4                       | X          | X       | X       | X       |
| FAQ-5                       | X          | X       | X       | X       |
| FAQ-6                       | X          | X       | X       | ?       |
| FAQ-7                       | X          | X       | X       | ?       |
| FAQ-8                       | X          | X       | X       | X       |
| FAQ-9                       | X          | X       | X       | X       |
| FAQ-10                      | X          | X       | X       | X       |

#### to be defined

- ? FAQ-10 is for selecting active users , while on dashbord data is for shops
- ? Analyst user permisions
- ? FAQ-11 is actually FAQ-10

#### missing from top table

- [] API Logs
- [] Channels
- [] Configurations
- [] Currencies
- [] Events
- [] Event Scheduling
- [] Games
- [] Languages
- [] Latecomers
- [x] Manager Users
- [] Multipliers
- [] Operator
- [] Racers Registry
- [x] Tickets
- [x] [?] Users
- [] User-Channel Links
- [x] User Levels
- [] Video
- [] Video Metadata
- [x] Reports
- [] Logs
-

#### Frequently asked questions (FAQ)

Its a list of questions that people often ask about a particular product or site on the internet and the answers to the questions.

1. Question

   - Title

     - How can I download a Weekly Report into a file that I can open with Excel ?

   - Description
     - Navigate to Dashboard page, select the desire week, then click Download button.

2. Question

   - Title
     - How can I create a new account for my colleague ?
   - Description
     - Navigate to User page. Click plus button

3. Question

   - Title
     - Where can I find the list of all the tickets placed by a shop?
   - Description
     - X

4. Question

   - Title
     - How can I check the status of a ticket?
   - Description
     - X

5. Question

   - Title
     - Where can I check if a viewer is properly working?
   - Description
     - X

6. Question

   - Title
     - How can i change the language of a viewer ?
   - Description
     - Viewer page you have to click on a viewer , it will open viewer edit
       as a side pannel then you can edit the language by slececting from
       Language drop down menu.

7. Question

   - Title
     - My colleague lost his password. How can he sign in again ?
   - Description
     - Navigating through the user page, shows where you can find your
       colleague and how you could change his data.

8. Question

   - Title
     - How to see the Report chart for in date range?
   - Description
     - Report chart displays the income , outcome and profit in selected
       date range

9. Question

   - Title
     - How to see the Report of today?
   - Description
     - Turnover, profit, active users

10. Question

    - Title
      - How can I see the active users in a specified timeframe ?
    - Description
      - Set a start date and an end date to see how many users played each day.

11. Question

    - Title
      - Active shops chart
    - Description
      - End to end explanation of Active shops chart
