const LoginReducer = (state = {username: '' , email: ''}, action) =>{
    switch(action.type) {
        case 'LOGIN' :
            state = {username: action.payload, email: action.email}
            return state;
        case 'SIGNIN' :
            state = {username: action.payload, email: action.email}
            return state;
        case 'LOGOUT' :
            state = {username: '', useremail: ''}
            return state;
        default:
            return state;
    }
}

export default LoginReducer;