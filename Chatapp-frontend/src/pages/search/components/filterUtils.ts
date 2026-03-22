import { type Card, type FilterConfig } from './filterDataTypes';


export const applyCategoryFilter = (
  card: Card,
  categoryConfig: FilterConfig,
  selectedLabels: string[]
): boolean => {
  if (selectedLabels.length === 0) {
    return false;
  }

  return selectedLabels.some(label => {
    switch (categoryConfig.type) {
      case 'propertyMatch':
        if (!categoryConfig.property) {
          console.warn(`FilterConfig for 'propertyMatch' is missing 'property' key for label: ${label}.`);
          return false;
        }
        const cardValue = card[categoryConfig.property];
        const expectedValue = categoryConfig.valueMap?.[label] || label; 

        return cardValue === expectedValue;

      case 'arrayIncludes':
        if (!categoryConfig.property) {
          console.warn(`FilterConfig for 'arrayIncludes' is missing 'property' key for label: ${label}.`);
          return false;
        }
        const cardArrayValue = card[categoryConfig.property];
        if (Array.isArray(cardArrayValue)) {
          return cardArrayValue.includes(label);
        }
        console.warn(`Card property '${String(categoryConfig.property)}' is not an array for 'arrayIncludes' filter for label: ${label}.`);
        return false;

      case 'customLogic':
        if (categoryConfig.property === 'type') {
          if (label === "VC-backend project") {
            return card.type === "Project";
          }
          return card.type === label;
        }
        console.warn(`'customLogic' filter type encountered for category property '${String(categoryConfig.property)}'. Implement specific logic for label: ${label}.`);
        return false;

      default:
        console.warn(`Unknown filterConfig type: ${categoryConfig.type} for label: ${label}.`);
        return false;
    }
  });
};