import variables from "@/app/styles/variables.module.scss";
import { ReactNode } from "react";

interface Props {
  numTareasCompletas: number;
  totalTodos: number;
  children?: ReactNode;
  titulo: string;
}

export const TodoTitle = (props: Props) => {
  return (
    <>
      {" "}
      <div className={variables.title}>
        <h1>{props.titulo}</h1>
      </div>
    </>
  );
};
