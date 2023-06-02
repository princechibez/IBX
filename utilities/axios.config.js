import axios from "axios";

const instance = axios.create({
    baseURL: "https://newsapi.org/v2/",
    timeout: 10000,
    headers: {
        Authorization: "Bearer af768a4a2b534c29980dd967d8869fc9"
    },
})

export default instance