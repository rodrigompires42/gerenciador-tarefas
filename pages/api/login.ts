import type { NextApiRequest, NextApiResponse } from 'next';
import { DefaultMsgResponse } from '../../types/DefaultMsgResponse';

export default (req: NextApiRequest, res: NextApiResponse<DefaultMsgResponse>) => {

    if(req.method === "POST") {

        const {login, password} = req.body;
        if (login === "rodrigompires42" && password === "password") {
            return res.status(200).json({msg: "authenticated"})    
        }
        return res.status(401).json({error: "user not found"})
    }

    return res.status(405).json({error: "method not allowed"})
    
}