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
    d.setDate(d.getDate() - 7);
    for (let i = 0; i < 7; i++) {
      let currentDate = new Date();
      currentDate.setDate(d.getDate() + i);
      let formattedDate = currentDate.toLocaleDateString("default", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      let dayName = currentDate.toLocaleDateString("default", {
        weekday: "long",
      });
      datesAndDays.push({ date: formattedDate, day: dayName });
    }
    return datesAndDays;
  };
  const week = getWeek();
  console.log(week)
  const labels = week.map((day,index)=> day.day);
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
    console.log(valores);
  }, [valores]);

  return <div>
  <Line
  data={{
    labels,
    datasets: [
      {
        fill: true,
        label: 'Ventas',
        data:week.map((day,index) => valores[index]),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  }}>

  </Line>
  </div>;
}

export default DashboardAux;
