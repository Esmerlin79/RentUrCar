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