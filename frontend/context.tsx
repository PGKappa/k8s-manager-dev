import React, { createContext, useState, useMemo, useContext } from "react";

interface IAuthContext {
  username: string;
  logged: boolean;
  token: string;
}

export const AuthContext = createContext<IAuthContext>({});

interface IThemeContext {
  isDarkMode: boolean;
  showLogo: boolean;
  setShowLogo: (value : string) => void;
}

export const ThemeContext = createContext<IThemeContext>({});
interface IAsidePanelContext {
  isOpen: boolean;
  openAsidePanel: (args: {
    // isOpen: boolean;
    title: string;
    // showHeader?:boolean;
    content: React.ReactNode;
  }) => void;
  closeAsidePanel: () => void;
}
export const AsidePanelContext = createContext<IAsidePanelContext>({
  isOpen: false,
  openAsidePanel: () => {},
  closeAsidePanel: () => {},
});

interface ISideBarContext {}
export const SidebarContext = createContext<ISideBarContext>({});

interface ITourContext {
  tour: {
    run: false;
    stepIndex: 0;
    steps: [];
    tourActive: false;
  };
  startTour: (args: {
    run: boolean;
    stepIndex?: number;
    steps?: {}[];
    tourActive?: boolean;
  }) => void;
}

export const TourContext = createContext<ITourContext>({});
