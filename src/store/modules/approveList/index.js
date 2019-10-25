import {
    $axGetList,$axQueryAnnouncement,$axQueryBattlepass,$axQueryLengendMallAd,$axQueryLimitedMallAd,
    $axQueryMainTenanceNotice,$axQueryRegularMail,$axQueryVersinDesc,$axAuditAnnouncement,$axAuditVersionDesc,$axAuditMaintnotice,
    $axAuditLegendMallAd,$axAuditLimitedMallAd,$axAuditBattlepassAd,$axAuditRegularMail,$axReopen} from '@/_axios/api/approval'

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
        },
        sendAuditAnnouncement({state},data){
            return $axAuditAnnouncement(data)
        },
        sendAuditVersionDesc(store,data){
            return $axAuditVersionDesc(data)
        },
        sendAuditMaintnotice(store,data){
            return $axAuditMaintnotice(data)
        },
        sendAuditLegendMallAd(store,data){
            return $axAuditLegendMallAd(data)
        },
        sendAuditLimitedMallAd(store,data){
            return $axAuditLimitedMallAd(data)
        },
        sendAuditRegularMail(store,data){
            return $axAuditRegularMail(data)
        },
        sendAuditBattlepassAd(store,data){
            return $axAuditBattlepassAd(data)
        },
        sendReopen(store,data){
            return $axReopen(data)
        }
    }
}