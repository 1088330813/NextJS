import type { TimePickerProps } from "antd";
import { Space, TimePicker } from "antd";

const onChange: TimePickerProps["onChange"] = (time, timeString) => {
  console.log(time, timeString);
};

interface TodoInputHoursProps {
  setHoraParaEjecucion: React.Dispatch<React.SetStateAction<Date>>;
  horaParaEjecucion: Date;
}
export const TodoInputHours = ({
  setHoraParaEjecucion,
}: TodoInputHoursProps) => {
  return (
    <Space wrap>
      <TimePicker
        // value={horaParaEjecucion}
        onChange={(time) => {
          if (time) {
            const date = time.toDate();
            console.log("Hora seleccionada:", date);
            setHoraParaEjecucion(date);
          } else {
            const defaultDate = new Date();
            console.log("Hora predeterminada:", defaultDate);
            setHoraParaEjecucion(defaultDate);
          }
        }}
        use12Hours
        format="h:mm a"
        placeholder="Hora"
      />
    </Space>
  );
};
