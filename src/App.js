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
import FormEdit from './Componentes/FormEdit'

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
                path="/crearusuario"
                element={
                  <Formulario
                    titulo="Crear Usuario"
                    /* inputs={["usuario", "contraseña"]} */
                    inputs={[
                      { value: "us_email", type: "text", label: "usuario"},
                      { value: "us_password", type: "text",label: "contraseña"},
                      { value: "us_name", type: "text",label: "nombre"},
                      { value: "us_lastname", type: "text",label: "apellido"},
                      
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
                      { value: "pd_name", type: "text", label: "nombre" },
                      { value: "pd_description", type: "text", label: "descripción" },
                      { value: "pd_price", type: "number", label: "número" },
                      { value: "pd_image", type: "file", label: "imagen" },
                    ]}
              
                  ></Formulario>
                }
              ></Route>
                 <Route
                path="/editarProducto/:id"
                element={
                  <FormEdit
                    titulo="Editar Producto"
                    inputs={[
                      { value: "pd_name", type: "text", label: "nombre" },
                      { value: "pd_description", type: "text", label: "descripción" },
                      { value: "pd_price", type: "number", label: "número" },
                      { value: "pd_image", type: "file", label: "imagen" },
                    ]}
                  ></FormEdit>
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
                      { value: "cl_name", type: "text", label:"Nombre" },
                      { value: "cl_lastname", type: "text",label:"Apellido" },
                      { value: "cl_ident", type: "number",label:"Identificación" },
                      { value: "cl_email", type: "email",label:"Correo" },
                      { value: "cl_address", type: "text",label:"Dirección" },
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
