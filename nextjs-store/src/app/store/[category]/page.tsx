
//Aqui se crea la interfaz que es una buena practica para saber que datos va a traer
interface CategoryProps {
    params:{
        category:string
    }

}

export default function Category(props:CategoryProps){
    const {category}=props.params
    return (
    <h1> Esta es la pagina de categoria:{category}</h1> 
)
}