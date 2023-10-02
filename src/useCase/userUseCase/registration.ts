import userRepository from "../../repositorys/userRepository"

export interface userSignup {
    userName: string,
    email: string,
    mobile: string,
    password: string,
}

export interface userGoogleSignUp {
    userName: string,
    email: string,
}

export default {
    register: async (data: userSignup) => {
        try {
            const checkEmail = await userRepository.checkEmail(data.email)

            if (checkEmail) {
                throw new Error("User already exists. Please sign in.");
            }
            else {
                const checkMobile = await userRepository.checkMobile(data.mobile)

                if (checkMobile) {
                    throw new Error("User with the same mobile number already exists");
                }
                else {
                    const saveUser = await userRepository.saveUser(data)
                    return true
                }
            }

        } catch (error) {
            throw new Error((error as Error).message)
        }
    },

    googleSignUp: async (data: userGoogleSignUp) => {
        try {
            const checkEmail = await userRepository.checkEmail(data.email)

            if (checkEmail) {
                throw new Error("User already exists. Please sign in.");
            }
            else {
                const saveUser = await userRepository.saveUser(data)
                return true
            }

        } catch (error) {
            throw new Error((error as Error).message)
        }
    }
}

// { displayName: 'Muhammad Aslam K A', email: 'aslamka.2k3@gmail.com' }