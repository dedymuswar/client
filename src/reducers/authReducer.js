const INITIAL_STATE = {
    isSignedIn: null, //didefenisikan dulu 
    idUser: null 
}
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = INITIAL_STATE, action ) => {
    //action diambil dari combn
    switch(action.type){
        case 'SIGN_IN':
            return { ...state, isSignedIn: true, idUser: action.payload}
        case 'SIGN_OUT':
            return  {...state, isSignedIn: false, idUser:null}
        default:
            return state
        }
}