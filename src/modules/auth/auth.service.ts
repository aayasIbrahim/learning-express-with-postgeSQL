import bcrypt from "bcrypt";
import { pool } from "../../db";
import jwt, { type JwtPayload, type SignOptions } from "jsonwebtoken";
import config from "../../config";

const loginUserIntoDB = async (payload: any) => {
  const { email, password } = payload;
  // 1. Check if the user exists -> Done  //should be email
  // 2. Compare the password -> Done
  //3. Generate Token -> Done

  // 1. Check if the user exists -> Done  //should be email
  const userData = await pool.query(`SELECT * FROM users WHERE email=$1`, [
    email,
  ]);

  if (userData.rows.length === 0) {
    throw new Error("Invalid Credentials!");
  }

  // 2. Compare the password -> Done
  const user = userData.rows[0];

  // console.log("Plain Password:", password, typeof password);
  // console.log("Hashed Password:", user?.password, typeof user?.password);

  const matchPassword = await bcrypt.compare(String(password), user.password); ///return boolean
  //   console.log(matchPassword)

  if (!matchPassword) {
    throw new Error("Invalid Credentials and password dontchange");
  }
  //3. Generate Token
  const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    password: user.password,
    is_active: user.is_active,
  };
  const accessToken = await jwt.sign(jwtPayload, config.secret as string, {
    expiresIn: config.access_expires_in as any,
  });
  const refreshToken = await jwt.sign(
    jwtPayload,
    config.refresh_secret as string,
    {
      expiresIn: config.refresh_expires_in as any,
    },
  );
  // console.log('AccessToken',accessToken)

  return { accessToken, refreshToken };
};
const genarateRefreshToken = async (token: string) => {
  // console.log(token,"genratefreshtoken")
  if (!token) {
    throw new Error("Unauthorized");
  }

  const decoded = jwt.verify(
    token as string,
    config.refresh_secret as string,
  ) as JwtPayload;

  const userData = await pool.query(
    `
     SELECT * FROM users WHERE email=$1   
        `,
    [decoded.email],
  );

  const user = userData.rows[0];

  if (userData.rows.length === 0) {
    throw new Error("User not found!!");
  }

  if (!user?.is_active) {
    throw new Error("Forbidden!!");
  }

  const jwtpayload = {
    id: user.id,
    name: user.name,
    role: user.role,
    is_active: user.is_active,
    email: user.email,
  };

  const accessToken = jwt.sign(jwtpayload, config.secret as string, {
    expiresIn: config.access_expires_in as any,
  });

  return { accessToken };
};
export const authService = {
  loginUserIntoDB,
  genarateRefreshToken,
};
