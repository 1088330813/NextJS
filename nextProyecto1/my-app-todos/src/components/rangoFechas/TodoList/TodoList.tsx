import { Table,ColumnsType } from "antd";
import variables from "@/app/styles/variables.module.scss";

interface Todo {
  key: number;
  Texto: string;
  Fecha: Date;
}

interface Props {
  dataSource: Todo[];
  columns: ColumnsType<Todo>;
}

export function TodoList({ dataSource, columns }: Props) {
  return (
    <Table
      className={variables.tabla}
      dataSource={dataSource}
      columns={columns}
    />
  );
}
