const LoginReducer = (state = {username: '' , useremail: '', password: ''}, action) =>{
    switch(action.type) {
        case 'LOGIN' :
            state = {username: action.payload, useremail: action.payload, password: action.payload}
            return state;
        case 'SIGNIN' :
            state = {username: action.payload, useremail: action.payload, password: action.payload}
            return state;
        case 'LOGOUT' :
            state = {username: '', useremail: '', password: ''}
            return state;
        default:
            return state;
    }
}

export default LoginReducer;