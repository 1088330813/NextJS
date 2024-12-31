import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(req: Request) {
  try {
    //Asi se obtiene el id desde la URL
    const url = new URL(req.url);
    const id = parseInt(url.pathname.split("/").pop() as string);

    if (!id) {
      return NextResponse.json(
        { error: "El ID es requerido" },
        { status: 400 }
      );
    }
    await prisma.todos.delete({
      where: { id },
    });
    return NextResponse.json({
      message: "TODO eliminado con exito!",
    });
  } catch (error) {
    console.error("error al eliminar TODO", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    //Asi se obtiene el id desde la URL
    const url = new URL(req.url);
    const id = parseInt(url.pathname.split("/").pop() as string);

    if (!id) {
      return NextResponse.json(
        { error: "El ID es requerido" },
        { status: 400 }
      );
    }
    const nuevaFecha = new Date();
    // Para modificar las horas
    const nuevaFechaModificada = nuevaFecha
    //  ? new Date(nuevaFecha.setHours(15))
      ? 
        new Date(nuevaFecha)
      : null;

      const registroActual = await prisma.todos.findUnique({
        where:{id},
      });
      if(!registroActual){
        return NextResponse.json(
          {error:"Registro no encontrado"},
          {status:404}
        );
      }
      const objectiveTime= new Date(registroActual.objectiveTime);

      const diferenceTime=nuevaFechaModificada ? (objectiveTime.getTime()-nuevaFechaModificada.getTime())/60000:null;//divido por 60000 para poder sacar los minutos
      //se podria usar math.abs, cuando necesitemos traer solo numeros positivos

    const updatedTodo= await prisma.todos.update({
      where: { id },
      data: { 
        status: true, 
        createdAt: nuevaFechaModificada, 
        completeTime:nuevaFechaModificada,
        diferenceTime:diferenceTime },
    });
    return NextResponse.json({
      message: "ESTADO actualizadco con exito!",
      updatedTodo: updatedTodo
    });
  } catch (error) {
    console.error("error al actualizar el estado", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
