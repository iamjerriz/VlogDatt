import { SET_USER, SET_AUTHENTICATED, SET_UNAUTHENTICATED, LOADING_USER, LIKE_POST, UNLIKE_POST, MARK_NOTIFICATIONSREAD} from '../type'

const initialState = {
    authenticated: false,
    loading: false,
    credentials: {},
    likes: [],
    notifications: []
}

export default function( state = initialState, action) { //initialState is the default value
    switch(action.type) {
        case SET_AUTHENTICATED: //action types tapos do something
            return {
                ...state, //spread the state because u user is authenticated and do something
                authenticated: true //then change the value
            };
        case SET_UNAUTHENTICATED:
            return initialState; //not authenticated so go back to initial
        case SET_USER:
            return {
                authenticated: true,
                loading: false,
                ...action.payload // this will bind evryting likes notif etc all credentials
            };
        case LOADING_USER:
            return{
                ...state,
                loading: true
            };
        case LIKE_POST:
            return {
                ...state,
                likes: [
                    ...state.likes,
                    {
                        userHandle: state.credentials.handle,
                        postId: action.payload.postId
                    }
                ]
            }
        case UNLIKE_POST:
            return {
                ...state,
                likes: state.likes.filter(
                    (like) => like.postId !== action.payload.postId
                )
            };
        case MARK_NOTIFICATIONSREAD:
            state.notifications.forEach( not => not.read = true ) ;
            return {
                ...state
            };
        default:
            return state;
    }
}