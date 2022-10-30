import React, { Component } from 'react';
import MarkerService from '../service/MarkerService';
import MemberService from '../service/MemberService';

class CreateMarkerComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            markerId: this.props.match.params.markerId,
            markerCategory: '',
            markerInform: '',
            isDanger: '',
            markerLongitude: '',
            markerLatitude: '',
            posterNickName: ''
        }

        this.cancel = this.cancel.bind(this);

        this.changeMarkerCategoryHandler = this.changeMarkerCategoryHandler.bind(this);
        this.changeMarkerInformHandler = this.changeMarkerInformHandler.bind(this);
        this.changeIsDangerHandler = this.changeIsDangerHandler.bind(this);
        this.changePosterNickNameHandler = this.changePosterNickNameHandler.bind(this);
        this.changeMarkerLongitudeHandler = this.changeMarkerLongitudeHandler.bind(this);
        this.changeMarkerLatitudeHandler = this.changeMarkerLatitudeHandler.bind(this);
        this.createMarker = this.createMarker.bind(this);
    }

    changePosterNickNameHandler = (event) => {
        this.setState({ posterNickName: event.target.value });
    }

    changeMarkerCategoryHandler = (event) => {
        this.setState({ markerCategory: event.target.value });
    }

    changeMarkerInformHandler = (event) => {
        this.setState({ markerInform: event.target.value });
    }

    changeIsDangerHandler = (event) => {
        this.setState({ isDanger: event.target.value });
    }

    changeMarkerLongitudeHandler = (event) => {
        this.setState({ markerLongitude: event.target.value });
    }

    changeMarkerLatitudeHandler = (event) => {
        this.setState({ markerLatitude: event.target.value });
    }

    localLatitude = localStorage.getItem('latitude')
    localLongitude = localStorage.getItem('longitude')

    createMarker = (event) => {
        event.preventDefault();
        let marker = {
            posterNickName: this.state.posterNickName,
            markerCategory: this.state.markerCategory,
            markerInform: this.state.markerInform,
            isDanger: this.state.isDanger,
            markerLatitude: this.localLatitude = sessionStorage.getItem('rightLat'),
            markerLongitude: this.localLongitude = sessionStorage.getItem('rightLng')
        };

        console.log("marker => " + JSON.stringify(marker));
        if (this.state.markerId === "_create") {
            MarkerService.createMarker(marker).then(res => {
            });
            window.location.replace("/marker")
            this.reload();
        } else {
            MarkerService.updateMarker(this.state.markerId, marker).then(res => {
                window.location.replace("/marker")
            });
        }
    }

    reload() {
        this.props.history.push('/marker');
    }

    cancel() {
        window.location.replace("/marker")
        this.reload();
    }

    getTitle() {
        if (this.state.markerId === '_create') {
            return <h3 className="text-center">새 마커를 작성해주세요</h3>
        } else {
            return <h3 className="text-center">마커를 수정 합니다.</h3>
        }
    }

    componentDidMount() {
        if (localStorage.getItem('token') == null) {
            alert("로그인이 필요한 기능입니다.");
            window.location.replace("/marker");
            this.reload();
        }else {
            if (this.state.markerId === '_create') {
                MemberService.getmemberinfo().then((res) => {
                    let memberinfo = res.data;
                    this.setState({
                        posterNickName: memberinfo.nickname
                    })
                })
            } else {
                
                MemberService.getmemberinfo().then((res) => {
                    let nickname = res.data.nickname;
                    MarkerService.getOneMarker(this.state.markerId).then((res) => {
                        let marker = res.data;
                        console.log("marker => " + JSON.stringify(marker));
    
                        if (nickname !== marker.posterNickName) {
                            alert("권한이 없습니다.")
                            window.location.replace("/marker");
                            this.reload();
                        }
    
                        this.setState({
                            posterNickName: marker.posterNickName,
                            markerCategory: marker.markerCategory,
                            markerInform: marker.markerInform,
                            isDanger: marker.isDanger,
                            markerLatitude: marker.localLatitude,
                            markerLongitude: marker.localLongitude
                        })
                    })
                })

                
            }
        }
    }

    render() {
        return (
            <div>
                <br></br>
                <br></br>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            {
                                this.getTitle()
                            }
                            <div className="card-body">
                                <div className="form-group">
                                    <label> 위험, 안전 </label>
                                    <select placeholder="isdanger" name="isdanger" className="form-control"
                                        value={this.state.isDanger} onChange={this.changeIsDangerHandler}>
                                        <option value="0">선택</option>
                                        <option value="1">위험</option>
                                        <option value="2">안전</option>
                                    </select>
                                </div>
                                <br />
                                <div className="form-group">
                                    <label> 카테고리 </label>
                                    <select placeholder="markercategory" name="markercategory" className="form-control"
                                        value={this.state.markerCategory} onChange={this.changeMarkerCategoryHandler}>
                                        <option value="">선택</option>
                                        <option disabled> 위험 </option>
                                        <option value="1">어린이 보호 구역</option>
                                        <option disabled> 안전 </option>
                                        <option value="2">경찰서</option>
                                    </select>
                                </div>
                                <br />
                                <div className="form-group" >
                                    <label> 마커 정보  </label>
                                    <textarea placeholder="마커 정보" name="markerInform" className="form-control"
                                        value={this.state.markerInform} onChange={this.changeMarkerInformHandler} />
                                </div>
                                <br />
                                <div className="form-group">
                                    <label> 닉네임 </label>
                                    <input type="text" placeholder="닉네임" name="posterNickname" className="form-control"
                                        value={this.state.posterNickName} onChange={this.changePosterNickNameHandler} disabled />
                                </div>
                                <div className="form-group">
                                    <input type="hidden" name="markerLatitude" className="form-control"
                                        value={sessionStorage.getItem('rightLat')} onChange={this.changeMarkerLatitudeHandler} />
                                </div>
                                <div className="form-group">
                                    <input type="hidden" name="markerLatitude" className="form-control"
                                        value={sessionStorage.getItem('rightLng')} onChange={this.changeMarkerLongitudeHandler} />
                                </div>
                                <br />
                                {/* const content='<form id="marker-maker" action="/create-marker"><button class="btn btn-primary" type="action">여기에 마커 만들기</button></form>'; */}
                                <button className="btn btn-success" onClick={this.createMarker}>저장</button>

                                <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>취소</button>
                                {/* </form> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateMarkerComponent;