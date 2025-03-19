/**
 * NutrientFileStore is a general purpose IndexedDB storage that can be used for
 * storing your PDFs offline.
 *
 * In the PWA example, we use it to allow documents to be downloaded and be
 * available even if you restart the application.
 */
(() => {
  window.indexedDB =
    window.indexedDB ||
    window.webkitIndexedDB ||
    window.mozIndexedDB ||
    window.OIndexedDB ||
    window.msIndexedDB;

  const NOT_SUPPORTED_ERROR_MESSAGE =
    "Nutrient File Store works only in browsers that support IndexedDB";

  function notSupported() {
    return Promise.reject(new Error(NOT_SUPPORTED_ERROR_MESSAGE));
  }

  if (!window.indexedDB) {
    console.warn(NOT_SUPPORTED_ERROR_MESSAGE);
    window.NutrientFileStore = {
      get: notSupported,
      set: notSupported,
      delete: notSupported,
      clear: notSupported,
      listAll: notSupported,
    };
    return;
  }

  const STORE_NAME = "NUTRIENT_FILES_STORE";
  const STORE_VERSION = 1;

  const dbPromise = idb.open(STORE_NAME, STORE_VERSION, (upgradeDB) => {
    upgradeDB.createObjectStore(STORE_NAME);
  });

  window.NutrientFileStore = {
    /**
     * Retrieve the contents of a file stored in the NutrientFileStore.
     *
     * @param {string} filename
     */
    get: (filename) =>
      dbPromise.then((db) =>
        db.transaction(STORE_NAME).objectStore(STORE_NAME).get(filename),
      ),

    /**
     * Persists a file in the NutrientFileStore. A file is referenced by its
     * filename.
     *
     * @param {string} filename
     * @param {ArrayBuffer} pdfBuffer
     * @param {ArrayBuffer} thumbnailData
     */
    set: (filename, pdfBuffer, thumbnailData) =>
      dbPromise.then((db) => {
        const tx = db.transaction(STORE_NAME, "readwrite");
        tx.objectStore(STORE_NAME).put(
          {
            pdfBuffer: pdfBuffer,
            thumbnailData: thumbnailData,
          },
          filename,
        );
        return tx.complete;
      }),

    /**
     * Deletes a file in the NutrientFileStore.
     *
     * @param {string} filename
     */
    delete: (filename) =>
      dbPromise.then((db) => {
        const tx = db.transaction(STORE_NAME, "readwrite");
        tx.objectStore(STORE_NAME).delete(filename);
        return tx.complete;
      }),

    /**
     * Resets the NutrientFileStore. After that, every file will be deleted.
     *
     * @returns {Promise}
     */
    clear: () =>
      dbPromise.then((db) => {
        const tx = db.transaction(STORE_NAME, "readwrite");
        tx.objectStore(STORE_NAME).clear();
        return tx.complete;
      }),

    /**
     * Returns a promise that resolves to all files that are currently stored
     * in the NutrientFileStore.
     *
     * @returns {Array<string>}
     */
    listAll: () =>
      dbPromise.then((db) => {
        const tx = db.transaction(STORE_NAME);
        const files = [];
        const store = tx.objectStore(STORE_NAME);

        // This could use `getAllKeys()`, but isn't supported in some browsers.
        // `iterateKeyCursor` is also not supported by Safari.
        (store.iterateKeyCursor || store.iterateCursor).call(
          store,
          (cursor) => {
            if (!cursor) return;
            files.push(cursor.key);
            cursor.continue();
          },
        );

        return tx.complete.then(() => files);
      }),
  };
})();
