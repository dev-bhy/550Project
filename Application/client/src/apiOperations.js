import axios from 'axios'
const URL = 'http://localhost:8000'

export const getAvgTemps = async limit => {
    try{
        const res = await axios.get(`${URL}/avgtemp`, {params:{limit}});
        if (res.status === 200) {
            return res.data.results
        } else {
            console.log(res);
        }
    }
    catch(error) {
        console.log(error);
    }
}

