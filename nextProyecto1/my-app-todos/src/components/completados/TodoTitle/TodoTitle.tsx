import variables from "@/app/styles/variables.module.scss";



export const TodoTitle = () => {
  const titulo: string = "Tareas Completadas HOY";
  return (
    <>
      {" "}
      <div className={variables.titleCompletados}>
        <h1>{titulo}</h1>
      </div>
    </>
  );
};
