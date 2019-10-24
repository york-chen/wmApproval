import {
    $axGetList,axQueryAnnouncement,axQueryBattlepass,axQueryLengendMallAd,axQueryLimitedMallAd,
    axQueryMainTenanceNotice,axQueryRegularMail,axQueryVersinDesc} from '@/_axios/api/approval'
import { $axQueryBattlepass, $axQueryLengendMallAd, $axQueryLimitedMallAd, $axQueryMainTenanceNotice, $axQueryRegularMail, $axQueryVersinDesc } from '../../../_axios/api/approval';

export default {
    namespaced: true,
    state: {
        list:[]
    },
    actions: {
        sendGetList({state},data){
            return $axGetList(data).then(res=>{
                state.list = res.datas;
                return res;
            })
        },
        sendQueryAnnouncement({state},data){
            return $axQueryAnnouncement(data)
        },
        sendQueryBattlepassMallAd(store,data){
            return $axQueryBattlepass(data)
        },
        sendQueryLegendMallAd(store,data){
            return $axQueryLengendMallAd(data)
        },
        sendQueryLimitedMallAd(store,data){
            return $axQueryLimitedMallAd(data)
        },
        sendQueryMaintenanceNotice(store,data){
            return $axQueryMainTenanceNotice(data)
        },
        sendQueryRegularMail(store,data){
            return $axQueryRegularMail(data)
        },
        sendQueryVersionDesc(store,data){
            return $axQueryVersinDesc(data)
        }
    }
}