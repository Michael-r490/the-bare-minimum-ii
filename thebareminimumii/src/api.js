import axios from "axios";

import { LANGUAGE_VERSIONS } from "./constants";

const CODE = axios.create({
    baseURL:"https://emkc.org/api/v2/piston"
})
const API= axios.create({
    baseURL: import.meta.env.VITE_API_URL, 
    withCredentials: true,  
});

export const executeCode = async (language, sourceCode) =>{
    const response = await CODE.post("/execute",{
        language: language,
        version: LANGUAGE_VERSIONS[language],
        files: [
            {
              "content": sourceCode
            },
        ],
    });
    return response.data;
};
export default API;