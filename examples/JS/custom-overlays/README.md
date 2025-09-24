# Custom Overlays Example

This example demonstrates how to add interactive custom overlay items to PDF pages using the Nutrient Web SDK.

## Features

- **Page Click Events**: Listens for page press events to trigger overlay creation
- **Dynamic HTML Content**: Creates overlays with rich HTML content including text and embedded videos
- **Precise Positioning**: Uses geometry points to position overlays at specific coordinates
- **Interactive Elements**: Includes embedded Vimeo video player in the second overlay

## Implementation Details

### Event Handling
The example uses the `page.press` event listener to detect when users click on pages:

```javascript
instance.addEventListener("page.press", (event) => {
  if (event.pageIndex === 0) {
    instance.setCustomOverlayItem(getOverlayItemForPage1(NutrientViewer));
  }
  // ...
});
```

### Overlay Creation
Custom overlays are created using the `CustomOverlayItem` class:

```javascript
return new NutrientViewer.CustomOverlayItem({
  id: "overlay-item-first-page",
  node: overlayElement,
  pageIndex: 0,
  position: new NutrientViewer.Geometry.Point({ x: 300, y: 50 }),
});
```

## Usage

Import and use the custom overlays viewer in your framework:

```javascript
import { loadCustomOverlaysViewer, unloadCustomOverlaysViewer } from './examples/js/custom-overlays/implementation.js';

// Load the viewer
loadCustomOverlaysViewer(NutrientViewer, container);

// Clean up when done
unloadCustomOverlaysViewer(NutrientViewer, container);
```

## Interactive Elements

- **Page 1**: Click to show a welcome message overlay with emoji
- **Page 2**: Click to show an embedded video player overlay

This example showcases how to create rich, interactive PDF experiences by combining Nutrient's overlay system with custom HTML content.