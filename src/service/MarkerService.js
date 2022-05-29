import axios from 'axios';

const MARKER_API_BASE_URL = "http://localhost:8080/api/marker"; 

class MarkerService {

    getMarkers() {
        return axios.get(MARKER_API_BASE_URL);
    }

    createMarker(marker) {
        return axios.post(MARKER_API_BASE_URL, marker);
    }

    getOneMarker(no) {
        return axios.get(MARKER_API_BASE_URL + "/" + no);
    }

    updateMarker(no, marker) {
        return axios.put(MARKER_API_BASE_URL + "/" + no, marker);
    }

    deleteMarker(no) {
        return axios.delete(MARKER_API_BASE_URL + "/" + no);
    }
}

export default new MarkerService();