// import ProductCard from "./ProductCard";
// import styles from "../../styles/ProductList.module.css";
// import { useMemo, useState } from "react";
// import useProducts from "../../hooks/useProducts";

// const ProductList = () => {
//   const { data: products, error, isLoading } = useProducts();
//   const [sortOption, setSortOption] = useState("none");
//   const [minPrice, setMinPrice] = useState("");
//   const [maxPrice, setMaxPrice] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [searchTerm, setSearchTerm] = useState("");

//   const categories = useMemo(() => {
//     if (!products) return [];
//     const uniqueCategories = [];
//     for (const product of products) {
//       if (!uniqueCategories.includes(product.category)) {
//         uniqueCategories.push(product.category);
//       }
//     }
//     return ["all", ...uniqueCategories];
//   }, [products]);

//   const filteredAndSortedProducts = useMemo(() => {
//     if (!products) return [];

//     let filtered = [...products];

//     if (selectedCategory !== "all") {
//       filtered = filtered.filter((product) => product.category === selectedCategory);
//     }

//     filtered = filtered.filter((product) => {
//       const price = product.price;
//       const min = minPrice !== "" ? parseFloat(minPrice) : -Infinity;
//       const max = maxPrice !== "" ? parseFloat(maxPrice) : Infinity;
//       return price >= min && price <= max;
//     });

//     if (searchTerm.trim() !== "") {
//       const search = searchTerm.toLowerCase();
//       filtered = filtered.filter(
//         (product) =>
//           product.title.toLowerCase().includes(search) ||
//           product.description.toLowerCase().includes(search)
//       );
//     }

//     switch (sortOption) {
//       case "price_asc":
//         return filtered.sort((a, b) => a.price - b.price);
//       case "price_desc":
//         return filtered.sort((a, b) => b.price - a.price);
//       default:
//         return filtered;
//     }
//   }, [products, sortOption, minPrice, maxPrice, selectedCategory, searchTerm]);

//   if (isLoading) return <p>Trwa ładowanie</p>;
//   if (error) return <p>Wystąpił błąd</p>;

//   return (
//     <div className="px-4">
//       <div className="flex flex-col sm:flex-row flex-wrap items-start gap-4 mb-4">
//         <select
//           value={sortOption}
//           onChange={(e) => setSortOption(e.target.value)}
//           className="p-2 border rounded-md"
//         >
//           <option value="none">Brak sortowania</option>
//           <option value="price_asc">Cena rosnąco</option>
//           <option value="price_desc">Cena malejąco</option>
//         </select>

//         <input
//           type="number"
//           placeholder="Cena minimalna"
//           value={minPrice}
//           onChange={(e) => setMinPrice(e.target.value)}
//           className="p-2 border rounded-md"
//         />
//         <input
//           type="number"
//           placeholder="Cena maksymalna"
//           value={maxPrice}
//           onChange={(e) => setMaxPrice(e.target.value)}
//           className="p-2 border rounded-md"
//         />

//         <select
//           value={selectedCategory}
//           onChange={(e) => setSelectedCategory(e.target.value)}
//           className="p-2 border rounded-md"
//         >
//           {categories.map((cat) => (
//             <option key={cat} value={cat}>
//               {cat === "all" ? "Wszystkie kategorie" : cat}
//             </option>
//           ))}
//         </select>

//         <input
//           type="text"
//           placeholder="Szukaj produktu..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="p-2 border rounded-md flex-1"
//         />
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {filteredAndSortedProducts.map((product) => (
//           <ProductCard product={product} key={product.id} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductList;

import { useMemo, useState, ChangeEvent } from "react";
import ProductCard from "./ProductCard";
// import styles from "../../styles/ProductList.module.css";
import useProducts from "../../hooks/useProducts";
import useCategories from "../../hooks/useCategories";
import { Product } from "@/types/product";

// Typ unii dla opcji sortowania
type SortUnion = "none" | "price_asc" | "price_desc";

const ProductList = () => {
  const { data: products, error, isLoading } = useProducts(); 
  const categories = useCategories(products); 
  const [sortOption, setSortOption] = useState<SortUnion>("none");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredAndSortedProducts = useMemo<Product[]>(() => {
    if (!products) return [];

    let filtered = [...products];

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    filtered = filtered.filter((product) => {
      const price = product.price;
      const min = minPrice !== "" ? parseFloat(minPrice) : -Infinity;
      const max = maxPrice !== "" ? parseFloat(maxPrice) : Infinity;
      return price >= min && price <= max;
    });

    if (searchTerm.trim() !== "") {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(search) ||
          product.description.toLowerCase().includes(search)
      );
    }

    switch (sortOption) {
      case "price_asc":
        return filtered.sort((a, b) => a.price - b.price);
      case "price_desc":
        return filtered.sort((a, b) => b.price - a.price);
      default:
        return filtered;
    }
  }, [products, sortOption, minPrice, maxPrice, selectedCategory, searchTerm]);

  if (isLoading) return <p>Trwa ładowanie</p>;
  if (error) return <p>Wystąpił błąd</p>;

  return (
    <div className="px-4">
      <div className="flex flex-col sm:flex-row flex-wrap items-start gap-4 mb-4">
        <select
          value={sortOption}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setSortOption(e.target.value as SortUnion)
          }
          className="p-2 border rounded-md"
        >
          <option value="none">Brak sortowania</option>
          <option value="price_asc">Cena rosnąco</option>
          <option value="price_desc">Cena malejąco</option>
        </select>

        <input
          type="number"
          placeholder="Cena minimalna"
          value={minPrice}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setMinPrice(e.target.value)
          }
          className="p-2 border rounded-md"
        />
        <input
          type="number"
          placeholder="Cena maksymalna"
          value={maxPrice}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setMaxPrice(e.target.value)
          }
          className="p-2 border rounded-md"
        />

        <select
          value={selectedCategory}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setSelectedCategory(e.target.value)
          }
          className="p-2 border rounded-md"
        >
          {categories.map((cat: string) => (
            <option key={cat} value={cat}>
              {cat === "all" ? "Wszystkie kategorie" : cat}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Szukaj produktu..."
          value={searchTerm}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchTerm(e.target.value)
          }
          className="p-2 border rounded-md flex-1"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredAndSortedProducts.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
