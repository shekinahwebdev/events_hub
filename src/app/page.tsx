import { prisma } from "@/lib/db";

const page = async () => {
  const events = await prisma.event.findMany();

  return (
    <main>
      <h1>Events hub</h1>
      {events.map((event: any) => (
        <div key={event.id.toString()}>
          <h2>{event.title}</h2>
          <p>{event.description}</p>
          <p>{event.location}</p>
          <p>{event.total_slots}</p>
          <p>Slots left: {event.remainingSlots}</p>
        </div>
      ))}
    </main>
  );
};

export default page;
