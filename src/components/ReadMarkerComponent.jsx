import React, { Component } from 'react';
import MarkerService from '../service/MarkerService';

class ReadMarkerComponent extends Component {
    constructor(props) {
        super(props);

        
        this.state = { 
            markerId: this.props.match.params.markerId,
            marker: {}
        }

        this.goToUpdate = this.goToUpdate.bind(this);

    }

    
    componentDidMount() {
        MarkerService.getOneMarker(this.state.markerId).then( res => {
            this.setState({marker: res.data});
        });
    }

    
    returnMarkerType(markerCategoryNo) {
        let markerCategory = null;
        if (markerCategoryNo == 1) {
            markerCategory = "어린이 보호 구역";

        } else if (markerCategoryNo == 2 ) {
            markerCategory = "경찰서";

        } else {
            markerCategoryNo = "타입 미지정";
        }

        return (
            <div className = "row">
                <label><h5> 마커 카테고리 : {markerCategory}</h5></label> 
            </div>
        )

    }

    returnDate(postingDay) {
        return (
            <div className = "row">
                <label>생성일 : [ {postingDay} ]</label>
            </div>
        )
    }

    goToMap() {
        window.location.replace("/marker")
    }

    goToUpdate = (event) => {
        event.preventDefault();
        window.location.replace('/create-marker/'+this.state.markerId );
        
    }

    deleteMarker = async function () {
        if(window.confirm("정말로 마커을 삭제하시겠습니까?\n삭제된 마커은 복구 할 수 없습니다.")) {
            MarkerService.deleteMarker(this.state.markerId).then( res => {
                console.log("delete result => " + JSON.stringify(res));
                if (res.status == 200 ) {
                    window.location.replace("/marker")
                }
                else {
                    alert("마커 삭제가 실패했습니다.");
                }
            });
        }
    }

    render() {
        return (
            <div>
                <br/><br/>
                <div className = "container">
                <div className = "card col-md-6 offset-md-3" >
                    <br/>
                    <h3 className ="text-center"> 마커 정보 </h3>
                    <div className = "card-body"> 
                            {this.returnMarkerType(this.state.marker.markerCategory)} 
                            <div className = "form-group" >
                                <label> 마커 정보 </label><br></br>
                                <hr/>
                                {this.state.marker.markerInform}
                            </div>
                            <br/><br/>
                            <hr/>
                            <div className = "form-group" >
                                <div><label> 마커 작성자  </label>: {this.state.marker.posterNickName}</div><div>{this.returnDate(this.state.marker.postingDay) }</div>
                            </div>
                            <hr/>
                            <div >
                            
                            </div>
                            <button className="btn btn-primary" onClick={this.goToMap.bind(this)} style={{marginLeft:"10px"}}>지도로 이동</button>
                            <button className="btn btn-success" onClick={this.goToUpdate} style={{marginLeft:"10px"}}>마커 수정</button>
                            <button className="btn btn-danger" onClick={() => this.deleteMarker()} style={{marginLeft:"10px"}}>마커 삭제</button>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}

export default ReadMarkerComponent;