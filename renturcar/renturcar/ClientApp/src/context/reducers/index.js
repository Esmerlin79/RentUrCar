import UserReducer from './UserReducer';
import DetailsReducer from './DetailsReducer';

export const mainReducer = ( { userSesion, showDetails }, action ) => {
    return{
        userSesion: UserReducer(userSesion, action),
        showDetails: DetailsReducer(showDetails, action)
    }
};