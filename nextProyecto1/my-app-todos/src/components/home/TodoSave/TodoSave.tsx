import variables from "@/app/styles/variables.module.scss";
import { TodoInputHours } from "../TodoInputHours";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";

interface Props {
  valueSave: string;
  setTodos: React.Dispatch<
    React.SetStateAction<
      {
        text: string;
        status: boolean;
        id: number;
        objectiveTime: Date;
        completeTime:Date;
      }[]
    >
  >;
  todos: {
    text: string;
    status: boolean;
    id: number;
    objectiveTime: Date;
  }[];
}

export const TodoSave = (props: Props) => {
  const [valueSave, setValueSave] = useState<string>("");
  const [horaParaEjecucion, setHoraParaEjecucion] = useState<Date>(new Date());

  // Método POST para guardar los nuevos datos
  const sendTodoToApi = async (newTodo:{
      text: string,
      status: boolean,
      objectiveTime: Date,
  }) => {
    try {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });
      if (!response.ok) {
        throw new Error("Error al enviar el TODO");
      }
      // guarda en una variable la respuesta
      const data = await response.json();
      console.log("TODO enviado:", data);
      // Este actualiza el array que muestra usando newTodo
      const todoConHoraActualizada = {
        ...data,
        objectiveTime: horaParaEjecucion,
      };
      // Se usa id,text desde la base de datos, ya que se requiere este primero para eliminar o actualizar, pero se trae la hora del input porque genera inconvenientes al traerlo desde la base de datos, viene en otro tipo diferente a Date
      props.setTodos((prevTodos) => [...prevTodos, todoConHoraActualizada]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSave = () => {
    if (valueSave.trim() === "") {
      console.error("El valor está vacío. Por favor, ingrese un TODO.");
      return;
    }

    const newTodo = {
      text: valueSave,
      status: false,
      id: props.todos.length + 1, // Genera un ID basado en la longitud actual
      objectiveTime: horaParaEjecucion, // Usa la fecha y hora seleccionada
    };

    console.log("Enviando a la API:", newTodo);
    sendTodoToApi(newTodo);
    setValueSave(""); // Limpia el campo de texto después de guardar
  };

  return (
    <>
      <input
        className={variables.button}
        placeholder="Nueva Tarea"
        value={valueSave}
        onChange={(event) => {
          setValueSave(event.target.value);
          console.log(event.target.value);
        }}
      />
      <TodoInputHours
        setHoraParaEjecucion={setHoraParaEjecucion}
        horaParaEjecucion={horaParaEjecucion}
      />
      <Button
        shape="circle"
        icon={<PlusOutlined />}
        onClick={handleSave}></Button>
    </>
  );
};
