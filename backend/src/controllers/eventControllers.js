const prisma = require("../db");

const getEventById = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(Number(id))) {
      return res.status(400).json({ message: "Invalid event ID format." });
    }

    const event = await prisma.event.findUnique({
      where: { id: BigInt(id) },
    });

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    return res.status(200).json(event);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

module.exports = { getEventById };
