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
import FormEdit from "./Componentes/FormEdit";
import Factura from "./Componentes/Factura";
import { useState } from "react";

function App() {
  
  const [loggedUser, setLoggedUser] = useState("User not found");
  const validateLogin = async (logeado) => {
    const response = await fetch("http://localhost:4000/login", {
      method: "PUT",
      body: JSON.stringify(logeado),
      headers: { "Content-type": "application/json" },
    });
    const data = await response.json();
    setLoggedUser(data);
      if(loggedUser === "User not found"){
        localStorage.setItem("validar", false)
      }else{
        localStorage.setItem("localLoggedUser", JSON.stringify(data));
        localStorage.setItem("validar", true)
      }
  };

  return (
    <>
      {localStorage.validar === "true" ? (
        <BrowserRouter>
          <ResponsiveAppBar
          loggedUser={loggedUser}></ResponsiveAppBar>
          <Container>
            <Routes>
              <Route path="/" element={<Dashboard></Dashboard>}></Route>
              <Route path="/clientes" element={<Clientes></Clientes>}></Route>
              <Route
                path="/productos"
                element={<Productos></Productos>}
              ></Route>
              <Route path="/usuarios" element={<Usuarios></Usuarios>}></Route>
              <Route
                path="/cotizaciones"
                element={<Cotizaciones></Cotizaciones>}
              ></Route>
              <Route
                path="/crearusuario"
                element={
                  <Formulario
                    titulo="Crear Usuario"
                    /* inputs={["usuario", "contraseña"]} */
                    inputs={[
                      { value: "us_email", type: "text", label: "usuario" },
                      {
                        value: "us_password",
                        type: "text",
                        label: "contraseña",
                      },
                      { value: "us_name", type: "text", label: "nombre" },
                      { value: "us_lastname", type: "text", label: "apellido" },
                    ]}
                    selects={["administrador", "gestor"]}
                  ></Formulario>
                }
              ></Route>
              <Route
                path="/editarusuario/:id"
                element={
                  <FormEdit
                    titulo="Editar Usuario"
                    inputs={[
                      { value: "us_email", type: "text", label: "usuario" },
                      {
                        value: "us_password",
                        type: "text",
                        label: "contraseña",
                      },
                      { value: "us_name", type: "text", label: "nombre" },
                      { value: "us_lastname", type: "text", label: "apellido" },
                    ]}
                    loggedUser={loggedUser}
                  ></FormEdit>
                }
              ></Route>
              <Route
                path="/crearproducto"
                element={
                  <Formulario
                    titulo="Crear Producto"
                    /* inputs={["usuario", "contraseña"]} */
                    inputs={[
                      { value: "pd_name", type: "text", label: "nombre" },
                      {
                        value: "pd_description",
                        type: "text",
                        label: "descripción",
                      },
                      { value: "pd_price", type: "number", label: "precio" },
                    ]}
                  ></Formulario>
                }
              ></Route>
              <Route
                path="/editarproducto/:id"
                element={
                  <FormEdit
                    titulo="Editar Producto"
                    inputs={[
                      { value: "pd_name", type: "text", label: "nombre" },
                      {
                        value: "pd_description",
                        type: "text",
                        label: "descripción",
                      },
                      { value: "pd_price", type: "number", label: "Precio" },
                    ]}
                  ></FormEdit>
                }
              ></Route>
              <Route
                path="/editarcliente/:id"
                element={
                  <FormEdit
                    titulo="Editar Cliente"
                    inputs={[
                      { value: "cl_name", type: "text", label: "Nombre" },
                      { value: "cl_lastname", type: "text", label: "Apellido" },
                      {
                        value: "cl_ident",
                        type: "number",
                        label: "Identificación",
                      },
                      { value: "cl_email", type: "email", label: "Correo" },
                      { value: "cl_address", type: "text", label: "Dirección" },
                    ]}
                  ></FormEdit>
                }
              ></Route>
              <Route
                path="/crearcliente"
                element={
                  <Formulario
                    titulo="Crear cliente"
                    /* inputs={["Nombre", "Apellido", "Telefono", "Correo"]} */
                    inputs={[
                      { value: "cl_name", type: "text", label: "Nombre" },
                      { value: "cl_lastname", type: "text", label: "Apellido" },
                      {
                        value: "cl_ident",
                        type: "number",
                        label: "Identificación",
                      },
                      { value: "cl_email", type: "email", label: "Correo" },
                      { value: "cl_address", type: "text", label: "Dirección" },
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
                      { name: "Nombre", type: "text" },
                      { name: "Apellido", type: "text" },
                      { name: "Telefono", type: "number" },
                      { name: "Correo", type: "email" },
                    ]}
                  ></Formulario>
                }
              ></Route>
              <Route path="/factura" element={<Factura></Factura>}></Route>
            </Routes>
          </Container>
        </BrowserRouter>
      ) : (
        <Login validateLogin={validateLogin}></Login>
      )}
    </>
  );
}

export default App;
