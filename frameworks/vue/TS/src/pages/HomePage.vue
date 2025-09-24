<template>
  <div :style="{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }">
    <header :style="{ textAlign: 'center', marginBottom: '3rem' }">
      <h1>Nutrient Web SDK - Vue TypeScript Examples</h1>
      <p :style="{ fontSize: '1.1rem', color: '#666' }">
        Explore different ways to integrate Nutrient Web SDK with Vue and TypeScript
      </p>
    </header>

    <div :style="{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
      gap: '2rem'
    }">
      <div
        v-for="example in examples"
        :key="example.path"
        :style="{
          border: '1px solid #ddd',
          borderRadius: '8px',
          padding: '1.5rem',
          backgroundColor: '#f9f9f9'
        }"
      >
        <h3 :style="{ margin: '0 0 1rem 0' }">{{ example.title }}</h3>
        <p :style="{ color: '#666', marginBottom: '1rem' }">
          {{ example.description }}
        </p>
        
        <h4 :style="{ fontSize: '0.9rem', margin: '1rem 0 0.5rem 0' }">Features:</h4>
        <ul :style="{ fontSize: '0.9rem', color: '#555' }">
          <li v-for="feature in example.features" :key="feature">
            {{ feature }}
          </li>
        </ul>
        
        <router-link
          :to="example.path"
          :style="{
            display: 'inline-block',
            marginTop: '1rem',
            padding: '0.5rem 1rem',
            backgroundColor: '#4A8FED',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
            fontSize: '0.9rem'
          }"
        >
          View Example →
        </router-link>
      </div>
    </div>

    <footer :style="{ textAlign: 'center', marginTop: '3rem', color: '#666' }">
      <p>
        Learn more: 
        <a href="https://www.nutrient.io/guides/web/" target="_blank" rel="noopener noreferrer">
          Nutrient Web SDK Documentation
        </a>
      </p>
    </footer>
  </div>
</template>

<script setup lang="ts">
interface Example {
  path: string
  title: string
  description: string
  features: string[]
}

const examples: Example[] = [
  {
    path: '/basic-viewer',
    title: 'Basic Viewer',
    description: 'Simple PDF document loading with basic controls',
    features: ['Document loading', 'Zoom controls', 'Page navigation']
  },
  {
    path: '/magazine-mode',
    title: 'Magazine Mode',
    description: 'Advanced magazine-style reader with custom features',
    features: ['Double-page layout', 'Custom toolbar', 'Fullscreen support', 'iOS optimization']
  }
]
</script>