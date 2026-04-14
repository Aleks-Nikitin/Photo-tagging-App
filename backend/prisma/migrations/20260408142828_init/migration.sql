-- CreateTable
CREATE TABLE "Character" (
    "id" SERIAL NOT NULL,
    "xCoord" DECIMAL(65,30) NOT NULL,
    "yCoord" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);
