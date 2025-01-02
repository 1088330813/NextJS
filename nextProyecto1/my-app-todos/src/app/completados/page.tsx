/* eslint-disable react/jsx-key */
"use client";

import { TodoTitle } from "../../components/completados/TodoTitle";
import { TodoItem } from "../../components/completados/TodoItem";
import { TodoList } from "../../components/completados/TodoList";
import { useState, useEffect } from "react";

export default function Completados() {
  const [numTareasCompletas, setNumTareasCompletas] = useState<number>(0);
  const [tareasCompletas, setTareasCompletas] = useState<
    Array<{ text: string; status: boolean; id: number; createdAt: Date }>
  >([]);

  //validacion para busqueda que lo convierte en minusculaa para ser comparable
  const searchedTodos = tareasCompletas.filter((todo) => {
    return todo;
  });
  useEffect(() => {
    fetch("/api/todos")
      .then((res) => res.json())
      .then((data) => {
        const fechaHoy = new Date().toISOString().split("T").shift();
        const resultado = data.filter(
          (todo: { status: boolean; createdAt: Date }) =>
            todo.status === true &&
            new Date(todo.createdAt).toISOString().split("T").shift() ===
              fechaHoy
        );
        console.log("fecha de hoy:", fechaHoy);

        setTareasCompletas(resultado);
      });
  }, []);

  return (
    <>
    <TodoTitle/>
      <TodoList>
        {searchedTodos.map((todo, index) => (
          <TodoItem
            numTareasCompletas={numTareasCompletas}
            todo={todo}
            index={index + 1}
            setNumTareasCompletas={setNumTareasCompletas}
            // setTareasCompletas={setTareasCompletas}
          />
        ))}
      </TodoList>
    </>
  );
}
