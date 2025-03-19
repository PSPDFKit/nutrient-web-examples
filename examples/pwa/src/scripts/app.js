// @ts-check

/**
 * Main application file. It contains the logic to:
 *
 * - Delete the PDF stored in IndexedDB and clear the ServiceWorker.
 * - Open PDF via URL or file picker and load them with Nutrient Web SDK.
 * - Manage the loaded PDF file list.
 * - Display application online status.
 */
(() => {
  /**
   * @param {string} selector
   * @returns {Element | null}
   */
  function $(selector) {
    return document.querySelector(selector);
  }

  /**
   * @param {string} selector
   * @returns {NodeListOf<Element>}
   */
  function $$(selector) {
    return document.querySelectorAll(selector);
  }

  const thumbnailRenderedWidth = 160;

  /**
   * Menu to manage PDF files and load new ones.
   * ===========================================
   */

  // Online status indicator. This will show an indicator if we're online or
  // not.
  const statusContainer = $("#online-status");

  function updateOnlineStatus() {
    statusContainer.textContent = navigator.onLine ? "online" : "offline";

    if (navigator.onLine) {
      statusContainer.textContent = "online";
      statusContainer.className = "online-status online-status--online";
    } else {
      statusContainer.textContent = "offline";
      statusContainer.className = "online-status";
    }
  }

  window.addEventListener("online", updateOnlineStatus);
  window.addEventListener("offline", updateOnlineStatus);
  updateOnlineStatus();

  /**
   * Menu: FilePicker that uses the FileReader Web API to load a PDF document as
   * ArrayBuffer from the local hard drive.
   */
  $("#file-picker-input").addEventListener("change", (event) => {
    if (event.target.files.length === 0) {
      event.target.value = null;

      return;
    }

    const pdfFile = event.target.files[0];

    if (
      pdfFile.type !== "application/pdf" &&
      // Looks like IE11 doesn't set the type
      !(pdfFile.type === "" && pdfFile.name.endsWith(".pdf"))
    ) {
      alert("Invalid file type, please load a PDF.");

      return;
    }

    const reader = new FileReader();
    reader.addEventListener("load", (event) => {
      const pdfBuffer = event.target.result;
      window.history.pushState(
        { filename: pdfFile.name },
        null,
        `${window.location.pathname}?file=${encodeURIComponent(pdfFile.name)}`,
      );

      loadArrayBuffer(pdfBuffer, pdfFile.name);
    });

    reader.addEventListener("error", (error) => {
      alert(error.message);
    });

    reader.readAsArrayBuffer(pdfFile);
    event.target.value = null;
  });

  $("#hide-sidebar").addEventListener("click", hideSidebar);

  /**
   * Menu: Download a remote file using a provided URL.
   */
  $("#download-remote").addEventListener("click", (event) => {
    event.preventDefault();
    const url = $("#url-picker-input").value;
    const segments = url.split("/");
    const filename = segments[segments.length - 1];
    openPDF(filename, url);
  });

  /**
   * Clear files and (unregister) service workers controls.
   */
  $("#clear-service-worker").addEventListener("click", (e) => {
    e.preventDefault();

    // Unregister all the Service Workers.
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .getRegistrations()
        .then((registrations) => {
          for (const registration of registrations) {
            registration.unregister();
          }
        })
        .then(() => {
          alert("All service workers unregistered.");
        });
    }
  });

  $("#delete-files").addEventListener("click", (e) => {
    e.preventDefault();

    // Clear the IndexedDB-based PDF store.
    NutrientFileStore.listAll().then((files) => {
      $("#files-list").innerHTML = "";
      Promise.all(
        files.map((filename) => NutrientFileStore.delete(filename)),
      ).then(() => {
        window.history.replaceState(null, "", window.location.pathname);
      });
    });
  });

  /**
   * List stored files.
   */
  function renderFileList() {
    const filesList = $("#files-list");
    filesList.innerHTML = "";

    let filenames;
    NutrientFileStore.listAll()
      .then((result) => {
        filenames = result;
        filenames.sort();

        return Promise.all(
          filenames.map((filename) => NutrientFileStore.get(filename)),
        );
      })
      .then((files) => files.map((file, index) => [filenames[index], file]))
      .then((filenameFiles) =>
        filenameFiles.map((filenameFile) =>
          renderFileItem(filenameFile[0], filenameFile[1]),
        ),
      )
      .then((renderedItems) => {
        for (const item of renderedItems) {
          filesList.appendChild(item);
        }
      });
  }

  renderFileList();

  // Simpler helper that, given a filename, generates the HTML for the files
  // manager list.
  function renderFileItem(filename, file) {
    const fileEntry = document.createElement("div");
    fileEntry.classList.add("files-list__file");

    const thumbnailData = file.thumbnailData;

    const anchor = document.createElement("a");
    anchor.classList.add("files-list__file-anchor");
    anchor.href = `?file=${encodeURIComponent(filename)}`;

    const pageWidth = thumbnailData.width;
    const pageHeight = thumbnailData.height;
    const width = thumbnailRenderedWidth;
    const height = Math.round((width * pageHeight) / pageWidth);

    const canvas = document.createElement("canvas");
    canvas.classList.add("files-list__file-thumbnail");
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = `${width / 2}px`;
    canvas.style.height = `${height / 2}px`;
    const imageView = new Uint8Array(thumbnailData.buffer);
    const ctx = canvas.getContext("2d");
    const imageData = ctx.createImageData(width, height);
    imageData.data.set(imageView);
    ctx.putImageData(imageData, 0, 0);

    anchor.appendChild(canvas);

    const removeButton = document.createElement("button");
    removeButton.classList.add("files-list__file-remove");
    removeButton.textContent = "✕";
    removeButton.dataset.file = btoa(filename);

    anchor.appendChild(removeButton);

    const label = document.createElement("span");
    label.classList.add("files-list__file-label");
    let readableName = filename;

    if (/https?:\/\//.test(filename)) {
      readableName = `/${readableName.split("/").slice(3).join("/")}`;
    }

    label.textContent = readableName;

    fileEntry.appendChild(anchor);
    fileEntry.appendChild(label);

    return fileEntry;
  }

  /**
   * We're using the history API to update the URL when selecting a document.
   */

  // Handles clicks on the file list items (also clicks to the delete button).
  $(".files-list").addEventListener("click", (e) => {
    e.preventDefault();

    const source = e.target.tagName.toLowerCase();
    let filename = null;

    // Open a document.
    if (source === "a") {
      filename = decodeURIComponent(e.target.href.split("=")[1]);
      window.history.pushState({ filename: filename }, "", e.target.href);
      openPDF(filename);
    }

    // Delete a document.
    if (source === "button") {
      filename = atob(e.target.dataset.file);

      // Remove the file from the store.
      NutrientFileStore.delete(filename)
        .then(() => {
          renderFileList();
        })
        .catch((e) => {
          alert(`An error occurred while deleting the file:\n${e.message}`);
        });
    }
  });

  // Handles initial load, by grabbing the file to load from the URL when
  // defined. If none is defined, it will add the example PDF from the  src/
  // folder.
  //
  // Example: /?file=example.pdf
  window.addEventListener("load", () => {
    let filename = window.location.search.match(/file=([^&#]+)/i);
    let url;

    if (!filename || filename.length < 2) {
      url = "./assets/example.pdf";
      filename = "example.pdf";
    } else {
      filename = url = decodeURIComponent(filename[1]);
    }

    window.history.replaceState(
      { filename: filename },
      "",
      window.location.pathname + window.location.search,
    );

    openPDF(filename, url);
  });

  // Handles URL changes.
  window.addEventListener("popstate", (e) => {
    const filename = (e.state?.filename || "").trim();

    if (filename) {
      openPDF(filename);
    }
  });

  /**
   * openPDF, load and unload helpers.
   */

  /**
   * Given a filename and an optional URL, we try to open it from the local
   * NutrientFileStore first.
   * If the file is not found, we then tries to fetch it from the network using
   * the URL and and store the file locally.
   *
   * @param {string} filename
   * @param {string} url
   */
  function openPDF(filename, url) {
    // Try to get the file from the IndexedDB store.
    NutrientFileStore.get(filename)
      .then((file) => {
        const pdfBuffer = file.pdfBuffer;

        // The store returns `undefined` when it cannot find a file.
        if (pdfBuffer == null) {
          throw new Error(`${filename} not found`);
        }

        // If the file is found we load it.
        console.log(`Opening ${filename} from local store.`);
        loadArrayBuffer(pdfBuffer, filename, false);
      })
      .catch((error) => {
        // We only try to load the file from network if a URL is provided.
        if (!url) {
          throw error;
        }

        // We attempt to download it from network
        console.log(`Fetching ${filename} from network. (${url})`);

        return fetch(url)
          .then((response) => {
            if (response.status === 200 || response.status === 304) {
              return response.arrayBuffer();
            }

            // 404 or other errors.
            throw new Error(`${response.status} ${response.statusText}`);
          })
          .then((pdfBuffer) => {
            //SAVE
            loadArrayBuffer(pdfBuffer, filename);
          })
          .catch((error) => {
            console.error(error);
            alert(
              `An error occurred while fetching the file:\n${error.message}`,
            );
          });
      })
      .catch((error) => {
        console.error(error);
        alert(`An error occurred while fetching the file:\n${error.message}`);
      });
  }

  /**
   * Loads a pdf in ArrayBuffer format. Also make sure that any existing
   * instance is unloaded first, and any previous loading operation is complete.
   */

  // Keep track of the current load promise.
  let loadPromise = Promise.resolve();
  // Keep a reference to the Nutrient instance.
  let nutrientInstance = null;
  // We want to fetch the license only once so we requesting it for the first time
  // we save the promise returned by fetch("./config/license-key")
  let licenseKeyPromise = null;
  // Keep track of unsaved changes so that we can ask to save before unloading an instance.
  let hasUnsavedChanges = false;

  /**
   * Loads a PDF ArrayBuffer using Nutrient Web SDK.
   *
   * @param {ArrayBuffer} pdfBuffer
   * @param {string} filename
   */
  function loadArrayBuffer(pdfBuffer, filename, storeLocally) {
    if (storeLocally === undefined) {
      // biome-ignore lint/style/noParameterAssign: <explanation>
      storeLocally = true;
    }

    const pdfBufferCopy = pdfBuffer.slice(0);

    // We wait for any potential ongoing PDF loading.
    loadPromise.then(() => {
      // Unload an existing pdf if any.
      const unloadPromise = nutrientInstance ? unload() : Promise.resolve();

      unloadPromise.then(() => {
        // Fetch the Nutrient Web SDK license.
        if (!licenseKeyPromise) {
          licenseKeyPromise = fetch("./config/license-key")
            .then((response) => response.text())
            .catch((error) => {
              licenseKeyPromise = null;
              console.error(error);
            });
        }

        // Once we have the license key we can finally load Nutrient.
        licenseKeyPromise.then((licenseKey) => {
          loadPromise = Nutrient.load({
            container: $("#pspdf-container"),
            document: pdfBuffer,
            licenseKey: licenseKey.trim().length > 0 ? licenseKey : null,
            // We need to enable this to store the stylesheets loaded by Nutrient Web SDK in the
            // localStorage, otherwise those requests would be bypassed.
            toolbarItems: Nutrient.defaultToolbarItems.concat([
              { type: "cloudy-rectangle", dropdownGroup: "shapes" },
              { type: "dashed-rectangle", dropdownGroup: "shapes" },
              { type: "cloudy-ellipse", dropdownGroup: "shapes" },
              { type: "dashed-ellipse", dropdownGroup: "shapes" },
              { type: "dashed-polygon", dropdownGroup: "shapes" },
              { type: "content-editor", dropdownGroup: "editor" },
              { type: "form-creator", dropdownGroup: "editor" },
              { type: "measure", dropdownGroup: "editor" },
              { type: "document-comparison", dropdownGroup: "editor" },
            ]),
            enableServiceWorkerSupport: true,
          })
            .then((instance) => {
              hasUnsavedChanges = false;

              // We store the current filename with the instance so we can
              // save to the proper file when unloading.
              instance.filename = filename;

              // Monitor changes to the document so that we can prompt to save before unloading.
              instance.addEventListener("annotations.change", createOnChange());
              instance.addEventListener(
                "formFieldValues.update",
                createOnChange(),
              );

              window.nutrientInstance = nutrientInstance = instance;

              if (storeLocally) {
                const pageInfo = instance.pageInfoForIndex(0);

                return instance
                  .renderPageAsArrayBuffer({ width: thumbnailRenderedWidth }, 0)
                  .then((thumbnailBuffer) => {
                    // Save the PDF to the IndexedDB store.
                    NutrientFileStore.set(filename, pdfBufferCopy, {
                      width: pageInfo.width,
                      height: pageInfo.height,
                      buffer: thumbnailBuffer,
                    }).catch((error) => {
                      console.warn(
                        `An error occurred while saving the file. ${error.message}`,
                      );
                    });
                  })
                  .then(() => {
                    // Re-render the files list
                    renderFileList();
                  });
              }
            })
            .catch((e) => {
              console.error(e);
              nutrientInstance = null;
              hasUnsavedChanges = false;
            });
        });
      });
    });
  }

  /**
   * Sidebar logic
   */
  const html = $("html");
  const sidebar = $(".sidebar");
  const sidebarLinks = $$(".sidebar a");
  const sidebarToggleButton = document.getElementById("sidebar-toggle");

  function showSidebar() {
    html.classList.add("root--sidebar-visible");
    localStorage.setItem("sidebarVisible", true);
    for (const link of sidebarLinks) {
      link.setAttribute("tabIndex", 0);
    }
    sidebarToggleButton.setAttribute("aria-expanded", true);
    sidebar.setAttribute("aria-hidden", false);
  }

  function hideSidebar() {
    html.classList.remove("root--sidebar-visible");
    localStorage.setItem("sidebarVisible", false);
    for (const link of sidebarLinks) {
      link.setAttribute("tabIndex", -1);
    }
    sidebarToggleButton.setAttribute("aria-expanded", false);
    sidebar.setAttribute("aria-hidden", true);
  }

  sidebarToggleButton.addEventListener("click", () => {
    if (html.classList.contains("root--sidebar-visible")) {
      hideSidebar();
    } else {
      showSidebar();
    }
  });

  // Apply ARIA attributes for the default sidebar state
  const isSidebarVisible = sidebar.classList.contains("root--sidebar-visible");
  sidebarToggleButton.setAttribute("aria-expanded", isSidebarVisible);
  sidebar.setAttribute("aria-hidden", !isSidebarVisible);
  for (const link of Array.from($$("#sidebar a"))) {
    link.setAttribute("tabIndex", isSidebarVisible ? 0 : -1);
  }

  /**
   * Drag and drop files
   */
  const dndArea = $("#dnd-area");
  dndArea.addEventListener("dragover", (event) => {
    dndArea.classList.add("dnd-area--engaged");
    event.preventDefault();
  });

  function handleDragExit() {
    dndArea.classList.remove("dnd-area--engaged");
  }

  dndArea.addEventListener("dragexit", handleDragExit);
  dndArea.addEventListener("dragleave", handleDragExit);

  dndArea.addEventListener(
    "drop",

    /**
     * @param {DragEvent} event
     */
    (event) => {
      dndArea.classList.remove("dnd-area--engaged");

      event.preventDefault();

      const files = event.dataTransfer.files;

      if (files.length === 0) {
        console.log("No files uploaded.");

        return;
      }

      const file = files[0];

      if (file.type !== "application/pdf") {
        console.log(`File type must be application/pdf. (got ${file.type})`);

        return;
      }

      console.log("Got valid file", file);

      const reader = new FileReader();
      reader.addEventListener("load", (event) => {
        const pdfBuffer = event.target.result;

        window.history.pushState(
          { filename: file.name },
          null,
          `${window.location.pathname}?file=${encodeURIComponent(file.name)}`,
        );

        loadArrayBuffer(pdfBuffer, file.name);
      });

      reader.readAsArrayBuffer(file);
    },
  );

  /**
   * Little helper to monitor changes to annotations and form fields.
   */
  function createOnChange() {
    let initialized = false;

    return () => {
      if (initialized) {
        hasUnsavedChanges = true;
      } else {
        initialized = true;
      }
    };
  }

  /**
   * Unload helper.
   *
   * Checks whether there are unsaved changes before unloading Nutrient.
   * When that's the case it saves the PDF to the IndexedDB store in two steps:
   *
   *  1. Uses the Instance#exportPDF() to export the current version of the PDF
   *     to ArrayBuffer.
   *  2. Tries to save this PDF as ArrayBuffer in IndexedDB with
   *     NutrientFileStore.set(filename, file)
   *
   * After this operation calls Nutrient.unload(nutrientInstance) to unload the
   * current instance.
   */
  function unload() {
    if (!nutrientInstance) {
      return;
    }

    console.log("unload", nutrientInstance.filename);
    const filename = nutrientInstance.filename;

    // If there are no changes `unsavedChangesPromise` will resolve immediately.
    let unsavedChangesPromise = Promise.resolve();

    // In case there are unsaved changes, try to save the PDF to the store.
    if (
      hasUnsavedChanges &&
      window.confirm(
        "You have unsaved changes. Do you want to save the document?",
      )
    ) {
      unsavedChangesPromise = new Promise((resolve) => {
        // We use Nutrient's Instance#exportPDF() method to export the PDF to
        // an ArrayBuffer.
        Promise.all([
          nutrientInstance.exportPDF(),
          nutrientInstance.renderPageAsArrayBuffer(
            { width: thumbnailRenderedWidth },
            0,
          ),
        ])
          .then((results) => {
            const pdfBuffer = results[0];
            const thumbnailBuffer = results[1];
            const pageInfo = nutrientInstance.pageInfoForIndex(0);

            console.log(`Saving exported PDF as ${filename}`);
            NutrientFileStore.set(filename, pdfBuffer, {
              width: pageInfo.width,
              height: pageInfo.height,
              buffer: thumbnailBuffer,
            })
              .then(() => {
                console.log("PDF saved!");
                resolve();
              })
              .catch((e) => {
                console.log(
                  `An error occurred while saving the PDF. ${e.message}`,
                );
                resolve();
              });
          })
          .catch((e) => {
            console.log(
              `An error occurred while exporting the PDF. ${e.message}`,
            );
            resolve();
          });
      });
    }

    return unsavedChangesPromise.then(() => {
      Nutrient.unload(nutrientInstance);
      window.nutrientInstance = nutrientInstance = null;
      hasUnsavedChanges = false;
    });
  }
})();
