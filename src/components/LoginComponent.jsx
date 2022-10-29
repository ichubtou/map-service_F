import React, { Component } from 'react';
import MemberService from '../service/MemberService';

class LoginComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            memberId : "",
            password : "",
            token: ""
        }

        this.cancel = this.cancel.bind(this);

        this.changememberIdHandler = this.changememberIdHandler.bind(this);
        this.changepasswordHandler = this.changepasswordHandler.bind(this);
    
        this.loginMember = this.loginMember.bind(this);
    }

    changememberIdHandler = (event) => {
        this.setState({memberId: event.target.value});
    }

    changepasswordHandler = (event) => {
        this.setState({password: event.target.value});
    }

    loginMember = (event) => {
        event.preventDefault();
        let member = {
            memberId: this.state.memberId,
            password: this.state.password
        }
        let data ="" , status = "";

        MemberService.loginMember(member).then(res => {
            status = res.status;
            data = res.data;            
        }).finally(res=>{
            this.checkstatus(status, data);
        });
        
    }

    checkstatus(status, data) {
        
        if(status === 200){
            
            const expirationTime = String(data.tokenExpiresIn);
            
            localStorage.setItem('token', "Bearer " + data.accessToken);
            localStorage.setItem('tokentime', expirationTime);
            window.location.replace("/marker");
            this.reload();
            alert("30분이 지나면 로그아웃 됩니다.");
        } 
        else{
            alert("아이디와 비밀번호를 확인해주세요.")
        }
    }

    sleep(ms) {
        const loopTime = Date.now() + ms;
        while (Date.now() < loopTime) {}
      }

    reload() {
        this.props.history.push('/marker');
    }

    cancel() {
        window.location.replace("/marker")
        this.reload();
    }

    render() {
        return (
            <div>
                <br></br>
                <br></br>
                <div className = "container">
                    <div className = "row">
                        <div className = "card col-md-6 offset-md-3 offset-md-3">
                            <br></br>
                            <h3 className="text-center">로그인</h3>
                            <div className = "card-body">
                                    <div className = "form-group">
                                    <label> 아이디 </label>
                                        <input type="text" placeholder="아이디" name="memberId" className="form-control" 
                                        value={this.state.memberId} onChange={this.changememberIdHandler}/>
                                        <br/>
                                    </div>
                                    <br/>
                                    <div className = "form-group">
                                    <label> 비밀번호 </label>
                                        <input type="text" placeholder="비밀번호" name="password" className="form-control" 
                                        value={this.state.password} onChange={this.changepasswordHandler}/>
                                    </div>
                                    <br/>
                                    {/* const content='<form id="marker-maker" action="/create-marker"><button class="btn btn-primary" type="action">여기에 마커 만들기</button></form>'; */}
                                    <button className="btn btn-success" onClick={this.loginMember}>Login</button>

                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft:"10px"}}>Cancel</button>
                                {/* </form> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginComponent;