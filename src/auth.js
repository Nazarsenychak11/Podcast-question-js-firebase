
export function getAuthForm() {
    return `
<form class="mui-form" id="auth-form">
    <div class="mui-textfield mui-textfield--float-label">
        <input id="email" type="email" required>
            <label for="email">Email</label>
        </div>
    <div class="mui-textfield mui-textfield--float-label">
        <input id="password" type="password" required>
            <label for="password">Password</label>
        </div>

        <button type="submit" class="mui-btn--primary mui-btn mui-btn--raised">
            Зайти
       </button>
</form>
    `
}

export function authWithEmailAndPassword(email, password) {
    const apiKey = "AIzaSyBuiUeM-Z2wlagrmO7zSw9Df_DKbgY4Gww"
    return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
        method: 'POST',
        body: JSON.stringify({
            email, password,
            returnSecureToken: true
        }),
        headers: {
            'Content-Type': 'aplication/json'
        }
    })
    .then(res => res.json())
    .then(data => data.idToken)
}