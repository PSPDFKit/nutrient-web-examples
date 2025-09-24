# Custom Overlays Example (TypeScript)

This example demonstrates how to add interactive custom overlay items to PDF pages using the Nutrient Web SDK with full TypeScript support.

## Features

- **Page Click Events**: Listens for page press events to trigger overlay creation
- **Dynamic HTML Content**: Creates overlays with rich HTML content including text and embedded videos
- **Precise Positioning**: Uses geometry points to position overlays at specific coordinates
- **Interactive Elements**: Includes embedded Vimeo video player in the second overlay
- **Full TypeScript Support**: Proper typing for all Nutrient SDK components and events

## Implementation Details

### Event Handling
The example uses the `page.press` event listener to detect when users click on pages:

```typescript
instance.addEventListener("page.press", (event) => {
  if (event.pageIndex === 0) {
    instance.setCustomOverlayItem(getOverlayItemForPage1(nutrientViewer));
  }
  // ...
});
```

### Overlay Creation
Custom overlays are created using the `CustomOverlayItem` class with proper typing:

```typescript
return new nutrientViewer.CustomOverlayItem({
  id: "overlay-item-first-page",
  node: overlayElement,
  pageIndex: 0,
  position: new nutrientViewer.Geometry.Point({ x: 300, y: 50 }),
});
```

## Usage

Import and use the custom overlays viewer in your TypeScript framework:

```typescript
import { loadCustomOverlaysViewer, unloadCustomOverlaysViewer } from './examples/ts/custom-overlays/implementation';

// Load the viewer
loadCustomOverlaysViewer(NutrientViewer, container);

// Clean up when done
unloadCustomOverlaysViewer(NutrientViewer, container);
```

## Interactive Elements

- **Page 1**: Click to show a welcome message overlay with emoji
- **Page 2**: Click to show an embedded video player overlay

## TypeScript Benefits

- **Type Safety**: Full IntelliSense support and compile-time error checking
- **Better IDE Experience**: Auto-completion for Nutrient SDK methods and properties
- **Refactoring Support**: Safe refactoring with proper type inference

This example showcases how to create rich, interactive PDF experiences by combining Nutrient's overlay system with custom HTML content, all with the benefits of TypeScript's type system.