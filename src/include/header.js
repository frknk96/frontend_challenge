import React from 'react';


export class Header extends React.Component {
    constructor() {
        super()
    }

    removeUser()
    {
        localStorage.removeItem("login");
        alert("Lütfen sayfayı yenileyiniz");
    }
    render() {
        const loginData = this.props.loginData();
        let layout = (
            <div className="member-info">
                <div className="name">{loginData.userName}</div>
                <div className="img">
                    <img src="" alt=""/>
                </div>
                <span onClick={this.removeUser}>Çıkış Yap</span>
            </div>
        );
        return (
            <div>
                {layout}
                <div className="img">
                    <a href="#" className="logo" alt="todo" title="todo"/>
                </div>

            </div>
        )
    }
}
