# Magazine Mode Example

This example demonstrates advanced Nutrient Web SDK features for creating a magazine-style reading experience.

## Features

- **Double Page Layout**: Documents are displayed in a spread layout like a real magazine
- **Custom View State**: Configured with `PER_SPREAD` scroll mode and `DOUBLE` layout mode  
- **Custom Toolbar**: Bottom-placed toolbar with curated items for better magazine experience
- **Fullscreen Support**: Cross-browser fullscreen functionality with custom toolbar button
- **iOS Optimization**: Special handling for iOS fullscreen behavior
- **Advanced Configuration**: Demonstrates complex SDK configuration options

## Technical Details

### View State Configuration
```javascript
const initialViewState = new NutrientViewer.ViewState({
  scrollMode: NutrientViewer.ScrollMode.PER_SPREAD,
  layoutMode: NutrientViewer.LayoutMode.DOUBLE,
  keepFirstSpreadAsSinglePage: true,
});
```

### Custom Toolbar Items
- Sidebar bookmarks and thumbnails
- Highlighter tool
- Zoom controls
- Search functionality  
- Custom fullscreen toggle button

### Cross-Browser Fullscreen
Handles fullscreen API differences across:
- Modern browsers (`requestFullscreen`)
- Firefox (`mozRequestFullScreen`)
- Safari (`webkitRequestFullscreen`)
- Internet Explorer (`msRequestFullscreen`)

## Usage

```javascript
import { loadMagazineViewer, unloadMagazineViewer } from './examples/magazine-mode/implementation.js';

// Load the magazine viewer
const instance = await loadMagazineViewer(containerElement);

// Unload when done
await unloadMagazineViewer(containerElement);
```

## Framework Integration

This example works with any framework. The framework template handles:
- Component lifecycle (mount/unmount)
- Container element management
- Error handling

While this implementation focuses on:
- Nutrient-specific configuration
- Advanced viewer features
- Cross-browser compatibility
- Custom UI elements