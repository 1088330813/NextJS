import { Table } from "antd";
import variables from "@/app/styles/variables.module.scss";

interface Todo {
  key: number;
  Texto: string;
  Fecha: Date;
}

interface Props {
  dataSource: Todo[];
  columns: any[];
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
