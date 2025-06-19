# Nutrient Web SDK Examples

This repository contains various examples of the usage of [Nutrient Web SDK](https://www.nutrient.io/sdk/web). 

- **Demo**: https://www.nutrient.io/demo/
- **Guides**: https://www.nutrient.io/guides/web/
- **API**: https://www.nutrient.io/guides/web/api/

## Development

### Biome Version Check

This repository includes a check to ensure that the Biome version in `package.json` matches the version in `.github/workflows/biome.yml`. This check is run:

- During CI/CD in the GitHub workflow
- As a pre-commit hook to prevent commits with mismatched versions
- Manually using `npm run check-biome-version`

If you update the Biome version in `package.json`, make sure to update it in `.github/workflows/biome.yml` as well.
