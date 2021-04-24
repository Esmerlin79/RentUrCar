import HttpClient from '../../Services/HttpClient';

export function AddCarAction(car){

    const addCar = async data => {
        try {
            return await HttpClient.post('/RentarCar/SaveCar', data);
        } catch (error) {
            console.log(error);
            return error;
        }
    }
    return addCar(car);
}

export function getAllCarsAction(dispatch){
    const getAllCars = async () => {
        try {
            const result = await HttpClient.get('/RentarCar/getAllCars');
            dispatch({
                type: "SHOW_DETAILS",
                payload: result.data
            })
        } catch (error) {
            console.log(error);
            return error;
        }
    }
    getAllCars();
}

export function rentCarAction(car){
    const rentCar = async (data) => {
        try{
            const result = await HttpClient.post('/RentarCar/rentCar', data);
            return result;
        }catch(error){
            console.log(error);
            return error;
        }
    }
    return rentCar(car);
}