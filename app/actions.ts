"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

function generateCode(length = 5): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return Array.from(
    { length },
    () => chars[Math.floor(Math.random() * 26)],
  ).join("");
}

export async function createInvitation(recipient: string, maxGuests: number) {
  let code = generateCode();
  for (let i = 0; i < 10; i++) {
    try {
      return await prisma.invitation.create({
        data: { code, recipient, maxGuests },
      });
    } catch (err: unknown) {
      if ((err as { code?: string })?.code === "P2002") {
        code = generateCode();
      } else {
        throw err;
      }
    }
  }
  throw new Error("No se pudo generar un código único");
}

export async function lookupInvitation(code: string) {
  return prisma.invitation.findUnique({
    where: { code: code.trim().toUpperCase() },
  });
}

export interface GuestPayload {
  name: string;
}

export interface RsvpPayload {
  invitationId?: string;
  name: string;
  phone?: string;
  attending: boolean;
  message: string;
  guests: GuestPayload[];
}

export async function submitRsvp(data: RsvpPayload) {
  if (data.invitationId) {
    const invitation = await prisma.invitation.findUnique({
      where: { id: data.invitationId },
    });
    if (!invitation) throw new Error("Código de invitación inválido");
    if (data.attending && data.guests.length > invitation.maxGuests) {
      throw new Error(
        `Tu invitación permite máximo ${invitation.maxGuests} persona${invitation.maxGuests !== 1 ? "s" : ""}`,
      );
    }
  }

  await prisma.rsvp.create({
    data: {
      invitationId: data.invitationId ?? null,
      name: data.name.trim(),
      phone: data.phone?.trim() || null,
      attending: data.attending,
      message: data.message.trim(),
      guests:
        data.attending && data.guests.length > 0
          ? {
              create: data.guests.map((g) => ({
                name: g.name.trim(),
              })),
            }
          : undefined,
    },
  });
  revalidatePath("/");
}
