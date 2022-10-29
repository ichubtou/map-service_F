import React, { Component } from 'react';
import MemberService from '../service/MemberService';

class SignupComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            memberId : "",
            password : "",
            nickname : "",
            memberRole : "",
            checkId : true,
            checknickname : true
        }

        this.cancel = this.cancel.bind(this);

        this.changememberIdHandler = this.changememberIdHandler.bind(this);
        this.changepasswordHandler = this.changepasswordHandler.bind(this);
        this.changenicknameHandler = this.changenicknameHandler.bind(this);
        this.changememberRoleHandler = this.changememberRoleHandler.bind(this);
    
        this.createMember = this.createMember.bind(this);
    }

    changememberIdHandler = (event) => {
        this.setState({memberId: event.target.value});
    }

    changepasswordHandler = (event) => {
        this.setState({password: event.target.value});
    }

    changenicknameHandler = (event) => {
        this.setState({nickname: event.target.value});
    }

    changememberRoleHandler = (event) => {
        this.setState({memberRole: event.target.value});
    }

    createMember = (event) => {
        event.preventDefault();
        
        if(this.state.checkId == false && this.state.checknickname == false) {
            let member = {
                memberId : this.state.memberId,
                password : this.state.password,
                nickname : this.state.nickname,
                memberRole : this.state.memberRole
             };
     
             console.log("member => " + JSON.stringify(member));
             MemberService.createMember(member).then(res => {
                 window.location.replace("/marker")
             })
             window.location.replace("/marker");
                 this.reload();
                 alert("회원가입이 완료되었습니다.");
        }
        else {
            alert("아이디와 닉네임의 중복을 확인해주세요.");
        }
        
    }

    reload() {
        this.props.history.push('/marker');
    }


    cancel() {
        window.location.replace("/marker")
        this.reload();
    }

    existsmemberId = (event) => {
        event.preventDefault();
        MemberService.checkmemberId(this.state.memberId).then(res => {
            this.state.checkId = res.data;
            if(res.data === true) {
                // window.confirm("중복된 아이디입니다.");  
                alert("중복된 아이디입니다.");
            }
            else if(res.data === false) {
                // window.confirm("사용 가능한 아이디입니다.");
                alert("사용 가능한 아이디입니다.");
            }
        })
    }

    existsnickname = (event) => {
        event.preventDefault();
        MemberService.checknickname(this.state.nickname).then(res => {
            this.state.checknickname = res.data;
            if(res.data === true) {
                // window.confirm("중복된 아이디입니다.");  
                alert("중복된 닉네임입니다.");
            }
            else if(res.data === false) {
                // window.confirm("사용 가능한 아이디입니다.");
                alert("사용 가능한 닉네임입니다.");
            }
        })
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
                            <h3 className="text-center">회원가입</h3>
                            <div className = "card-body">
                                    <div className = "form-group">
                                    <label> 아이디 </label>
                                        <input type="text" placeholder="아이디" name="memberId" className="form-control" 
                                        value={this.state.memberId} onChange={this.changememberIdHandler}/>
                                        <br/>
                                        <button className="btn btn-success" onClick={this.existsmemberId}>아이디 중복 확인</button>
                                    </div>
                                    <br/>
                                    <div className = "form-group">
                                    <label> 비밀번호 </label>
                                        <input type="text" placeholder="비밀번호" name="password" className="form-control" 
                                        value={this.state.password} onChange={this.changepasswordHandler}/>
                                    </div>
                                    <br/>
                                    <div className = "form-group">
                                        <label> 닉네임 </label>
                                        <input type="text" placeholder="닉네임" name="posterNickname" className="form-control" 
                                        value={this.state.nickname} onChange={this.changenicknameHandler}/>
                                        <br/>
                                        <button className="btn btn-success" onClick={this.existsnickname}>닉네임 중복 확인</button>
                                    </div>
                                    <br/>
                                    <div className = "form-group">
                                        <label> 카테고리 </label>
                                        <select placeholder="memberRole" name="memberRole" className="form-control"
                                        value={this.state.memberRole} onChange={this.changememberRoleHandler}>
                                            <option value="">선택</option>
                                            <option value="1">부모</option>
                                            <option value="2">아이</option>
                                        </select>
                                    </div>
                                    <br/>
                                    {/* const content='<form id="marker-maker" action="/create-marker"><button class="btn btn-primary" type="action">여기에 마커 만들기</button></form>'; */}
                                    <button className="btn btn-success" onClick={this.createMember}>Save</button>

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

export default SignupComponent;