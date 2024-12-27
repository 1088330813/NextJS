import variables from "@/app/styles/variables.module.scss";

interface Props {
  numTareasCompletas: number;
  todo: { text: string; status: boolean; id: number; createdAt: Date };
  todos: { text: string; status: boolean; id: number }[];

  setNumTareasCompletas: React.Dispatch<React.SetStateAction<number>>;
  index: number;
  setTareasCompletas: React.Dispatch<
    React.SetStateAction<{ text: string; status: boolean; id: number }[]>
  >;
  setTodos: React.Dispatch<
    React.SetStateAction<{ text: string; status: boolean; id: number }[]>
  >;
}
const valorSpan: number = 8;
import { Col, Row } from "antd";
export const TodoItem = (props: Props) => {
  const createdAt =
    props.todo.createdAt instanceof Date
      ? props.todo.createdAt
      : new Date(props.todo.createdAt);
  return (
    <>
      <li className={variables.items}>
        <Row>
          <Col span={valorSpan} className={variables.taskTodos}>
            {" "}
            <p className={variables.parrafo}>
              {createdAt.toLocaleTimeString("es-CO", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
              --- {props.todo.text}
            </p>
          </Col>
        </Row>
      </li>
    </>
  );
};
