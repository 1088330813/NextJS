import { TodoList } from "../../rangoFechas/TodoList";

interface Props {
  tareasCompletas: {
    text: string;
    status: boolean;
    id: number;
    createdAt: Date;
  }[];
}
export const TodoItem = (props: Props) => {
  const dataSource = props.tareasCompletas.map((todo, index) => ({
    key: index + 1,
    Texto: todo.text,
    Hora: new Date(todo.createdAt).toLocaleTimeString("es-CO", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }),
    Fecha: new Date(todo.createdAt).toLocaleDateString("es-CO", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    }),
  }));

  const columns = [
    {
      title: "Fecha Ejecucion",
      dataIndex: "Fecha",
      key: "key",
    },
    {
      title: "Hora Ejecucion",
      dataIndex: "Hora",
      key: "key",
    },
    {
      title: "Indice",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Nombre",
      dataIndex: "Texto",
      key: "key",
    },
  ];

  return (
    <>
      {props.tareasCompletas.length > 0 ? (
        <TodoList dataSource={dataSource} columns={columns} />
      ) : (
        <p>No hay tareas para mostrar.</p>
      )}
    </>
  );
};
