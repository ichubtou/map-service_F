import React, { Component } from 'react';
import MemberService from '../service/MemberService';

class HeaderComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            token: localStorage.getItem('token'),
            tokentime: localStorage.getItem('tokentime')
        }
    }

    componentDidMount() {
        if(this.state.tokentime !==null && this.state.tokentime < new Date().getTime()) {
            localStorage.removeItem('token');
            localStorage.removeItem('tokentime');
            alert("30분이 지나 자동 로그아웃 되었습니다.");
            window.location.replace("/marker");
            this.reload();
        }   
    }

    checklogin() {
        if(this.state.tokentime === null){
            return <><div><a href="/singup" className="navbar-brand " style={{ color: 'black', marginLeft: '600px' }}>회원가입</a></div><div><a href="/login" className="navbar-brand " style={{ color: 'black' }}>로그인</a></div></>
        }
        else {
            return <><div><a href="/infochange" className="navbar-brand " style={{ color: 'black', marginLeft: '600px' }}>마이페이지</a></div><div><a herf='#' onClick={this.logout} className="navbar-brand " style={{ color: 'black' }}>로그아웃</a></div></>
        } 
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('tokentime');
        alert("로그아웃 되었습니다.")
        window.location.replace("/marker");
            this.reload();
    }
    
    render() {
        return (
            <div>
                <header >
                    <nav className="navbar navbar-expand-md navbar-black bg-white" style={{ justifyContent:'center'}}>
                        <div ><div><a href="http://localhost:3000" className="navbar-brand " style={{color:'black', marginLeft:'800px'}}> 어린이 안전 지도</a></div></div>
                        {
                        this.checklogin()
                        }
                    </nav>
                </header>
            </div>
        );
    }
}

export default HeaderComponent;
