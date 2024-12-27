import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { text, objectiveTime } = await request.json();
    console.log("Datos recibidos:", { text, objectiveTime });
    const newItemType = await prisma.todos.create({
      data: { text, objectiveTime },
    });
    console.log("Nuevo elemento creado en la base de datos:", newItemType);
    return new Response(JSON.stringify(newItemType), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
}
export async function GET() {
  try {
    const todosLosDatos = await prisma.todos.findMany();
    return Response.json(todosLosDatos);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
