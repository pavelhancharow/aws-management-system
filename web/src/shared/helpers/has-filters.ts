export const hasFilters = (filters: unknown, initialFilters: unknown) => {
  return JSON.stringify(filters) === JSON.stringify(initialFilters);
};
