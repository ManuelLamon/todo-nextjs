import type { NextApiRequest, NextApiResponse } from "next";
import { PB } from "../../../utils";
import { serialize } from "cookie";

export default async function loginHandle(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log(req.body);

    const query = await PB.collection("users").authWithPassword(req.body.usernameOREmail, req.body.password);
    console.log(query);

    const serializado = serialize("MyTokenSesion", query.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24 * 30,
      path: "/",
    });

    res.setHeader("Set-Cookie", serializado);
    return res.status(200).json(query);
  } catch (error) {
    console.log(error);
    return res.status(404).json(error);
  }
}
