import { Response } from 'express'
import { RequestWithSession } from '../index'


const logout = (req: RequestWithSession, res: Response) => {
    if (req.session.userId !== undefined) {
        console.log('setting user id to undefined')
        req.session.userId = undefined;
    }
    res.status(200).send("{}")
}

export default logout