import variables from "@/app/styles/variables.module.scss";
import { ReactNode } from "react";

interface Props {
  numTareasCompletas: number;
  totalTodos: number;
  children?: ReactNode;
}

export const TodoTitle = (props: Props) => {
  return (
    <>
      {" "}
      <div className={variables.title}>
        <div>{props.children}</div>
        <h1>Tienes {props.numTareasCompletas} TAREAS completadas</h1>
        <h2> {props.totalTodos} por completar</h2>
      </div>
    </>
  );
};
