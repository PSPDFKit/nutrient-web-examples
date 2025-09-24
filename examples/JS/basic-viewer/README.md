# Basic Viewer Example

This example demonstrates the most basic way to integrate Nutrient Web SDK into your application.

## Features

- Load and display PDF documents
- Basic viewer controls (zoom, navigation)
- Simple container-based mounting

## Usage

```javascript
import { loadBasicViewer, unloadBasicViewer } from './examples/basic-viewer/implementation.js';

// Load the viewer
const instance = await loadBasicViewer(containerElement);

// Unload when done
await unloadBasicViewer(containerElement);
```

## Framework Integration

This example is framework-agnostic and can be used with:
- React (useEffect hook)
- Vue (onMounted/onUnmounted)
- Angular (ngOnInit/ngOnDestroy)
- Vanilla JavaScript
- Any other framework

The framework template handles the lifecycle and container management, while this implementation focuses on the Nutrient-specific logic.