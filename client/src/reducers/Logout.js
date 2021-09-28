const LogoutReducer = (state = true, action) =>{
    switch(action.type) {
        case 'LOGIN' :
            return !state;
    }
}

export default LogoutReducer;