/**
 * Nutrient Web SDK Configuration
 */

export interface NutrientConfig {
  /** Base URL for Nutrient Web SDK assets */
  baseUrl?: string;
  /** Default document URL for examples */
  documentUrl: string;
}

/**
 * Default configuration for Nutrient Web SDK
 */
export const nutrientConfig: NutrientConfig = {
  // For CDN installations, this should be undefined
  // For package installations, this will be set to your local asset path
  baseUrl: undefined,

  // Default document for examples - you can change this to your own PDF
  documentUrl: "https://www.nutrient.io/downloads/nutrient-web-demo.pdf",
};
