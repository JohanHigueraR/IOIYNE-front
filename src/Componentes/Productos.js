import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import Card from "./Card";

const products = [
  {
    id: 1,
    titulo: "Camiseta",
    precio: "$20.000",
    descripcion: "Descripción de aceite de alga djaskdkasjdkasjkdjkasdas",
    imagen: "/camiseta.jpg",
  },
  {
    id: 2,
    titulo: "Pantalon",
    precio: "$70.000",
    descripcion: "Descripción de aceite de alga djaskdkasjdkasjkdjkasdas",
    imagen: "/pantalon.jpg",
  },
  {
    id: 3,
    titulo: "Zapatillas",
    precio: "$120.000",
    descripcion: "Descripción de aceite de alga djaskdkasjdkasjkdjkasdas",
    imagen: "/zapatillas.jpg",
  },
  {
    id: 4,
    titulo: "Botas",
    precio: "$180.000",
    descripcion: "Descripción de aceite de alga djaskdkasjdkasjkdjkasdas",
    imagen: "/botas.jpg",
  },
  {
    id:5,
    titulo: "Medias",
    precio: "$20.000",
    descripcion: "Descripción de aceite de alga djaskdkasjdkasjkdjkasdas",
    imagen: "/medias.jpg",
  },
];

function Productos() {
  return (
    <Container sx={{marginTop: '5rem'}}>
      <Typography className="titulos">Lista de Productos</Typography>
      <div className="contenedorProductos">
        {products.map((product, index) => (
          <Card
            titulo={product.titulo}
            precio={product.precio}
            descripción={product.descripcion}
            imagen={product.imagen}
            id={product.id}
            key={index}
          ></Card>
        ))}
      </div>
    </Container>
  );
}

export default Productos;
