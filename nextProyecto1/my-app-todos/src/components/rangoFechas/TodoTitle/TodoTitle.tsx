import variables from "@/app/styles/variables.module.scss";
// import { ReactNode } from "react";

// interface Props {
//   numTareasCompletas: number;
//   totalTodos: number;
//   children?: ReactNode;
//   titulo: string;
// }

export const TodoTitle = () => {
  const titulo: string = "Consulta Tareas x Fecha";
  return (
    <>
      {" "}
      <div className={variables.title}>
        <h1>{titulo}</h1>
      </div>
    </>
  );
};
