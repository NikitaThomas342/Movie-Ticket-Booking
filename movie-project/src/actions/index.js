export const login = (user_data) => {
    return {
        type: 'LOGIN',
        payload: user_data
    }
}

export const logout = () => {
    return {
        type: 'LOGOUT'
    }
}

export const login_auth = (token) => {
    return {
        type: 'LOGIN_TOKEN',
        payload: token
    }
}

export const logout_auth = () => {
    return {
        type: 'LOGOUT_TOKEN'
    }
}