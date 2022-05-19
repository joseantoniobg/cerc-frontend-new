import cookie from "cookie";
import type { NextApiRequest, NextApiResponse } from "next";
import { AxiosRequestConfig } from "axios";
import { api } from "../../config/index";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse<any>) => {
  if (req.method === "POST") {
    if (!req.headers.cookie) {
      res.status(403).json({ message: "Not Authorized" });
      return;
    }

    const { token } = cookie.parse(req.headers.cookie);

    const params: AxiosRequestConfig = {
      ...req.body,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const strapiRes = await api.request(params).catch((e) => {
      res.status(403).json({ message: "User forbidden" });
    });

    if (strapiRes) res.status(200).json({ user: strapiRes.data });
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} not allowed!` });
  }
};
