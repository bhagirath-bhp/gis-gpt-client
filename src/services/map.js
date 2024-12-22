import axios from "axios";
import Cookies from "js-cookie";


const uri = import.meta.env.VITE_SERVER_URI;

const mapService = {
    async getMapData() {
        const token = Cookies.get("token");
        
    }
}