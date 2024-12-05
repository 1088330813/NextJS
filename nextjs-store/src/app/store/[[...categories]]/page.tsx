
//Aqui se crea la interfaz que es una buena practica para saber que datos va a traer
interface CategoryProps {
    params:{
        categories:string[],
        searchParams?: string[]
    }
}

export default function categories(props:CategoryProps){
    const {categories}=props.params
    console.log(categories)     
    return (
    <h1> Esta es la pagina de categoria:{categories}</h1> 
)
}