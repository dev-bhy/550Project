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
            return res.data.results
        } else {
            console.log(res);
        }
    }
    catch(error) {
        console.log(error);
    }
}


export const getIncomes = async () => {
    try{
        const res = await axios.get(`${URL}/countryincome`);
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

export const getCarbons = async year => {
    console.log(year)
    try{
        const res = await axios.get(`${URL}/countrycarbon`, {params: {year}} );
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

