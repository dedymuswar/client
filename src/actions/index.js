import streams from '../apis/streams'
import history from '../history'
import {
    SIGN_IN,
    SIGN_OUT,
    CREATE_STREAM,
    FETCH_STREAMS,
    FETCH_STREAM,
    DELETE_STREAM,
    EDIT_STREAM
} from './types'

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

export const createStream = (formValues) => {
    return async (dispatch, getState) => {
        const { idUser } = getState().auth;
        // console.log(idUser);
        const response = await streams.post('/streams', { ...formValues, idUser })

        dispatch({
            type: CREATE_STREAM,
            payload: response.data
        });
        history.push('/')
        // lakukan programmatic navigation(redirect k halaman root mksdnya bos)
        
    }
}

export const fetchStreams = () => async dispatch => {
    const response = await streams.get('/streams')

    dispatch({
        type: FETCH_STREAMS,
        payload: response.data
    })
}

export const fetchStream = (id) => async bispak => {
    const response = await streams.get(`/streams/${id}`)

    bispak({
        type: FETCH_STREAM,
        payload: response.data
    })
}

export const editStream = (id, formValues) => async bispak => {
    const response = await streams.patch(`/streams/${id}`, formValues)

    bispak({
        type: EDIT_STREAM,
        payload: response.data
    })
    history.push('/')
}

export const deleteStream = (id) => async bispak => {
    await streams.delete(`/streams/${id}`)

    bispak({
        type: DELETE_STREAM,
        payload: id
    })
}