import { createSlice } from "@reduxjs/toolkit";
import themeConfig from "@/configs/themeConfig";

const isBrowser = typeof window !== "undefined";

const initialDarkMode = () => {
  if (isBrowser) {
    const item = window.localStorage.getItem("darkMode");
    return item ? JSON.parse(item) : themeConfig.layout.darkMode;
  }
  return themeConfig.layout.darkMode;
};

const initialSidebarCollapsed = () => {
  if (isBrowser) {
    const item = window.localStorage.getItem("sidebarCollapsed");
    return item ? JSON.parse(item) : themeConfig.layout.menu.isCollapsed;
  }
  return themeConfig.layout.menu.isCollapsed;
};

const initialSemiDarkMode = () => {
  if (isBrowser) {
    const item = window.localStorage.getItem("semiDarkMode");
    return item ? JSON.parse(item) : themeConfig.layout.semiDarkMode;
  }
  return themeConfig.layout.semiDarkMode;
};

const initialRtl = () => {
  if (isBrowser) {
    const item = window.localStorage.getItem("direction");
    return item ? JSON.parse(item) : themeConfig.layout.isRTL;
  }
  return themeConfig.layout.isRTL;
};

const initialSkin = () => {
  if (isBrowser) {
    const item = window.localStorage.getItem("skin");
    return item ? JSON.parse(item) : themeConfig.layout.skin;
  }
  return themeConfig.layout.skin;
};

const initialType = () => {
  if (isBrowser) {
    const item = window.localStorage.getItem("type");
    return item ? JSON.parse(item) : themeConfig.layout.type;
  }
  return themeConfig.layout.type;
};

const initialMonochrome = () => {
  if (isBrowser) {
    const item = window.localStorage.getItem("monochrome");
    return item ? JSON.parse(item) : themeConfig.layout.isMonochrome;
  }
  return themeConfig.layout.isMonochrome;
};

const initialState = {
  isRTL: initialRtl(),
  darkMode: initialDarkMode(),
  isCollapsed: initialSidebarCollapsed(),
  customizer: themeConfig.layout.customizer,
  semiDarkMode: initialSemiDarkMode(),
  skin: initialSkin(),
  contentWidth: themeConfig.layout.contentWidth,
  type: initialType(),
  menuHidden: themeConfig.layout.menu.isHidden,
  navBarType: themeConfig.layout.navBarType,
  footerType: themeConfig.layout.footerType,
  mobileMenu: themeConfig.layout.mobileMenu,
  isMonochrome: initialMonochrome(),
};

export const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    handleDarkMode: (state, action) => {
      state.darkMode = action.payload;
      if (isBrowser) {
        window.localStorage.setItem("darkMode", action.payload);
      }
    },
    handleSidebarCollapsed: (state, action) => {
      state.isCollapsed = action.payload;
      if (isBrowser) {
        window.localStorage.setItem("sidebarCollapsed", action.payload);
      }
    },
    handleCustomizer: (state, action) => {
      state.customizer = action.payload;
    },
    handleSemiDarkMode: (state, action) => {
      state.semiDarkMode = action.payload;
      if (isBrowser) {
        window.localStorage.setItem("semiDarkMode", action.payload);
      }
    },
    handleRtl: (state, action) => {
      state.isRTL = action.payload;
      if (isBrowser) {
        window.localStorage.setItem("direction", JSON.stringify(action.payload));
      }
    },
    handleSkin: (state, action) => {
      state.skin = action.payload;
      if (isBrowser) {
        window.localStorage.setItem("skin", JSON.stringify(action.payload));
      }
    },
    handleContentWidth: (state, action) => {
      state.contentWidth = action.payload;
    },
    handleType: (state, action) => {
      state.type = action.payload;
      if (isBrowser) {
        window.localStorage.setItem("type", JSON.stringify(action.payload));
      }
    },
    handleMenuHidden: (state, action) => {
      state.menuHidden = action.payload;
    },
    handleNavBarType: (state, action) => {
      state.navBarType = action.payload;
    },
    handleFooterType: (state, action) => {
      state.footerType = action.payload;
    },
    handleMobileMenu: (state, action) => {
      state.mobileMenu = action.payload;
    },
    handleMonoChrome: (state, action) => {
      state.isMonochrome = action.payload;
      if (isBrowser) {
        window.localStorage.setItem("monochrome", JSON.stringify(action.payload));
      }
    },
  },
});

export const {
  handleDarkMode,
  handleSidebarCollapsed,
  handleCustomizer,
  handleSemiDarkMode,
  handleRtl,
  handleSkin,
  handleContentWidth,
  handleType,
  handleMenuHidden,
  handleNavBarType,
  handleFooterType,
  handleMobileMenu,
  handleMonoChrome,
} = layoutSlice.actions;

export default layoutSlice.reducer;
