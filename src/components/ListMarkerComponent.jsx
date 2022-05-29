/*global kakao*/
import React, { Component } from 'react';
import axios from "axios";
import MarkerService from '../service/MarkerService';
class ListMarkerComponent extends Component {

    constructor(props) {
        super(props)
    // # 1. 
        this.state = { 
            markers: []
        }

        this.createMarker = this.createMarker.bind(this);
		
    }
    componentDidMount() {

        MarkerService.getMarkers().then((res) => {
            this.setState({ markers: res.data});
        });
        

        const script = document.createElement("script");
        script.async = true;
        script.src = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=0e8476cfbd8d0452f0fe4c39458a52d7";
        document.head.appendChild(script);

        script.onload = () => {
            kakao.maps.load(() => {
                let container = document.getElementById("map");

                let options = {
                    center: new kakao.maps.LatLng(37.209959824623354, 126.97535101416321),
                    level: 3
                };
                //map
                const map = new kakao.maps.Map(container, options);

                // HTML5의 geolocation으로 사용할 수 있는지 확인합니다 
if (navigator.geolocation) {
    
    // GeoLocation을 이용해서 접속 위치를 얻어옵니다
    navigator.geolocation.getCurrentPosition(function(position) {
        
        var lat = position.coords.latitude, // 위도
            lon = position.coords.longitude; // 경도
        
        var locPosition = new kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
            
        
        // 마커와 인포윈도우를 표시합니다
        displayMarker(locPosition);
            
      });
    
}

// 지도에 마커와 인포윈도우를 표시하는 함수입니다
function displayMarker(locPosition) {

    var imageSize = new kakao.maps.Size(50,50);

    var mymarker="https://ifh.cc/g/Fd2ooD.png"
    // 마커를 생성합니다
    var mymarker = new kakao.maps.Marker({  
        map: map, 
        position: locPosition,
        image: new kakao.maps.MarkerImage(mymarker, imageSize)
    }); 


    
    // 지도 중심좌표를 접속위치로 변경합니다
    map.setCenter(locPosition);      
}    
                
                kakao.maps.event.addListener(map, 'rightclick', function(mouseEvent) {
                    //session
                    map.panTo(new kakao.maps.LatLng(mouseEvent.latLng.Ma, mouseEvent.latLng.La))
                    sessionStorage.setItem('rightLat',mouseEvent.latLng.Ma)
                    sessionStorage.setItem('rightLng',mouseEvent.latLng.La)
                    if(marker ==null) {
                    new kakao.maps.CustomOverlay({
                        map: map,
                        clickable: true, //커스텀 오버레이 클릭시 지도에 이벤트 전파 방지
                        content: content,
                        position: new kakao.maps.LatLng(mouseEvent.latLng.Ma,mouseEvent.latLng.La),
                        xAnchor: 0,
                        yAnchor: 0
                    })
                    }
                    else {
                        const marker = document.querySelector('#marker-maker')
                        if (marker !== null)
                            marker.remove()
                        
                        new kakao.maps.CustomOverlay({
                            map: map,
                            clickable: true, //커스텀 오버레이 클릭시 지도에 이벤트 전파 방지
                            content: content,
                            position: new kakao.maps.LatLng(mouseEvent.latLng.Ma, mouseEvent.latLng.La),
                            xAnchor: 0,
                            yAnchor: 0
                        })
                    }
                });

                const content='<form id="marker-maker" action="/create-marker/_create"><button id="marker-maker" class="btn btn-primary" type="action" style="border-radius: 0px 40px 40px 40px;background-color:orange; border:0;"><Strong>여기에 마커 만들기</Strong></button></form>';

                kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
                    
                    markerCustomOverlay.setMap(null);
                    const marker = document.querySelector('#marker-maker')
                    if (marker !== null)
                      marker.remove()
                  });
                
                  
                var positions =[]
                this.state.markers.map(
                    
                    marker =>
                        positions.push({
                            Id: marker.markerId,
                            latlng: new kakao.maps.LatLng(String(marker.markerLatitude), String(marker.markerLongitude)),
                            isDanger: marker.isDanger,
                            //마커 정보
                            content: '</strong></a>'
                                + '    <div class="desc" style="line-height:1.5%">'
                                + ' <br>'
                                + '        <span><Strong>마커 정보'
                                + '        &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp'
                                + '        </Strong>작성자:' + marker.posterNickName + '</span>'
                                + '        <hr algin="right" style="width:75%; >'
                                + '        <span class="address" >' + marker.markerInform + '</span>'
                                + '        <img src="" alt="이미지" align="right">'
                                
                                + '    </div>'
                                + '</div>',
                            markerCategory: marker.markerCategory

                        })
                )

                
                
                var imageSafe = "https://ifh.cc/g/btLSJ3.png";

                var imageDanger = "https://ifh.cc/g/9WjPB7.png";
                
                // 마커를 생성
                for (var i = 0; i < positions.length; i++) {
                    //마커 카테고리별 문구
                    //1 = 어린이 보호 구역
                    //2 = 경찰서
                    if(positions[i].markerCategory == 1) {
                        positions[i].markerCategory = "어린이 보호 구역";
                    }
                    else if(positions[i].markerCategory == 2) {
                        positions[i].markerCategory = "경찰서";
                    }

                    kakao.maps.event.addListener(map, 'click', function() {
                        markerCustomOverlay.setMap(null);
                    });
                    var imageSize = new kakao.maps.Size(50,50);

                    //위험 마커
                    if(positions[i].isDanger == 1){
                        positions[i].content = '<div class="overlay_info" style="width:400px;height:200px">'
                        + '    <a href="/read-marker/' + positions[i].Id + '"style="background: #d95050url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/arrow_white.png);">' + '<strong>'+ positions[i].markerCategory + positions[i].content
                        var markerImage = new kakao.maps.MarkerImage(imageDanger, imageSize);

                    var marker = new kakao.maps.Marker({
                        position: positions[i].latlng,
                        map: map,
                        image: markerImage
                    })
                    }

                    //안전 마커
                    else if(positions[i].isDanger == 2){
                        positions[i].content = '<div class="overlay_info" style="width:400px;height:200px">'
                        + '    <a href="/read-marker/' + positions[i].Id + '"style="display: block; background: #60d950; background: #60d950 url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/arrow_white.png) no-repeat right 14px center; text-decoration: none; color: #fff; padding:12px 36px 12px 14px; font-size: 14px; border-radius: 6px 6px 0 0}">' + '<strong>'+ positions[i].markerCategory + positions[i].content
                        var markerImage = new kakao.maps.MarkerImage(imageSafe, imageSize);

                    var marker = new kakao.maps.Marker({
                        position: positions[i].latlng,      
                        map: map,
                        image: markerImage
                    })
                    }


                    //customOverlay 표사
                    var markerCustomOverlay = new kakao.maps.CustomOverlay({
                        position: positions[i].latlng,
                        content: positions[i].content, // 인포윈도우에 표시할 내용
                        clickable: true,
                        yAnchor: 1.23
                    });
                    (function(marker, markerCustomOverlay) {

                        //마커 클릭시 customoverlay표시, 지도중심을 마커로 설정
                        kakao.maps.event.addListener(marker, 'click', function() {
                            markerCustomOverlay.setMap(map);
                            map.panTo(marker.getPosition());
                        });

                        //지도 클릭시 표시된 모든 customoverlay 삭제
                        kakao.maps.event.addListener(map, 'click', function() {
                            markerCustomOverlay.setMap(null);
                        });

                        //지도 우클릭시 표시된 모든 customoverlay 삭제
                        kakao.maps.event.addListener(map, 'rightclick', function() {
                            markerCustomOverlay.setMap(null);
                        })

                    })(marker, markerCustomOverlay);
                    
                }
                
            });
            
        }

    }
    

    createMarker() {
        this.props.history.push('/create-marker');
    }

    readMarker(no) {
        this.props.history.push('/read-marker/${no}');
    }


    render() {
        return (
            <div id="map" style={{
                width: '100vw',
                height: '93vh'
            }}>
            </div>
        );
    };
}

export default ListMarkerComponent;