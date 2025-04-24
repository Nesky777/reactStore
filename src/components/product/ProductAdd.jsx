import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Schemat walidacji z Yup
const schema = yup.object().shape({
  title: yup
    .string()
    .max(70, 'Nazwa produktu nie może przekroczyć 70 znaków')
    .required('Nazwa produktu jest wymagana'),
  price: yup
    .number()
    .min(1, 'Cena nie może być mniejsza od 0')
    .required('Cena jest wymagana'),
  description: yup
    .string()
    .max(500, 'Opis produktu nie może przekroczyć 500 znaków')
    .required('Opis jest wymagany'),
  category: yup
    .string()
    .required('Kategoria jest wymagana'),
  image: yup
    .string()
    .url('Podaj poprawny URL obrazu')
    .required('Obraz jest wymagany'),
});

function AddProduct() {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  
  const [products, setProducts] = useState([]);

  const onSubmit = async (data) => {
    const newProduct = {
      title: data.title,
      price: parseFloat(data.price),
      description: data.description,
      category: data.category,
      image: data.image,
    };

    try {
      const response = await fetch('https://fakestoreapi.com/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        const product = await response.json();
        setProducts((prevProducts) => [...prevProducts, product]);
      } else {
        alert('Błąd podczas dodawania produktu');
      }
    } catch (error) {
      console.error('Błąd API:', error);
      alert('Wystąpił błąd');
    }
  };

  return (
    <div>
      <h1>Store</h1>
      <h2>Add new product</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Title:</label>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <input {...field} type="text" />
            )}
          />
          {errors.title && <p>{errors.title.message}</p>}
        </div>

        <div>
          <label>Price:</label>
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <input {...field} type="number" />
            )}
          />
          {errors.price && <p>{errors.price.message}</p>}
        </div>

        <div>
          <label>Description:</label>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <textarea {...field} />
            )}
          />
          {errors.description && <p>{errors.description.message}</p>}
        </div>

        <div>
          <label>Category:</label>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <input {...field} type="text" />
            )}
          />
          {errors.category && <p>{errors.category.message}</p>}
        </div>

        <div>
          <label>Image URL:</label>
          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <input {...field} type="text" />
            )}
          />
          {errors.image && <p>{errors.image.message}</p>}
        </div>

        <button type="submit" >Dodaj produkt</button>
      </form>

      <h3>Lista produktów</h3>
      <div>
        {products.length > 0 ? (
          <ul>
            {products.map((product) => (
              <li key={product.id}>
                <h4>{product.title}</h4>
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
                <p>Category: {product.category}</p>
                <img src={product.image} alt={product.title} style={{ width: '300px' }} />
              </li>
            ))}
          </ul>
        ) : (
          <p>Brak Produktów</p>
        )}
      </div>
    </div>
  );
}

export default AddProduct;
