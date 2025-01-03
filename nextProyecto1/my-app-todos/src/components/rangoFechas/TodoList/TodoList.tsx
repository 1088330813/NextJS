import { Table} from "antd";
import { ColumnsType } from 'antd/es/table';
import variables from "@/app/styles/variables.module.scss";

interface Todo {
  key: number;
  Texto: string;
  Fecha: string;
  Hora: string;
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
