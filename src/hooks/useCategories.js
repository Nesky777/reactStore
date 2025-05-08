import { useMemo } from "react";

export const useCategories = (products) => {
  const categories = useMemo(() => {
    if (!products) return [];
    const uniqueCategories = [];
    for (const product of products) {
      if (!uniqueCategories.includes(product.category)) {
        uniqueCategories.push(product.category);
      }
    }
    return ["all", ...uniqueCategories];
  }, [products]);

  return categories;
};

export default useCategories;