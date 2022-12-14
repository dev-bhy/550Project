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

export const getAvgPrecs = async limit => {
    try{
        const res = await axios.get(`${URL}/avgprec`, {params:{limit}});
        if (res.status === 200) {
            console.log(res);
            return res.data.results
        } else {
            console.log(res);
        }
    }
    catch(error) {
        console.log(error);
    }
}

export const getTempChange = async (startYear, endYear) => {
    try{
        const res = await axios.get(`${URL}/avgtempchange`, {params:{startYear, endYear}});
        if (res.status === 200) {
            console.log(res);
            return res.data.results
        } else {
            console.log(res);
        }
    }
    catch(error) {
        console.log(error);
    }
}

export const getTempChangeAndIncome = async () => {
    try{
        const res = await axios.get(`${URL}/tempchangeincome`);
        if (res.status === 200) {
            console.log(res);
            return res.data.results
        } else {
            console.log(res);
        }
    }
    catch(error) {
        console.log(error);
    }
}

export const getCountryCarbonEmissionByIncome = async () => {
    try{
        const res = await axios.get(`${URL}/incomecarbon`);
        if (res.status === 200) {
            console.log(res);
            return res.data.results
        } else {
            console.log(res);
        }
    }
    catch(error) {
        console.log(error);
    }
}

export const getTempAndCarbonEmission = async () => {
    try{
        const res = await axios.get(`${URL}/tempcarbon`);
        if (res.status === 200) {
            console.log(res);
            return res.data.results
        } else {
            console.log(res);
        }
    }
    catch(error) {
        console.log(error);
    }
}

export const getCountryAvgTempChange = async () => {
    try{
        const res = await axios.get(`${URL}/avgtempchange`);
        if (res.status === 200) {
            console.log(res);
            return res.data.results
        } else {
            console.log(res);
        }
    }
    catch(error) {
        console.log(error);
    }
}

export const getCountryCarbonEmissionInHighIncome = async () => {
    try{
        const res = await axios.get(`${URL}/highincomecarbon`);
        if (res.status === 200) {
            console.log(res);
            return res.data.results
        } else {
            console.log(res);
        }
    }
    catch(error) {
        console.log(error);
    }
}

export const getCountryCarbonEmissionInLowIncome = async () => {
    try{
        const res = await axios.get(`${URL}/lowincomecarbon`);
        if (res.status === 200) {
            console.log(res);
            return res.data.results
        } else {
            console.log(res);
        }
    }
    catch(error) {
        console.log(error);
    }
}

export const getFloodDrought = async () => {
    try{
        const res = await axios.get(`${URL}/flooddrought`);
        if (res.status === 200) {
            console.log(res);
            return res.data.results
        } else {
            console.log(res);
        }
    }
    catch(error) {
        console.log(error);
    }
}

export const getCertifiedReductions = async () => {
    try{
        const res = await axios.get(`${URL}/certifiedreductions`);
        if (res.status === 200) {
            console.log(res);
            return res.data.results
        } else {
            console.log(res);
        }
    }
    catch(error) {
        console.log(error);
    }
}
