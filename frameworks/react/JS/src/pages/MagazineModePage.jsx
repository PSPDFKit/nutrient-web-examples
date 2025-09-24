import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { loadMagazineViewer, unloadMagazineViewer } from '../../../../examples/js/magazine-mode/implementation.js';

function MagazineModePage() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const { NutrientViewer } = window;
    
    if (container && NutrientViewer) {
      loadMagazineViewer(NutrientViewer, container);
    }

    return () => {
      if (NutrientViewer) {
        unloadMagazineViewer(NutrientViewer, container);
      }
    };
  }, []);

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <nav style={{ 
        padding: '1rem', 
        backgroundColor: '#f5f5f5', 
        borderBottom: '1px solid #ddd',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
      }}>
        <Link 
          to="/"
          style={{
            textDecoration: 'none',
            color: '#4A8FED',
            fontSize: '0.9rem'
          }}
        >
          ← Back to Examples
        </Link>
        <h2 style={{ margin: 0, fontSize: '1.1rem' }}>Magazine Mode</h2>
        <span style={{ fontSize: '0.9rem', color: '#666' }}>
          Double-page layout with custom toolbar and fullscreen support
        </span>
      </nav>
      
      <div ref={containerRef} style={{ flex: 1, width: '100%' }} />
    </div>
  );
}

export default MagazineModePage;