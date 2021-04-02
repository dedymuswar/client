import {SIGN_IN, SIGN_OUT } from './types'
export const signIn = (idUser) => {
    return {
        type: SIGN_IN,
        payload: idUser
    }
}

export const signOut = () => {
    return {
        type: SIGN_OUT
    }
}