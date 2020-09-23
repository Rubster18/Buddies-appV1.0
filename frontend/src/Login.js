import React from 'react';
import Header from './Header';

const Login = () => {
    return (
        <div>
            <Header />

            <div className="container-form">
                <h1>Login</h1>
                <h2>Toegang voor beheerders</h2>

                <form>
                    <label for="email">Email</label>
                    <input type="text" name="email" />

                    <label for="password">Wachtwoord</label>
                    <input type="password" name="password"/>

                    <button type="submit" className="big-button">Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;