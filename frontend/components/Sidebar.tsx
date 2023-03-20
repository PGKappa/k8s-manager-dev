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

const Sidebar = ({ showLogo }) => {
  const { user, logout } = useAuth({ middleware: "auth" }),
    { openAsidePanel } = useContext(AsidePanelContext),
    [isUserAccordionExpanded, setUserAccordionExpanded] =
      useState<boolean>(false),
    { isDarkMode, setDarkMode } = useContext(ThemeContext),
    { pathname } = useRouter(),
    { isCollapsed, toggle } = useContext(SidebarContext),
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
                        <Link href={"/manager"} legacyBehavior>
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
                      <li className="p-side-navigation__item l-fluid-breakout u-no-padding">
                        <Link href={"/manager/users"} legacyBehavior>
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
                      </li>
                      <li className="p-side-navigation__item l-fluid-breakout u-no-padding">
                        <Link href={"/manager/tickets"} legacyBehavior>
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
                        <Link href={"/manager/summary"} legacyBehavior>
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
                      <li className="p-side-navigation__item l-fluid-breakout u-no-padding">
                        <Link href={"/manager/viewers"} legacyBehavior>
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
                      </li>
                    </ul>
                    <ul className="p-side-navigation__list is-fading-when-collapsed">
                      <li className="p-side-navigation__item">
                        <p className="u-align-text--center">{version}</p>
                      </li>
                    </ul>
                  </nav>
                </div>

                {/* <div className="p-panel__header">
                  <aside className="p-accordion">
                    <ul className="p-accordion__list">
                      <li className="p-accordion__group ">
                        <div
                          role="heading"
                          className="p-accordion__heading "
                          onClick={() =>
                            setUserAccordionExpanded(!isUserAccordionExpanded)
                          }
                        >
                          <button
                            type="button"
                            className="p-accordion__tab"
                            id="owner"
                            aria-controls="owner-section"
                            aria-expanded={isUserAccordionExpanded}
                            onClick={() =>
                              setUserAccordionExpanded(!isUserAccordionExpanded)
                            }
                          >
                            <i className="p-icon--user is-light"></i>
                            <span>{user?.username}</span>
                          </button>
                        </div>
                        <section
                          className="p-accordion__panel"
                          id="owner-section"
                          aria-hidden={!isUserAccordionExpanded}
                          aria-labelledby="owner"
                        >
                          <span
                            onClick={() => {
                              openUserProfile(user);
                            }}
                          >
                            Profile
                          </span>
                        </section>

                        <section
                          className="p-accordion__panel"
                          id="owner-section"
                          aria-hidden={!isUserAccordionExpanded}
                          aria-labelledby="owner"
                        >
                          <Switch
                            label="Dark Mode"
                            onClick={() => toggleTheme(isDarkMode)}
                            aria-checked={isDarkMode}
                            // value={!isDarkMode}
                            defaultChecked={isDarkMode}
                          />
                        </section>

                        <section
                          className="p-accordion__panel"
                          id="owner-section"
                          aria-hidden={!isUserAccordionExpanded}
                          aria-labelledby="owner"
                        >
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
                        </section>
                      </li>
                    </ul>
                  </aside>
                </div> */}
                {/* <nav className="p-side-navigation--icons is-dark">
                  <ul className="p-side-navigation__list is-fading-when-collapsed">
                    <li
                      className="p-side-navigation__item"
                      id={"sidemenu-faq-button"}
                    >
                      <Link href={"/manager/faq"} legacyBehavior>
                        <a
                          onClick={() => onPageButtonClick("/faq")}
                          className="p-side-navigation__link"
                          {...(pathname == "/faq" && {
                            "aria-current": "page",
                          })}
                        >
                          <FaQuestionCircle className="is-light p-side-navigation__icon" />
                          <span className="p-side-navigation__label">FAQ</span>
                        </a>
                      </Link>
                    </li>
                  </ul>
                </nav> */}

                <div className="p-side-navigation--accordion " id="drawer">
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
                              Profile
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
                                Dark mode
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
                    </ul>
                  </nav>
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
