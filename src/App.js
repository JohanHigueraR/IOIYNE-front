import "./App.css";
import Login from "./Componentes/Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import ResponsiveAppBar from "./Componentes/Navbar";
import Dashboard from "./Componentes/Dashboard";
import Clientes from "./Componentes/Clientes";
import Productos from "./Componentes/Productos";
import Usuarios from "./Componentes/Usuarios";
import Cotizaciones from "./Componentes/Cotizaciones";
import Formulario from "./Componentes/Formulario";

function App() {
  const login = true;
  return (
    <>
      {login === true ? (
        <BrowserRouter>
          <ResponsiveAppBar></ResponsiveAppBar>
          <Container>
            <Routes>
              <Route path="/" element={<Dashboard></Dashboard>}></Route>
              <Route path="/Clientes" element={<Clientes></Clientes>}></Route>
              <Route
                path="/Productos"
                element={<Productos></Productos>}
              ></Route>
              <Route path="/Usuarios" element={<Usuarios></Usuarios>}></Route>
              <Route
                path="/Cotizaciones"
                element={<Cotizaciones></Cotizaciones>}
              ></Route>
              <Route
                path="/crearusuarios"
                element={
                  <Formulario
                    titulo="Crear Usuario"
                    /* inputs={["usuario", "contraseña"]} */
                    inputs={[
                      { input: "usuario", type: "email" },
                      { input: "contraseña", type: "password" },
                    ]}
                    selects={["administrador", "gestor"]}
                  ></Formulario>
                }
              ></Route>
              <Route
                path="/editarCuenta"
                element={
                  <Formulario
                    titulo="Editar Usuario"
                    inputs={[
                      { input: "usuario", type: "email" },
                      { input: "contraseña", type: "password" },
                    ]}
                  ></Formulario>
                }
              ></Route>
              <Route
                path="/crearcliente"
                element={
                  <Formulario
                    titulo="Crear cliente"
                    /* inputs={["Nombre", "Apellido", "Telefono", "Correo"]} */
                    inputs={[
                      { input: "Nombre", type: "text" },
                      { input: "Apellido", type: "text" },
                      { input: "Telefono", type: "number" },
                      { input: "Correo", type: "email" },
                    ]}
                  ></Formulario>
                }
              ></Route>
              <Route
                path="/editarcliente"
                element={
                  <Formulario
                    titulo="Editar cliente"
                    inputs={[
                      { input: "Nombre", type: "text" },
                      { input: "Apellido", type: "text" },
                      { input: "Telefono", type: "number" },
                      { input: "Correo", type: "email" },
                    ]}
                  ></Formulario>
                }
              ></Route>
              <Route
                path="/editarProducto/:id"
                element={
                  <Formulario
                    titulo="Editar Producto"
                    /* inputs={["Titulo", "Precio", "Descripción", "Imagen"]} */
                    inputs={[{input:"Titulo", type: "text"}, {input: "Precio", type: "number"},{input: "Descripción", type: "text"}, {input:"imagen", type:"file"}]}
                  ></Formulario>
                }
              ></Route>
            </Routes>
          </Container>
        </BrowserRouter>
      ) : (
        <Login></Login>
      )}
    </>
  );
}

export default App;
