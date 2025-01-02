import variables from "@/app/styles/variables.module.scss";
import { DatePicker } from "antd";
import { useState, useEffect } from "react";

interface Todo {
  text:string;
  status:boolean;
  id:number;
  createdAt:string;
}

interface Props {
  setTareasCompletas: React.Dispatch<
    React.SetStateAction<{ text: string; status: boolean; id: number }[]>
  >;
  // asi lo usaba antes sin la interfaz: tareasCompletas: { text: string; status: boolean; id: number }[];
  tareasCompletas:Todo[];
}

export const TodoSearchDates = (props: Props) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const filtrarTareas = (
    data: Todo[],
    startDate: Date | null,
    endDate: Date | null
  ) => {
    return data.filter((todo: { status: boolean; createdAt: string }) => {
      const todoDate = new Date(todo.createdAt);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;
      console.log('fecha inicial:',startDate,'fecha final:',endDate)
      return todo.status === true && todoDate >= start && todoDate <= end;
    });
  };

  useEffect(() => {
    if (!startDate || !endDate) return;

    const fetchTodos = async () => {
      try {
        const res = await fetch("/api/todos");
        const data = await res.json();
        const resultado = filtrarTareas(data, startDate, endDate);
        // Esto se hace para ordenar la data
        const resultadoOrdenado = resultado.sort(
          function (a,b)
          {
            if(a.createdAt>b.createdAt)
              {
                return 1;
              }
              if(a.createdAt<b.createdAt)
                {
                  return -1;
                }
                return 0;
              })
        props.setTareasCompletas(resultadoOrdenado);
        console.log("este es el resultado", resultado);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };
    fetchTodos();
  }, [startDate, endDate]);

  return (
    <div className={variables.inputDate}>
      <label>Fecha Inicial</label>
      <DatePicker value={startDate} onChange={(date) => setStartDate(date)} />
      <label>Fecha Final</label>
      <DatePicker value={endDate} onChange={(date) => setEndDate(date)} />
    </div>
  );
};
