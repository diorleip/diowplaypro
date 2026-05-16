import jwt from "jsonwebtoken";

const SECRET = "diowplay_secret";

export function createToken(id: string) {
  return jwt.sign(
    { id },
    SECRET,
    {
      expiresIn: "7d",
    }
  );
}