/* eslint-disable react/jsx-key */
"use client";

import { TodoTitle } from "../../components/rangoFechas/TodoTitle";
import { TodoItem } from "../../components/rangoFechas/TodoItem";
import { TodoSearchDates } from "../../components/rangoFechas/TodoSearchDates";
import { useState } from "react";

export default function RangoFechas() {
  const [tareasCompletas, setTareasCompletas] = useState<
    Array<{ text: string; status: boolean; id: number }>
  >([]);
  const titulo: string = "Consulta Tareas x Fecha";

  return (
    <>
      <TodoTitle titulo={titulo} />
      <TodoSearchDates
        setTareasCompletas={setTareasCompletas}
        tareasCompletas={tareasCompletas}
      />
      <TodoItem tareasCompletas={tareasCompletas} />
    </>
  );
}
