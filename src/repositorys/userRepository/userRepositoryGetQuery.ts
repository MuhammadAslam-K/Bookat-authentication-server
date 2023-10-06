import UserSchema from "../../entites/userEntites"


export default {
    getUser: async (field: string, data: string) => {
        try {
            const query: { [key: string]: string } = {};
            query[field] = data;
            return await UserSchema.find(query);
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

}