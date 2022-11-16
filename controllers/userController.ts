import  { User }  from '../models/model';

interface UserParams {
    name: string
}

class UserController {
    async getAllUsers(req: any, res:  any) {
        const users = await User.findAll();
        return res.json({users})
    };

    async createUser (req: any, res:  any) {
        const { name }: UserParams = req.body;
        const newUser = await User.create({name});

        return res.json({newUser})
    }
}
export default new UserController();
