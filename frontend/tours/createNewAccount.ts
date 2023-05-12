const stepsCreateNewAccount = [
  {
    selector: "#sidemenu-users-button",
    content: "This is the first Step",
  },
  {
    stepInteraction: false,
  },
  {
    selector: ".p-panel__title",
    content: "This is the first Step",
  },
];
export default stepsCreateNewAccount;
// {
//   "startPage": "manager/faq",
//   "manager/faq": [
//     {
//       "element": "#sidemenu-user-button",
//       "position": "bottom",
//       "intro": "Go to User page",
//       "tooltipClass": "myTooltipClass",
//       "highlightClass": "myHighlightClass",
//       "goNextPage": "manager/users"
//     }
//   ],
//   "manager/users": [
//     {
//       "element": ".p-panel__title",
//       "position": "bottom",
//       "intro": "Welcome to User Page",
//       "tooltipClass": "myTooltipClass",
//       "highlightClass": "myHighlightClass"
//     },
//     {
//       "element": "#user-create-button",
//       "position": "left",
//       "intro": "Clicking on this button opens user create panel , after this step AsideBar shoud open so it can continue to others step",
//       "tooltipClass": "myTooltipClass",
//       "highlightClass": "myHighlightClass",
//       "openAsidePanel": "openUserCreatePanel",
//       "shouldTriggerClick": true
//     },
//     {
//       "element": "#user-create-form",
//       "position": "left",
//       "intro": "This is the user create panel form",
//       "tooltipClass": "myTooltipClass",
//       "highlightClass": "myHighlightClass"
//     },
//     {
//       "element": "#sidemenu-faq-button",
//       "position": "bottom",
//       "intro": "Go back to faq page",
//       "tooltipClass": "myTooltipClass",
//       "highlightClass": "myHighlightClass",
//       "goNextPage": "manager/faq?end"
//     }
//   ],
//   "manager/faq?end": [
//     {
//       "element": "#steps-create-new-account",
//       "position": "bottom",
//       "intro": "You just finished this tour ",
//       "tooltipClass": "myTooltipClass",
//       "highlightClass": "myHighlightClass"
//     }
//   ]
// }
