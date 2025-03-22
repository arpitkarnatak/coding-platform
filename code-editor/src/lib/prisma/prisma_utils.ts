// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

// Create a global variable to store the Prisma instance
const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Check if we already have a Prisma instance, if not create one
const prisma = globalForPrisma.prisma || new PrismaClient();

// In development, save the Prisma instance to the global object
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma