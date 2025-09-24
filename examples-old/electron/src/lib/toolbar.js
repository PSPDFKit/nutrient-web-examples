/**
 * Prepares the toolbar for our PDF viewer. This will add two additional buttons to import and
 * export PDF files.
 * This will also enable the `layout-config` toolbar module.
 */

export function makeToolbarItems(defaultToolbarItems, exportFile, importFile) {
  const toolbarItems = defaultToolbarItems
    // Remove built-in export PDF button.
    .filter((item) => item.type !== "export-pdf");

  const pagerIndex = toolbarItems.findIndex((item) => item.type === "pager");

  toolbarItems.splice(pagerIndex + 1, 0, { type: "layout-config" });

  // Add custom import and export buttons.
  toolbarItems.push({
    type: "custom",
    title: "Open",
    id: "import-button",
    icon: "./icons/import.svg",
    onPress: importFile,
  });

  toolbarItems.push({
    type: "custom",
    title: "Save",
    id: "export-button",
    icon: "./icons/export.svg",
    onPress: exportFile,
  });

  return toolbarItems;
}
