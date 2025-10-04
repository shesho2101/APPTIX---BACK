import jwt, { SignOptions, JwtPayload } from "jsonwebtoken";

const SECRET_KEY: string = process.env.JWT_SECRET || "supersecret";

export const generateToken = (
  payload: object | string,
  expiresIn: SignOptions["expiresIn"] = "7d" // 👈 usamos el tipo correcto de la lib
): string => {
  const options: SignOptions = { expiresIn };
  return jwt.sign(payload, SECRET_KEY, options);
};

export const verifyToken = (token: string): string | JwtPayload => {
  return jwt.verify(token, SECRET_KEY);
};
