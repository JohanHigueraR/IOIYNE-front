import "./App.css";
import Login from "./Componentes/Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import ResponsiveAppBar from "./Componentes/Navbar";
import Clientes from "./Componentes/Clientes";
import Productos from "./Componentes/Productos";
import Usuarios from "./Componentes/Usuarios";
import Cotizaciones from "./Componentes/Cotizaciones";
import Formulario from "./Componentes/Formulario";
import FormEdit from "./Componentes/FormEdit";
import Factura from "./Componentes/Factura";
import { useEffect, useState } from "react";
import FormQuotations from './Componentes/FormQuotations'
import FormEditCuenta from "./Componentes/FormEditCuenta";
import FormEditQuotations from './Componentes/FormEditQuotations'
import DashboardAux from './Componentes/DashboardAux'

//correo: ioyne.proyect@gmail.com
//password: administrador123

function App() {

  const [progress, setProgress] = useState(false);
  const [loginState, setLoggedUser] = useState("");


  const getSubmitLogin = async (logeado) => {

    setProgress(true)

    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/login`, {
      // Esta ruta nos devuelve el objeto del usuario loggeado, si no existe, devuelve "User not found"
      method: "PUT",
      body: JSON.stringify(logeado), // aqui le pasamos el email y la contraseña y validamos el hash
      headers: { "Content-type": "application/json" },
    });

    const data = await response.json();
    setLoggedUser(data); // seteamos el usuario loggeado
    setProgress(false)
  };

  const validateLogin = () => {

    if (loginState === "cuenta bloqueada por dos horas") {
      localStorage.setItem("loginState", loginState);
    } else if (loginState === "usuario no registrado") {
      localStorage.setItem("loginState", loginState);
    }
    else if (loginState === "") {

    } else if (loginState === "contraseña incorrecta") {
      localStorage.setItem("loginState", loginState);
    } else {
      localStorage.setItem("loginState", JSON.stringify(loginState));
      localStorage.setItem("loginOk", "true");
    }
  };

  const [loginAux, setLoginAux] = useState("");
  const [loginStateAux, setLoginUserAux] = useState("");

  const saveDataLocaStorage = () => {
    setLoginAux(localStorage.getItem("loginOk"));
    setLoginUserAux(localStorage.getItem("loginState"));
  };

  useEffect(() => {
    validateLogin();
  }, [loginState]);

  useEffect(() => {
    saveDataLocaStorage();
  }, [loginState]);

  return (
    <>
      {loginAux === "true" ? (
        <BrowserRouter>
          <ResponsiveAppBar loginState={loginStateAux} setLoginAux={setLoginAux}></ResponsiveAppBar>
          <Container>
            <Routes>
              <Route path="/" element={<DashboardAux></DashboardAux>}></Route>
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
                path="/crearcotizacion"
                element={<FormQuotations loginStateAux={loginStateAux}></FormQuotations>}
              ></Route>
              <Route
                path="/editarcotizacion/:id"
                element={<FormEditQuotations loginStateAux={loginStateAux}></FormEditQuotations>}
              ></Route>
              <Route
                path="/crearusuario"
                element={
                  <Formulario
                    titulo="Crear Usuario"
                    /* inputs={["usuario", "contraseña"]} */
                    inputs={[
                      { value: "us_email", type: "email", label: "Correo" },
                      {
                        value: "us_password",
                        type: "password",
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
                      { value: "us_email", type: "email", label: "Email" },
                      {
                        value: "us_password",
                        type: "password",
                        label: "contraseña",
                      },
                      { value: "us_name", type: "text", label: "nombre" },
                      { value: "us_lastname", type: "text", label: "apellido" },
                    ]}
                    selects={["administrador", "gestor"]}
                  ></FormEdit>
                }
              ></Route>
              <Route
                path="/editarusuariologeado/:id"
                element={
                  <FormEditCuenta
                    titulo="Editar Usuario"
                    inputs={[
                      { value: "us_email", type: "email", label: "Correo" },
                      {
                        value: "us_password",
                        type: "password",
                        label: "contraseña",
                      },
                      { value: "us_name", type: "text", label: "nombre" },
                      { value: "us_lastname", type: "text", label: "apellido" },
                    ]}
                    selects={["administrador", "gestor"]}
                  ></FormEditCuenta>
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
              <Route path="/factura" element={<Factura></Factura>}></Route>
            </Routes>
          </Container>
        </BrowserRouter>
      ) : (
        <Login getSubmitLogin={getSubmitLogin} loginStateAux={loginStateAux} progress={progress}></Login>
      )}
    </>
  );
}

export default App;
