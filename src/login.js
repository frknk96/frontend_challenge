import React from 'react';
import {Footer} from './include/footer';

export class Login extends React.Component {
    constructor() {
        super();
        this.doLogin = this.doLogin.bind(this);
    }

    /**
     * login öncesi bilgileri kontrol et geçerliyse login ol
     */
    doLogin(){
        const userName = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        if (userName==='furkan' && password==='frontchallenge'){
            this.props.doLogin(userName);
        } else {
            alert('Kullanıcı adı veya şifre hatalı');
        }

    }

    render() {
        return (
            <div className="content">
                <div className="img">
                    <a href="#" className="logo" alt="todo" title="todo"/>
                </div>
                <div className="login type1">
                    <div className="input-wrapper">
                        <i className="icon username" />
                        <input className="textbox" type="text"  name="username" id="username" placeholder="username or email" />
                    </div>
                    <div className="input-wrapper">
                        <i className="icon password" />
                        <input className="textbox" type="text" name="password" id="password" placeholder="password" />
                    </div>
                </div>

                <div className="myCss">
                    beni hatırla
                </div>
                <div className="pass">şifremi unuttum?</div>


                <div className="login-options">
                    <button type="button" className="login-btn" onClick={this.doLogin}>LOGIN</button>
                </div>

                <Footer/>

            </div>

        )

    }
}
