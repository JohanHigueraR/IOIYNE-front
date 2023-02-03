import "./App.css";
import Login from "./Componentes/Login/Login";
import { BrowserRouter, Routes, Route} from "react-router-dom";
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
                      { name: "usuario", type: "email" },
                      { name: "contraseña", type: "password" },
                    ]}
                    selects={["administrador", "gestor"]}
                  ></Formulario>
                }
              ></Route>
                 <Route
                path="/crearproducto"
                element={
                  <Formulario
                    titulo="Crear Producto"
                    /* inputs={["usuario", "contraseña"]} */
                    inputs={[
                      { name: "nombre", type: "text" },
                      { name: "descripcion", type: "text" },
                      { name: "precio", type: "number" },
                      { name: "imagen", type: "file" },
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
                    inputs={[
                      { name: "nombre", type: "text" },
                      { name: "descripcion", type: "text" },
                      { name: "precio", type: "number" },
                      { name: "imagen", type: "file" },
                    ]}
                  ></Formulario>
                }
              ></Route>
              <Route
                path="/editarCuenta/:id"
                element={
                  <Formulario
                    titulo="Editar Usuario"
                    inputs={[
                      { name: "usuario", type: "email" },
                      { name: "contraseña", type: "password" },
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
                      { name: "Nombre", type: "text" },
                      { name: "Apellido", type: "text" },
                      { name: "Telefono", type: "number" },
                      { name: "Correo", type: "email" },
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
