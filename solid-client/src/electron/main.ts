import {
  app,
  BrowserWindow,
  desktopCapturer,
  DesktopCapturerSource,
  ipcMain,
} from "electron";
const path = require("node:path");

let mainWindow: BrowserWindow | null;

// getAvailableWindows will return all the data of the open windows in
// the host's pc
const getAvailableWindows = async (): Promise<DesktopCapturerSource[]> => {
  const sources = await desktopCapturer.getSources({ types: ["window"] });
  return sources;
};

// createWindow creates the main window of the application
// and loads the index of the solid application and opens the dev tools
const createWindow = (): void => {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  let isDev = false;
  mainWindow.loadURL(
    isDev
      ? "http://localhost:4173"
      : `file://${path.join(__dirname, "../../dist/index.html")}`,
  );

  mainWindow.webContents.openDevTools();

  mainWindow.on("closed", () => (mainWindow = null));
};

// The following methods handle the creation of the app window
// and the closing of the application
app.on("ready", () => {
  ipcMain.handle("getWindows", getAvailableWindows);
  createWindow();
});

app.on("window-all-closed", () => {
  app.quit();
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
