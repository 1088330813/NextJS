"use client";

import { TodoTitle } from "../components/home/TodoTitle";
import { TodoItem } from "../components/home/TodoItem";
import { TodoSearch } from "../components/home/TodoSearch";
import { TodoList } from "../components/home/TodoList";
import { TodoSave } from "../components/home/TodoSave";
import { useState, useEffect } from "react";

export default function Home() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [numTareasCompletas, setNumTareasCompletas] = useState<number>(0);
  const [tareasCompletas, setTareasCompletas] = useState<
    Array<{ text: string; status: boolean; id: number }>
  >([]);
  const [todos, setTodos] = useState<
    Array<{ text: string; status: boolean; id: number; objectiveTime: Date }>
  >([]);
  const [valueSave] = useState<string>("");
  //validacion para busqueda que lo convierte en minusculaa para ser comparable
  const searchedTodos = todos.filter((todo) => {
    return todo.text.toLowerCase().includes(searchValue.toLowerCase());
  });
  //validacion por consola para ver que se escribe en el input
  const totalTodos = todos.length;
  console.log("esto es lo que escribe el usuario " + searchValue);
  //este trae la informacion de la base de datos hace el GET al API
  useEffect(() => {
    fetch("/api/todos")
      .then((res) => res.json())
      .then((data) => {
        const tareasPorCompletar = data
          .filter((todo: { status: boolean }) => todo.status === false)
          .map(
            (todo: {
              text: string;
              status: boolean;
              id: number;
              objectiveTime: string;
            }) => ({
              ...todo,
              objectiveTime: new Date(todo.objectiveTime),
            })
          );
        const tareasCompletas = data.filter(
          (todo: { status: boolean }) => todo.status === true
        );
        setTodos(tareasPorCompletar);
        setNumTareasCompletas(tareasCompletas.length);
      });
  }, []);

  return (
    <>
      <TodoTitle
        numTareasCompletas={numTareasCompletas}
        totalTodos={totalTodos}
      />
      <TodoSave valueSave={valueSave} setTodos={setTodos} todos={todos} />
      <TodoSearch searchValue={searchValue} setSearchValue={setSearchValue} />
      <TodoList>
        {searchedTodos.map((todo, index) => (
          <TodoItem
            numTareasCompletas={numTareasCompletas}
            tareasCompletas={tareasCompletas}
            key={index}
            infoCompleta={todo}
            setTodos={setTodos}
            todos={todos}
            setNumTareasCompletas={setNumTareasCompletas}
            setTareasCompletas={setTareasCompletas}
          />
        ))}
      </TodoList>
    </>
  );
}
