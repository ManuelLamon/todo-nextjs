import { PB } from '../utils/index'

type credential = {
    email:string,
    password:string
}

const CollectionsAuthServices = async (collection: string, credential:credential) => {
    const {email, password } = credential

    const authData = await PB.collection('users').authWithPassword(
        email,
        password,
    )
    return authData
}

export default CollectionsAuthServices;