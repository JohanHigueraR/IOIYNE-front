import * as React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import {
  DataGrid,
  gridPageCountSelector,
  gridPageSelector,
  GridToolbarContainer,
  GridToolbarFilterButton,
  useGridApiContext,
  useGridSelector,
  esES,
} from "@mui/x-data-grid";
import {
  Alert,
  Button,
  Container,
  Pagination,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";


function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarFilterButton />
    </GridToolbarContainer>
  );
}
function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      color="primary"
      count={pageCount}
      page={page + 1}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}

const columns = [
  { field: "id", headerName: "Cotización", width: 120 },
  {
    field: "to_char",
    headerName: "Fecha",
    width: 180,
    editable: false,
  },
  {
    field: "cl_name",
    headerName: "Cliente",
    width: 200,
    editable: false,
    valueGetter: (params) =>
      `${params.row.cl_name || ''} ${params.row.cl_lastname || ''}`,
  },
  {
    field: "cl_email",
    headerName: "Correo",
    width: 200,
    editable: false,
  },

  {
    field: "us_name",
    headerName: "Vendedor",
    description: "This column has a value getter and is not sortable.",
    width: 200,
    valueGetter: (params) =>
      `${params.row.us_name || ''} ${params.row.us_lastname || ''}`,
  },
  {
    field: "qu_value",
    headerName: "Valor",
    description: "This column has a value getter and is not sortable.",
    width: 180,
  },

];

export default function Cotizaciones() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const [quotations, setQuotations] = useState([]);

  const getBillId = (event) => {
    var id = event.currentTarget.getAttribute("data-id")
    navigate("/editarcotizacion/" + id)
  }

  const loadQuotations = async () => {
    setLoading(true)
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/quotations`);
    const data = await response.json();
    setLoading(false)
    setQuotations(
      data.map(
        ({

          cl_name,
          cl_lastname,
          cl_email,
          us_name,
          us_lastname,
          to_char,
          qu_ident,
          qu_value


        }) => {
          return {
            id: qu_ident,
            cl_name,
            cl_lastname,
            cl_email,
            us_name,
            us_lastname,
            to_char,
            qu_ident,
            qu_value: '$ ' + qu_value
          };
        }
      )
    );
  };
  useEffect(() => {
    loadQuotations();
  }, []);

  return (
    <Container sx={{ marginTop: "4.5rem" }}>
      <Typography className="titulos">Lista de cotizaciones</Typography>
      <Alert severity="info" sx={{ background: '#080215', color: '#C7E2FF' }}>Para editar pulse click en la cotización</Alert>
      <Button variant="contained" onClick={() => navigate("/crearcotizacion")}>
        Crear Cotización
      </Button>
      <Box sx={{ height: 400, width: "100%", marginTop: "15px" }}>
        <DataGrid
          key={quotations}
          rows={quotations}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          experimentalFeatures={{ newEditingApi: true }}
          className="DataTable"
          components={{ Toolbar: CustomToolbar, Pagination: CustomPagination }}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          loading={loading}
          componentsProps={{
            row: {

              style: { cursor: "context-menu" },
              onClick: getBillId
            },
          }}
        />

      </Box>
    </Container>
  );
}
