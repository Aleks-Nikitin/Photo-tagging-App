import { prisma } from "./lib/prisma.js";
async function main() {
  // Create a new character
  const char1 = await prisma.character.create({
    data: {
      xCoord: (127/2356),
      yCoord: (318/1270),
    },
  });
  console.log("Created char:", char1);
    const char2 = await prisma.character.create({
    data: {
      xCoord: (2127/2356),
      yCoord: (917/1270),
    },
  });
  console.log("Created char:", char2);
  // Fetch all characters
  const allChars = await prisma.character.findMany();
  console.log("All Characters:", JSON.stringify(allChars, null, 2));
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });