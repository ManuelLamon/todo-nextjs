import type { NextApiRequest, NextApiResponse } from "next";
import {serialize} from 'cookie'

export default function logoutHandle(req: NextApiRequest, res: NextApiResponse) {

    const serializado = serialize('MyTokenSesion',"",{
        httpOnly:true,
        secure: process.env.NODE_ENV === "production",
        sameSite:'strict',
        maxAge:0,
        path:'/'
    })

    res.setHeader('Set-Cookie',serializado)
    return res.status(200).json('')
    
}
