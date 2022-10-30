import React, { Component } from 'react';
import MemberService from '../service/MemberService';

class MemberInfoChange extends Component {
    constructor(props) {
        super(props);

        this.state = {
            memberId : "",
            nickname : "",
            expassword : "",
            newpassword : "",
            token: ""
        }

        this.cancel = this.cancel.bind(this);

        this.changememberIdHandler = this.changememberIdHandler.bind(this);
        this.changenicknameHandler = this.changenicknameHandler.bind(this);
        this.changeexpasswordHandler = this.changeexpasswordHandler.bind(this);

        this.changenickname = this.changenickname.bind(this);
        this.changenewpassword = this.changenewpassword.bind(this);
    }

    changememberIdHandler = (event) => {
        this.setState({memberId: event.target.value});
    }

    changenicknameHandler = (event) => {
        this.setState({nickname: event.target.value});
    }

    changeexpasswordHandler = (event) => {
        this.setState({expassword: event.target.value});
    }

    changenewpasswordHandler = (event) => {
        this.setState({newpassword: event.target.value});
    }

    reload() {
        this.props.history.push('/marker');
    }

    cancel() {
        window.location.replace("/marker")
        this.reload();
    }

    changenickname() {
        MemberService.getmemberinfo().then(res => {
            if(this.state.memberId !== res.data.memberId) {
                alert("아이디를 확인해주세요")
            }
            else {
                let usermodel = {
                    memberId: this.state.memberId,
                    nickname: this.state.nickname
                }
                MemberService.changenickname(usermodel).then(res => {
                    alert("닉네임이 " + res.data.nickname + "으로 변경 되었습니다.") 
                    window.location.replace("/marker")
                    this.reload();
                });
            }
        });
    }

    changenewpassword() {
        let changepassword = {
            exPassword: this.state.expassword,
            newPassword: this.state.newpassword
        }
        MemberService.changepassword(changepassword).then(res => {
            if(res.status == 200) {
                alert("비밀번호 변경이 완료되었습니다.")
                window.location.replace("/marker")
                this.reload();
            }
            else {
                alert("비밀번호를 확인해주세요")
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
                            <h3 className="text-center">닉네임 변경</h3>
                            <div className = "card-body">
                                    <div className = "form-group">
                                    <label> 아이디 입력 </label>
                                        <input type="text" placeholder="아이디 입력" name="memberId" className="form-control" 
                                        value={this.state.memberId} onChange={this.changememberIdHandler}/>
                                        <br/>
                                    </div>
                                    <br/>
                                    <div className = "form-group">
                                    <label> 변경할 닉네임 </label>
                                        <input type="text" placeholder="변경할 닉네임" name="nickname" className="form-control" 
                                        value={this.state.nickname} onChange={this.changenicknameHandler}/>
                                    </div>
                                    <br/>
                                    <button className="btn btn-success" onClick={this.changenickname}>변경</button>
                                    {/* <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft:"10px"}}>변경</button> */}
                                {/* </form> */}
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div className = "container">
                    <div className = "row">
                        <div className = "card col-md-6 offset-md-3 offset-md-3">
                            <br></br>
                            <h3 className="text-center">비밀번호 변경</h3>
                            <div className = "card-body">
                                    <div className = "form-group">
                                    <label> 현재 비밀번호 </label>
                                        <input type="password" placeholder="현재 비밀번호" name="expassword" className="form-control" 
                                        value={this.state.expassword} onChange={this.changeexpasswordHandler}/>
                                        <br/>
                                    </div>
                                    <br/>
                                    <div className = "form-group">
                                    <label> 변경할 비밀번호  </label>
                                        <input type="password" placeholder="변경할 비밀번호" name="newpassword" className="form-control" 
                                        value={this.state.newpassword} onChange={this.changenewpasswordHandler}/>
                                    </div>
                                    <br/>
                                    <button className="btn btn-success" onClick={this.changenewpassword}>변경</button>
                                    {/* <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft:"10px"}}>변경</button> */}
                            </div>
                        </div>
                    </div>
                </div>
                <button className="btn btn-success" onClick={this.cancel.bind(this)} style={{marginLeft:"10px"}}>돌아가기</button>
            </div>
            </div>
        );
    }
}

export default MemberInfoChange;