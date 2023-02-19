import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Box, Typography } from "@mui/material";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);


function DashboardAux() {

  const getWeek = () => {
    let datesAndDays = [];
    let d = new Date();
    d.setDate(d.getDate() - 6);
    for (let i = 0; i < 7; i++) {
      let currentDate = new Date();
      currentDate.setDate(d.getDate() + i);
      let formattedDate = currentDate.toLocaleDateString("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).split('/').reverse().join('-'); // se agrega el método split y reverse para intercambiar el / por -
      let dayName = currentDate.toLocaleDateString("en-US", {
        weekday: "long",
      });
      datesAndDays.push({ date: formattedDate, day: dayName });
    }
    return datesAndDays;
  };

  const week = getWeek();

  const labels = week.map((day, index) => day.day);
  const [valores, setValores] = useState([]); // Inicializa el estado "valores" con un arreglo vacío y la función "setValores" para actualizarlo

  const getQuotationValueForDay = async () => {
    const promises = week.map(async (day) => { // Ejecuta un map sobre "week" y devuelve un arreglo de promesas
      const response = await fetch( // Hace una petición a un endpoint
        `${process.env.REACT_APP_SERVER_URL}/dashboard`,
        {
          method: "PUT",
          body: JSON.stringify({
            qu_created: day.date,
          }),
          headers: { "Content-type": "application/json" },
        }
      );
      const data = await response.json(); // Espera a que la respuesta del servidor se convierta en formato JSON

      return data[0].sum === null ? 0 : data[0].sum; // Devuelve 0 si el valor "sum" es nulo, en otro caso devuelve "sum"

    });

    const values = await Promise.all(promises); // Espera a que todas las promesas se resuelvan
    setValores(values); // Actualiza el estado "valores" con los valores devueltos

  };

  useEffect(() => {
    getQuotationValueForDay(); // Llamada a la función "getQuotationValueForDay" dentro del hook "useEffect"
  }, []); // El segundo argumento de "useEffect" es un arreglo vacío que indica que se ejecutará solo una vez

  useEffect(() => {

  }, [valores]);

  return (
    <>
      <Typography className="titulos" sx={{ marginTop: '5rem' }}>Ventas de los últimos 7 días</Typography>
      <Box sx={{ height: "30rem", }} className="contenedorDashboard" >
        <Line
          data={{
            labels,
            datasets: [
              {
                fill: true,
                label: 'Ventas',
                data: week.map((day, index) => valores[index]),
                borderColor: 'rgb(14, 14, 115)',
                backgroundColor: '#1976d2',
                pointBackgroundColor: 'rgb(58, 51, 159)',
                pointRadius: 8,
                tension: 0.1

              },
            ],
          }}
          options={{
            responsive: true,
            scales: {
              y: {
                grid: {
                  color: 'rgb(82, 81, 81)', // Cambiar el color aquí}
                },
                ticks: {
                  color: 'white', // Cambiar el color aquí
                },
              },
              x: {
                grid: {
                  color: 'rgb(82, 81, 81)', // Cambiar el color aquí
                },
                ticks: {
                  color: 'white', // Cambiar el color aquí
                },
              },
            },

          }
          }>

        </Line>
      </Box>
    </>
  )
}

export default DashboardAux;
