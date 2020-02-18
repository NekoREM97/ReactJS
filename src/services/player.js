import request from '../utils/request';
import {API_HEADER} from '../config';

function* updateInfo(data){
    return yield request('api/Player/UpdateInfo',{
        method: 'POST',
        headers: API_HEADER,
        body:JSON.stringify(data)
    })
}
function* getTransRefBalance(mobileNumber){
    return yield request('/TransReferral/GetBalance?mobileNumber=' + mobileNumber, {
        method: 'GET',
        headers: API_HEADER
    })
}
function* getCommission(mobileNumber, merchantID) {
    return yield request('/TransReferral/GetCommission?mobileNumber=' + mobileNumber + '&merchantID=' + merchantID, {
        method: 'GET',
        headers: API_HEADER
    })
}
function* GetDetail(mobileNumber, merchantID) {
    return yield request('/TransReferral/GetDetail?mobileNumber=' + mobileNumber + '&merchantID=0', {
        method: 'GET',
        headers: API_HEADER
    })
}
function* getCommissionList(mobileNumber) {
    return yield request('/TransReferral/GetCommission?mobileNumber=' + mobileNumber + '&merchantID=0', {
        method: 'GET',
        headers: API_HEADER
    })
}
function* getFee(data){
    return yield request('/TransReferral/GetFee',{
        method: 'POST',
        headers: API_HEADER,
        body:JSON.stringify(data)
    })
}
function* addTrans(data){
    return yield request('/TransReferral/AddTrans',{
        method: 'POST',
        headers: API_HEADER,
        body:JSON.stringify(data)
    })
}
export const player = {
    updateInfo,
    getTransRefBalance,
    getCommission,
    GetDetail,
    getCommissionList,
    getFee,
    addTrans
}