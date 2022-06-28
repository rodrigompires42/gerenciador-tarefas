import type {NextApiRequest, NextApiResponse} from "next"

import {UserModel} from "../../models/UserModel"
import { DefaultMsgResponse } from "../../types/DefaultMsgResponse"
import {connect} from "../../middlewares/connectToMongoDB"

const registerEndpoint = async (req: NextApiRequest, res: NextApiResponse<DefaultMsgResponse>) => {
    try{
        if(req.method === "GET") {
            const users = await UserModel.find().select({"name": 1, "email":1, "password":1, "_id": 0})
            return res.status(200).json({users: users})
        }

        if(req.method === "POST"){
            const {name, email, password} = req.body;

            if(!name || name.trim().length < 2) {
                return res.status(400).json({error: "invalid name"})
            }
            if(!email || email.trim().length < 5 || !email.includes("@") || !email.includes(".") ) {
                return res.status(400).json({error: "invalid email"})
            }
            if(!password || password.trim().length < 6) {
                return res.status(400).json({error: "invalid password"})
            }

            const user = {
                name,
                email,
                password
            }

            await UserModel.create(user);
            return res.status(201).json({msg: "user created"})

        }
        return res.status(405).json({error: "method not allowed"})

    } catch(e){
        console.log(`Error on create user: ${e}`)
        return res.status(500).json({error: "error creating user"})
    }
}

export default connect(registerEndpoint);