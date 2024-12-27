import variables from "@/app/styles/variables.module.scss";

interface Props {
  searchValue: string;
  setSearchValue: (value: string) => void;
}

export const TodoSearch = (props: Props) => {
  return (
    <input
      className={variables.button}
      placeholder="Buscar"
      value={props.searchValue}
      onChange={(event) => {
        props.setSearchValue(event.target.value);
        console.log(props.searchValue);
      }}
    />
  );
};
