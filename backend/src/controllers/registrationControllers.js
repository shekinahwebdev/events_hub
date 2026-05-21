const prisma = require("../db");

const registerForEvent = async (req, res) => {
  try {
    const { eventId } = req.body;

    const userId = req.user.userId;

    if (!eventId) {
      return res.status(400).json({ message: "Event ID is required." });
    }

    // convert to BigInt safely for the lookup query
    const targetEventId = BigInt(eventId);

    console.log(targetEventId);

    const event = await prisma.event.findUnique({
      where: { id: targetEventId },
    });

    if (!event) {
      return res.status(404).json({ message: "Event not found." });
    }

    if (event.remainingSlots <= 0) {
      return res
        .status(400)
        .json({ message: "This event is completely full!" });
    }

    const [newRegistration, updatedEvent] = await prisma.$transaction([
      prisma.registration.create({
        data: {
          userId: BigInt(userId),
          eventId: targetEventId,
        },
      }),
      prisma.event.update({
        where: { id: targetEventId },
        data: { remainingSlots: event.remainingSlots - 1 },
      }),
    ]);

    return res.status(201).json({
      message: "Successfully registered for this event! 🎟️",
      registration: newRegistration,
    });
  } catch (error) {
    console.error("Registration Error Detail:", error);

    if (error.code === "P2002") {
      return res
        .status(400)
        .json({ message: "You are already registered for this event." });
    }

    return res
      .status(500)
      .json({ message: "Registration failed.", error: error.message });
  }
};

module.exports = { registerForEvent };
