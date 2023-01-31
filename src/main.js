
const endpoint = 'https://api.openweathermap.org/'
const apiKey = '6f9ea20be5ffff67f64770cd3b4ad14c'

const lat = 44.34;
const lon = 10.99; 


const apiEngine = async () => {
    const path = 'data/2.5/forecast'
    const queryParams = `?lat=${lat}&lon=${lon}&appid=${apiKey}`
    const url = `${endpoint}${path}${queryParams}`

    try{

        const response = await fetch(url)
        if(response.ok) {
            let jsonResponse = response.json(); 
            console.log(jsonResponse)
        }

    }catch(Error) {
        console.log(Error)
    }
}

// apiEngine()