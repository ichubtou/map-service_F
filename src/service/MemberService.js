import axios from 'axios';

const MARKER_API_BASE_URL = "http://localhost:8080"; 

class MemberService {

    createMember(member) {
        return axios.post(MARKER_API_BASE_URL + "/auth/signup", member);
    }

    checkmemberId(memberId) {
        return axios.get(MARKER_API_BASE_URL + "/auth/memberId/" + memberId + "/exists")
    }

    checknickname(nickname) {
        return axios.get(MARKER_API_BASE_URL + "/auth/nickname/" + nickname + "/exists")
    }

    loginMember(member) {
        return axios.post(MARKER_API_BASE_URL + "/auth/login", member);
    }

    checktoken() {
        return axios.get(MARKER_API_BASE_URL + "/member/me", {
            headers : {
                Authorization : localStorage.getItem('token')
            }
        })
    }
}

export default new MemberService();