const logged = (username, useremail, password) => ({
    type: 'LOGIN',
    payload: username,
    email: useremail,
    password: password,
  });
  
  const signed = (username, useremail, password) => ({
    type: 'SIGNIN',
    payload: username,
    email: useremail,
    password: password,
  });
  
  const logout = (username, useremail, password) => ({
    type: 'LOGOUT',
    payload: username,
    email: useremail,
    password: password,
  });
  export { signed, logout, logged as default };
  