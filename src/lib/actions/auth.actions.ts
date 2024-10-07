"use server";
import { generateId } from "lucia";
import db from "../db/index";
import { userTable } from "../db/schema";
import * as argon2 from "argon2";
import { eq } from "drizzle-orm";
import { lucia } from "../auth";
import { cookies } from "next/headers";

export const signUp = async (name: string, email: string, password: string) => {
  try {
    const hashedPassword = await argon2.hash(password);
    const id = generateId(20);
    const newUser = await db
      .insert(userTable)
      .values({
        id,
        email,
        password: hashedPassword,
        name,
      })
      .returning({
        name: userTable.name,
        email: userTable.email,
        id: userTable.id,
      });

    return { newUser };
  } catch (e) {
    return { error: e };
  }
};

export const login = async (email: string, password: string) => {
  try {
    const user = await db
      .select({
        password: userTable.password,
        id: userTable.id,
      })
      .from(userTable)
      .where(eq(userTable.email, email));

    if (!user) {
      return { error: "User not found" };
    }

    const { password: hashedPassword, id } = user[0];
    const isPasswordCorrect = await argon2.verify(hashedPassword, password);
    if (!isPasswordCorrect) {
      return { error: "Wrong password" };
    }

    const session = await lucia.createSession(id, {
      expiresAt: new Date(Date.now() + 60 * 60 * 1000),
    });
    const sessionCookie = lucia.createSessionCookie(id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
    console.log("session : ", session);
    console.log("sessionCookie : ", sessionCookie);

    return { message: "Logged in successfully ^__^" };
  } catch (error) {
    return {
      error: error,
    };
  }
};
