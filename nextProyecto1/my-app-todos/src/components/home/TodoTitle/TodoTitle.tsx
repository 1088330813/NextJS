import variables from "@/app/styles/variables.module.scss";
import { ReactNode } from "react";

interface Props {
  numTareasCompletas: number;
  totalTodos: number;
  timeSaving:number;
  children?: ReactNode;
}

export const TodoTitle = (props: Props) => {
  return (
    <>
      {" "}
      <div className={variables.title}>
        <div>{props.children}</div>
        <h1>Hoy has completado {props.numTareasCompletas} TAREAS</h1>
        <h2> Quedan {props.totalTodos} pendientes</h2>
        {props.timeSaving>0 ? 
        (<h3 style={{color:'green'}}> {props.timeSaving} minutos ahorrados</h3>
        ):props.timeSaving<0 ? (<h3 style={{color:'red'}}>{props.timeSaving} minutos perdidos</h3>):(<h2></h2>)
      }
      
      </div>
    </>
  );
};
