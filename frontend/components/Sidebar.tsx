import React, { useContext, useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Button, Icon, ICONS, Switch } from "@canonical/react-components";
import {
  FaHome,
  FaUsers,
  FaListAlt,
  FaTv,
  FaCashRegister,
  FaQuestionCircle,
} from "react-icons/fa";
import {
  AuthContext,
  SidebarContext,
  ThemeContext,
  TourContext,
  AsidePanelContext,
} from "@/context";
import { PanelUserProfile } from "@/components/panels";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/auth";
import { DictionaryContext, useTranslation } from "@pg-ui/i18n";

const Sidebar = ({ showLogo }) => {
  const { user, logout } = useAuth({ middleware: "auth" }),
    { openAsidePanel } = useContext(AsidePanelContext),
    [isUserAccordionExpanded, setUserAccordionExpanded] =
      useState<boolean>(false),
    [isLanguageAccordionExpanded, setLanguageAccordionExpanded] =
      useState<boolean>(false),
    { isDarkMode, setDarkMode } = useContext(ThemeContext),
    { pathname } = useRouter(),
    { isCollapsed, toggle } = useContext(SidebarContext),
    { t } = useTranslation(""),
    { language, setLanguage } = useContext(DictionaryContext),
    // { tour, startTour, stepIndex } = useContext(TourContext),
    version = process.env.FRONTEND_VERSION;

  function onPageButtonClick(path: string) {
    if (!isCollapsed) {
      toggle();
    }
    // if (tour.tourActive) {
    //     startTour({
    //         run: false,
    //         tourActive: false,
    //         stepIndex: 0,
    //         steps: [],
    //     });
    //     console.log("before slice", tour.steps ,"sliced toursteps " , tour.steps.slice(1), " after slice " , tour.steps)
    //   setTimeout(() => {

    //     startTour({
    //       run: true,
    //       steps: tour.steps.slice(1),
    //       tourActive: true,
    //       stepIndex: tour.stepIndex -1 ,
    //     });
    //   }, 800);
    // }
  }

  const langs = [
    { shortCode: "EN", label: "English", icon: "manager/img/flags/en.png" },
    { shortCode: "IT", label: "Italiano", icon: "manager/img/flags/it.png" },
  ];

  function getOptions(langs, selectedLanguage) {
    return langs.map(({ shortCode, label, icon }, idx) => {
      if (shortCode == selectedLanguage) return;
      return (
        <li key={idx} className="p-side-navigation__item">
          <a
            className="p-side-navigation__link"
            onClick={() => {
              setLanguage(shortCode);
            }}
          >
            <span className="u-has-icon" style={{ color: "white" }}>
              {/* <img
                style={{ marginRight: "5px" }}
                width="25"
                height="25"
                src={icon}
              /> */}
              {label}
            </span>
          </a>
        </li>
      );
    });
  }

  const toggleTheme = () => {
    const value = isDarkMode;
    if (value == false) {
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", true);
      }
      setDarkMode(true);
    } else {
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", false);
      }
      setDarkMode(false);
    }
  };

  const updateUser = useCallback(() => {
    console.log("updating profile and kuberneting ");
    return true;
  }, []);

  const openUserProfile = useCallback((user) => {
    console.log("yoooo its me userrr in sidebar", user);
    openAsidePanel({
      isOpen: true,
      title: "Profile",
      content: <PanelUserProfile user={user} updateUser={updateUser} />,
    });
  }, []);

  return (
    <>
      <div className="l-navigation-bar ">
        <div className="p-panel is-dark">
          <div className="p-panel__header">
            {showLogo == "true" && (
              <Link href={"/"} legacyBehavior>
                <a className={`p-panel__logo ${showLogo}`}>
                  <img
                    className="p-panel__logo-icon"
                    src="https://marketing.pg.company/cdn1/pgvirtual-blue.png"
                    style={{ height: "1.5rem" }}
                    alt="PGVirtual logo"
                  />
                </a>
              </Link>
            )}
            <div className="p-panel__controls">
              <Button hasIcon onClick={toggle} className="u-hide--medium">
                <Icon name={ICONS.menu} />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <header
        className={
          "l-navigation is-dark " + (isCollapsed ? "is-collapsed" : "")
        }
      >
        {(!isCollapsed || true) && (
          <>
            <div className="l-navigation__drawer sidebar p-side-navigation--accordion">
              <div className="p-panel">
                <div className="p-panel__header">
                  {showLogo == "true" ||
                    (showLogo == true && (
                      <a className={`p-panel__logo ${showLogo}`} href="#">
                        <img
                          className="p-navigation__image"
                          src="https://marketing.pg.company/cdn1/pgvirtual-blue.png"
                          style={{ height: "1.5rem" }}
                          alt="PG Virtual logo"
                        />
                      </a>
                    ))}

                  <div className="p-panel__controls u-hide--large">
                    <Button
                      hasIcon
                      onClick={(e) => {
                        if (!isCollapsed) {
                          toggle();
                        }
                        e.target.blur();
                      }}
                      appearance="base"
                      className="u-hide--medium u-no-margin"
                    >
                      <Icon name={ICONS.close} />
                    </Button>
                  </div>
                </div>

                <div className="p-panel__content">
                  <nav
                    className="p-side-navigation--icons is-dark"
                    aria-label="Main"
                  >
                    <ul className="p-side-navigation__list">
                      <li
                        className="p-side-navigation__item l-fluid-breakout u-no-padding"
                        id={"sidemenu-dashboard-button"}
                      >
                        <Link href={"/"} legacyBehavior>
                          <a
                            onClick={() => {
                              onPageButtonClick("/");
                            }}
                            className="p-side-navigation__link"
                            {...((pathname == "/" || pathname == "/") && {
                              "aria-current": "page",
                            })}
                          >
                            <FaHome className="is-light p-side-navigation__icon" />
                            <span className="p-side-navigation__label">
                              Dashboard
                            </span>
                          </a>
                        </Link>
                      </li>
                      {/* <li className="p-side-navigation__item l-fluid-breakout u-no-padding">
                        <Link href={"/users"} legacyBehavior>
                          <a
                            id={"sidemenu-user-button"}
                            onClick={() => onPageButtonClick("/users")}
                            className="p-side-navigation__link"
                            {...(pathname == "/users" && {
                              "aria-current": "page",
                            })}
                          >
                            <FaUsers className="is-light p-side-navigation__icon" />
                            <span className="p-side-navigation__label">
                              Users
                            </span>
                          </a>
                        </Link>
                      </li>*/}
                      <li className="p-side-navigation__item l-fluid-breakout u-no-padding">
                        <Link href={"/tickets"} legacyBehavior>
                          <a
                            id={"sidemenu-ticketlist-button"}
                            onClick={() => onPageButtonClick("/tickets")}
                            className="p-side-navigation__link"
                            {...(pathname == "/tickets" && {
                              "aria-current": "page",
                            })}
                          >
                            <FaListAlt className="is-light p-side-navigation__icon" />
                            <span className="p-side-navigation__label">
                              Ticket List
                            </span>
                          </a>
                        </Link>
                      </li>
                      <li className="p-side-navigation__item l-fluid-breakout u-no-padding">
                        <Link href={"/summary"} legacyBehavior>
                          <a
                            id={"sidemenu-ticketsummary-button"}
                            onClick={() => onPageButtonClick("/summary")}
                            className="p-side-navigation__link"
                            {...(pathname == "/summary" && {
                              "aria-current": "page",
                            })}
                          >
                            <FaCashRegister className="is-light p-side-navigation__icon" />
                            <span className="p-side-navigation__label">
                              Summary
                            </span>
                          </a>
                        </Link>
                      </li>
                      {/* <li className="p-side-navigation__item l-fluid-breakout u-no-padding">
                        <Link href={"/viewers"} legacyBehavior>
                          <a
                            id={"sidemenu-viewers-button"}
                            onClick={() => onPageButtonClick("/viewers")}
                            className="p-side-navigation__link"
                            {...(pathname == "/viewers" && {
                              "aria-current": "page",
                            })}
                          >
                            <FaTv className="is-light p-side-navigation__icon" />
                            <span className="p-side-navigation__label">
                              Viewers
                            </span>
                          </a>
                        </Link>
                      </li> */}
                    </ul>

                    <ul className="p-side-navigation__list is-fading-when-collapsed">
                      <li className="p-side-navigation__item">
                        <p className="u-align-text--center">{version}</p>
                      </li>
                    </ul>
                  </nav>
                </div>

                <div className="p-side-navigation--accordion " id="user">
                  <nav
                    // className="p-side-navigation__drawer"
                    aria-label=""
                    style={{
                      backgroundColor: "#12324a",
                      color: "white",
                    }}
                  >
                    <ul className="p-side-navigation__list">
                      <li className="p-side-navigation__item">
                        <button
                          className="p-side-navigation__accordion-button"
                          aria-expanded={isUserAccordionExpanded}
                          onClick={() =>
                            setUserAccordionExpanded(!isUserAccordionExpanded)
                          }
                        >
                          <span className="u-has-icon">
                            <i className="p-icon--user is-light"></i>
                            {user?.username}
                          </span>
                        </button>
                        <ul
                          className="p-side-navigation__list"
                          aria-expanded={isUserAccordionExpanded}
                        >
                          <li className="p-side-navigation__item">
                            {/* <a className="p-side-navigation__link" href="#"> */}
                            <span
                              className="p-side-navigation__link"
                              onClick={() => {
                                openUserProfile(user);
                              }}
                              style={{
                                color: "white",
                              }}
                            >
                              {t("sidebar.profile")}
                            </span>
                            {/* </a> */}
                          </li>
                          <li className="p-side-navigation__item">
                            <label className="p-switch  p-side-navigation__link">
                              <input
                                type="checkbox"
                                className="p-switch__input"
                                // checked=""
                                role="switch"
                                onChange={() => toggleTheme(isDarkMode)}
                                defaultChecked={isDarkMode}
                                // checked={isDarkMode}
                              />
                              <span className="p-switch__slider"></span>
                              <span
                                className="p-switch__label"
                                style={{
                                  color: "white",
                                }}
                              >
                                {t("dark_mode")}
                              </span>
                            </label>
                          </li>
                          <li className="p-side-navigation__item">
                            <a className="p-side-navigation__link">
                              <Button
                                style={
                                  isDarkMode
                                    ? {
                                        color: "white",
                                      }
                                    : {
                                        color: "black",
                                      }
                                }
                                className={isDarkMode ? "is-dark" : ""}
                                onClick={() => {
                                  //   logoutRequest({ username, token });
                                  logout();
                                }}
                                // value={isDarkMode}
                                hasIcon={true}
                              >
                                <i className="p-icon--power-off"></i>
                                <span>Logout</span>
                              </Button>
                            </a>
                          </li>
                        </ul>
                      </li>
                      {/* locale start */}
                       <li className="p-side-navigation__item">
                        <span>English</span>
                        {/* <button
                          className="p-side-navigation__accordion-button"
                          aria-expanded={isLanguageAccordionExpanded}
                          onClick={() =>
                            setLanguageAccordionExpanded(
                              !isLanguageAccordionExpanded
                            )
                          }
                        >
                          <span className="u-has-icon">
                            <i className="p-icon--user is-light"></i> 
                            <img
                              width="25"
                              height="25"
                              style={{ marginRight: "5px" }}
                              src={`/manager/img/flags/${language.toLowerCase()}.png`}
                            />
                            {language == "EN" ? "English" : "Italian"}
                          </span>
                        </button>
                        <ul
                          className="p-side-navigation__list"
                          aria-expanded={isLanguageAccordionExpanded}
                        >
                          {getOptions(langs, language)}
                        </ul> */}
                      </li>
                      {/* locale end */}
                    </ul>
                  </nav>
                  {user?.level === "root" && (
                    <nav
                      className="p-side-navigation--icons is-dark"
                      aria-label="Main"
                    >
                      <ul className="p-side-navigation__list">
                        <li className="p-side-navigation__item l-fluid-breakout u-no-padding">
                          <Link href={"/faq"} legacyBehavior>
                            <a
                              id={"sidemenu-faq-button"}
                              onClick={() => onPageButtonClick("/faq")}
                              className="p-side-navigation__link"
                              {...(pathname == "/faq" && {
                                "aria-current": "page",
                              })}
                            >
                              <FaQuestionCircle className="is-light p-side-navigation__icon" />
                              <span className="p-side-navigation__label">
                                ROOT FAQ
                              </span>
                            </a>
                          </Link>
                        </li>
                      </ul>
                    </nav>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </header>
    </>
  );
};

export default Sidebar;
