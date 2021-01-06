import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED, LOADING_USER, MARK_NOTIFICATIONSREAD } from '../type'
import axios from 'axios';

//login action
export const loginUser = (userData, history) => (dispatch) => { //dispatch need because of asynchrous data
    dispatch ({ type: LOADING_UI});
    axios
        .post('/login', userData)
        .then(res => {
            setAuthorizationHeader(res.data.token)
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS });
            history.push('/home');
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        });
}

//signup action
export const signupUser = (newUserData, history) => (dispatch) => { //dispatch need because of asynchrous data
    dispatch ({ type: LOADING_UI});
    axios
        .post('/signup', newUserData)
        .then(res => {
            setAuthorizationHeader(res.data.token)
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS });
            history.push('/home');
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        });
}

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({ type: SET_UNAUTHENTICATED });
}

export const getUserData = () => (dispatch) => { //6:22:48 back
    dispatch({ type: LOADING_USER });
    axios.get('/user')
        .then(res => {
            dispatch({
                type: SET_USER,
                payload: res.data //some data that will send in reducer and reducer do something with it
            })
        })
        .catch((err) => console.log(err));
}

export const uploadImage = (formData) => (dispatch) => {
    dispatch({ type: LOADING_USER});
    axios.post('/user/image', formData)
        .then(() => {
            dispatch(getUserData());
        })
        .catch (err => console.log(err));
}

export const editUserDetails = (userDetails) => (dispatch) => {
    dispatch({ type: LOADING_USER }); //axios to communicate in db
    axios
        .post('/user', userDetails)
        .then(() => {
            dispatch(getUserData());
        })
        .catch((err) => console.log(err));
};

export const markNotificationsRead = ( notificationsIds ) => dispatch => {
    axios.post( 'notifications', notificationsIds )
        .then((res) => {
            dispatch ({
                type: MARK_NOTIFICATIONSREAD
            })
        })
        .catch(err => console.log(err));
}

//set authorization header
export const setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`;
    localStorage.setItem('FBIdToken', FBIdToken);
    axios.defaults.headers.common['Authorization'] = FBIdToken;
}