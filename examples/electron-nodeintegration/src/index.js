const electron = require("electron");
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const path = require("node:path");
const url = require("node:url");

// Module to handle remote modules from the renderer thread.
const remoteMain = require("@electron/remote/main");

// Initialize the remote module package.
remoteMain.initialize();

// Make sure to enable access to the local file system. This is required
// in order to load PDF files and Nutrient dependencies from the local
// file system.
electron.protocol.registerSchemesAsPrivileged([
  { scheme: "file", privileges: { secure: true, standard: true } },
]);

// Output a readable error message, when the Nutrient Electron SDK dependency is
// missing.
require("./lib/require-nutrient");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      // Enables `require()` to import modules at runtime when running on Electron.
      contextIsolation: false,
      nodeIntegration: true,
    },
  });

  // Enable remote modules in the renderer process.
  remoteMain.enable(mainWindow.webContents);

  // and load the index.html of the app.
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "index.html"),
      protocol: "file:",
      slashes: true,
    }),
  );

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
