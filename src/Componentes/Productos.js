import { Button, LinearProgress, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "./Card";


function Productos() {
  console.log(process.env)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [products, setProducts] = useState([]);
  const loadProducts = async () => {
    setLoading(true)
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/products`);
    const data = await response.json();
    setProducts(data);
    setLoading(false)
  };
  useEffect(() => {
    loadProducts();
  }, []);
  return (
    <Container sx={{ marginTop: '4.5rem' }}>
      <Typography className="titulos">Lista de Productos</Typography>
      <Button variant="contained" color="warning" onClick={() => navigate("/crearproducto")}>Crear Producto</Button>
      {loading === false?<div className="contenedorProductos">
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
      </div>:<LinearProgress></LinearProgress>}
      
    </Container>
  );
}

export default Productos;
