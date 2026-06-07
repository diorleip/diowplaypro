import jwt from "jsonwebtoken";

const SECRET = "diowplay_secret";

export function createToken(
  id: string,
  perfil: string
) {
  return jwt.sign(
    {
      id,
      perfil,
    },
    SECRET,
    {
      expiresIn: "7d",
    }
  );
}