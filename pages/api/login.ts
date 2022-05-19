import cookie from "cookie";
import type { NextApiRequest, NextApiResponse } from "next";
import { AxiosRequestConfig } from "axios";
import { api } from "../../config/index";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse<any>) => {
  if (req.method === "POST") {
    const { login, password } = req.body;
    const params: AxiosRequestConfig = {
      method: "POST",
      url: "/auth/token",
      data: {
        client_id: login,
        client_secret: password,
        grant_type: "client credentials",
      },
      headers: {
        "Content-Type": "application/json",
      },
    };

    const tokenRes = await api.request(params).catch((e) => {
      res.status(e.response.status).json({ message: e.response.data.message });
    });

    if (tokenRes && tokenRes.status !== 201) {
      res.status(tokenRes.status).json({ message: tokenRes.data.message });
    } else if (tokenRes) {
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", tokenRes.data.access_token, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          maxAge: 3600,
          sameSite: "strict",
          path: "/",
        })
      );
      res.status(200).json({ user: tokenRes.data.user });
    }
  }
};
