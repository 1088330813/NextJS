"use client";

import { TodoTitle } from "../components/home/TodoTitle";
import { TodoItem } from "../components/home/TodoItem";
import { TodoSearch } from "../components/home/TodoSearch";
import { TodoList } from "../components/home/TodoList";
import { TodoSave } from "../components/home/TodoSave";
import { useState, useEffect } from "react";

export default function Home() {
  const [timeSaving,setTimeSaving] =useState<number>(0)
  const [searchValue, setSearchValue] = useState<string>("");
  const [numTareasCompletas, setNumTareasCompletas] = useState<number>(0);
  const [tareasCompletas, setTareasCompletas] = useState<
    Array<{ text: string; status: boolean; id: number }>
  >([]);
  const [todos, setTodos] = useState<
    Array<{ text: string; status: boolean; id: number; objectiveTime: Date ;completeTime:Date}>
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
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Asegúrate de comparar solo la fecha, no el tiempo
        
        const minutosAhorrados = data
          .filter((todo: { status: boolean; diferenceTime: number; objectiveTime: string }) => {
            const todoDate = new Date(todo.objectiveTime);
            todoDate.setHours(0, 0, 0, 0); // Remueve la parte de la hora para la comparación
              console.log('todoDate:',todoDate.getTime(),'today:',today.getTime())
            return (
              todo.status === true &&
              todo.diferenceTime != null &&
              todoDate.getTime() === today.getTime()
            );
          })
          .reduce((acc, todo) => acc + (todo.diferenceTime || 0), 0);
          
        console.log('estos son los minutos ahorrados:',minutosAhorrados)
        setTimeSaving(minutosAhorrados);

        const tareasCompletasHoy = data
        .filter((todo: { status: boolean;completeTime: string }) => {
          const todoDate = new Date(todo.completeTime);
          todoDate.setHours(0, 0, 0, 0); // Remueve la parte de la hora para la comparación
            console.log('todoDate:',todoDate.getTime(),'today:',today.getTime())
          return (
            todo.status === true &&
            todoDate.getTime() === today.getTime()
          );
        })
        setNumTareasCompletas(tareasCompletasHoy.length);

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
          (todo: { status: boolean }) => todo.status === true && todo
        );
        setTodos(tareasPorCompletar);
      });
  }, []);

  return (
    <>
      <TodoTitle
        numTareasCompletas={numTareasCompletas}
        totalTodos={totalTodos}
        timeSaving={timeSaving}
      />
      <TodoSave valueSave={valueSave} setTodos={setTodos} todos={todos} />
      <TodoSearch searchValue={searchValue} setSearchValue={setSearchValue} />
      <TodoList>
        {searchedTodos.map((todo, index) => (
          <TodoItem
           setTimeSaving={setTimeSaving}
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
