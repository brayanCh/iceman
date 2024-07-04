import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("capture", {
  getAvailableWindows: () => ipcRenderer.invoke("getWindows"),
});
