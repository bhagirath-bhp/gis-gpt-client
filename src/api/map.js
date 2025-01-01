import axios from "axios";
import Cookies from "js-cookie";
import { getEvalScript } from "../utils";


const uri = import.meta.env.VITE_SERVER_URI;
const sentinel_uri = import.meta.env.VITE_SENTINEL_URI;

const mapService = {
    async getMapData({coordinates, startDate, endDate, layer, crs, resolution, saveData}) {
        const token = Cookies.get("token");

        const response = await axios.get(`${uri}/satellite-image`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                coordinates: coordinates,
                startDate: startDate,
                endDate: endDate,
                layer: layer,
                crs: crs,
                resolution: resolution,
                saveData: saveData
            },
        })
        return response.data;
        
    },
    async fetchSatelliteData({ coordinates, startDate, endDate, layer, crs, resolution, saveData, accessToken }) {

        const bbox = coordinates;
        const [minX, minY, maxX, maxY] = coordinates;
    
        const requestData = {
            input: {
                bounds: {
                    bbox: bbox,
                    properties: {
                        crs: crs || "http://www.opengis.net/def/crs/EPSG/0/4326"
                    }
                },
                data: [
                    {
                        type: "S2L2A",
                        dataFilter: {
                            timeRange: {
                                from: startDate,
                                to: endDate
                            },
                            maxCloudCoverage: "1"
                        }
                    }
                ]
            },
            output: {
                width: (maxX - minX) / resolution || 512,
                height: (maxY - minY) / resolution || 343.697,
                responses: [
                    {
                        identifier: "default",
                        format: {
                            type: "image/jpeg"
                        }
                    }
                ]
            },
            evalscript: getEvalScript(layer) 
        };
    
        try {
            const response = await axios.post(`${uri}/api/v1/process`, requestData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}` 
                }
            });
    
            if (saveData) {

            }
            console.log("Response from fetchSatelliteData:", response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching map data:', error);
            throw error;
        }
    }
}

export default mapService;