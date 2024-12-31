import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import variables from "@/app/styles/variables.module.scss";

interface Props {
  infoCompleta: {
    status: boolean;
    text: string;
    id: number;
    objectiveTime: Date;
  };
  timeSaving:number;
  numTareasCompletas: number;
  tareasCompletas: {
    text: string;
    status: boolean;
    id: number;
    objectiveTime: Date;
  };
  setTimeSaving:React.Dispatch<React.SetStateAction<number>>;
  setNumTareasCompletas: React.Dispatch<React.SetStateAction<number>>;
  key: number;
  setTareasCompletas: React.Dispatch<
    React.SetStateAction<{ text: string; status: boolean; id: number }[]>
  >;
  setTodos: React.Dispatch<
    React.SetStateAction<{ text: string; status: boolean; id: number }[]>
  >;
  todos: { text: string; status: boolean; id: number }[];
  todo: { text: string; status: boolean; id: number; objectiveTime: Date };
}
const valorSpan: number = 8;
import { Button, Col, Row } from "antd";
export const TodoItem = (props: Props) => {
  //funcion que realiza el DELETE en la API
  const deleteTodoToApi = async (id: number) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Error al eliminar el TODO con ID:${id}`);
      }
      const data = await response.json();
      //Este actualiza el array que muestra, sacando el que eliminamos
      props.setTodos((todos) => todos.filter((todo) => todo.id !== id));
      console.log("Todo eliminado", data);
    } catch (error) {
      console.error("Error al eliminar TODO:", error);
    }
  };
  //funcion que realiza actualizacion del estado PATCH en el API
  const UpdateStatusTodoToApi = async (id: number) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "PATCH",
      });
      if (!response.ok) {
        throw new Error(`Error al actualizar el estado d el TODO con ID:${id}`);
      }
      const data = await response.json();
      console.log("Revisa esta data",data.diferenceTime)
      //Este actualiza el array que muestra, sacando el que eliminamos
      props.setTodos((todos) => todos.filter((todo) => todo.id !== id));
      console.log("Todo Actualizado en su estado", data.updatedTodo.diferenceTime);
      props.setNumTareasCompletas(props.numTareasCompletas + 1);
      props.setTimeSaving((valorAnterior)=>valorAnterior+data.updatedTodo.diferenceTime)
    } catch (error) {
      console.error("Error al actualizar TODO:", error);
    }
  };
  return (
    <>
      <li className={variables.items}>
        <Row>
          <Button
            className={variables.buttonItem}
            icon={<CheckOutlined />}
            color="primary"
            onClick={() => UpdateStatusTodoToApi(props.infoCompleta.id)}>
            {props.infoCompleta.status}
          </Button>
          <Col span={valorSpan} className={variables.taskTodos}>
            <p>
              {props.infoCompleta.text} -{" "}
              {props.infoCompleta.objectiveTime instanceof Date
                ? props.infoCompleta.objectiveTime.toLocaleTimeString("es-CO", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })
                : "Sin hora definida"}
            </p>
          </Col>

          <Button
            className={variables.buttonItem}
            onClick={() => deleteTodoToApi(props.infoCompleta.id)}
            icon={<CloseOutlined />}
            color="danger"
            variant="outlined"></Button>
        </Row>
      </li>
    </>
  );
};
