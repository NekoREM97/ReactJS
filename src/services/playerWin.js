import request from '../utils/request';
import {API_HEADER} from '../config';

function* getByMobileNumber(mobileNumber){
    return yield request('api/TransPlayerWin/GetByMobileNumber?MobileNumber=' + mobileNumber,{
        method: 'GET',
        headers: API_HEADER
    })
}
function* addTrans(data){
    return yield request('api/TransPlayerWin/AddTrans',{
        method: 'POST',
        headers: API_HEADER,
        body:JSON.stringify(data)
    })
}

function* getFee(data){
    return yield request('api/FeePayReward/GetFee',{
        method: 'POST',
        headers: API_HEADER,
        body:JSON.stringify(data)
    })
}

function* getOrderItemWin(itemID) {
    return yield request('api/TransPlayerWin/GetOrderItemWin?OrderItemID=' + itemID, {
        method: 'GET',
        headers: API_HEADER
    })
}

export const playerWin = {
    getByMobileNumber,
    addTrans,
    getFee,
    getOrderItemWin
}