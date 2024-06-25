import { app, BrowserWindow } from "electron";
const path = require("path");

let mainWindow: BrowserWindow | null;

// createWindow creates the main window of the application
// and loads the index of the solid application and opens the dev tools
const createWindow = (): void => {
  mainWindow = new BrowserWindow({ width: 900, height: 680 });

  let isDev = true
  mainWindow.loadURL(
    isDev ?
      "http://localhost:4173" :
      `file://${path.join(__dirname, "../../dist/index.html")}`,
  );

  mainWindow.webContents.openDevTools();

  mainWindow.on("closed", () => (mainWindow = null));
};

// The following methods handle the creation of the app window
// and the closing of the application
app.on("ready", createWindow);

app.on("window-all-closed", () => {
  app.quit();
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
