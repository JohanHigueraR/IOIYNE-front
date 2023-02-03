import { Button, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "./Card";


function Productos() {
  const navigate = useNavigate()
  const [products, setProducts] = useState([]);
  const loadProducts = async () => {
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/products`);
    const data = await response.json();
    setProducts(data);
  };
  useEffect(() => {
    loadProducts();
  }, []);
  return (
    <Container sx={{ marginTop: '5rem' }}>
      <Typography className="titulos">Lista de Productos</Typography>
      <Button variant="contained" color="warning" onClick={() => navigate("/crearproducto")}>Crear Producto</Button>
      <div className="contenedorProductos">
        {products.map((product, index) => (
          <Card
            titulo={product.pd_name}
            precio={product.pd_price}
            descripción={product.pd_description}
            imagen={product.pd_image + ".jpg"}
            id={product.product_id}
            key={index}
          ></Card>
        ))}
      </div>
    </Container>
  );
}

export default Productos;
