const changeLoginStatus = (value: boolean) => ({
    type: 'CHANGE_LOGIN_STATUS',
    logged: value,
})

export default changeLoginStatus