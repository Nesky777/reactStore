const ProductDetails = ({ selectedProduct }) => {
  if (!selectedProduct) {
    return <p>Wybierz produkt aby wyświetlić szczegóły</p>;
  }

  return (
    <>
      <p>Szczegóły</p>
        <p>{selectedProduct.description}</p>
    </>
  );
};

export default ProductDetails;
