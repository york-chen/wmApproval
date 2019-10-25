import axios from '@/_axios'

export const $axGetList = params => {
    return axios({
        method: 'post',
        url: '/audit/list'
    }, params)
};

export const $axQueryAnnouncement = params => {
    return axios({
        method: 'post',
        url: '/notice/get'
    }, params)
};

export const $axQueryBattlepass = params => {
    return axios({
        method: 'post',
        url: '/battlepassshopplan/get'
    }, params)
};

export const $axQueryLengendMallAd = params => {
    return axios({
        method: 'post',
        url: '/legendshopplan/get'
    }, params)
};

export const $axQueryLimitedMallAd = params => {
    return axios({
        method: 'post',
        url: '/fixtimeshopplan/get'
    }, params)
};

export const $axQueryMainTenanceNotice = params => {
    return axios({
        method: 'post',
        url: '/maintnotice/get'
    }, params)
};

export const $axQueryRegularMail = params => {
    return axios({
        method: 'post',
        url: '/mailplan/get'
    }, params)
};

export const $axQueryVersinDesc = params => {
    return axios({
        method: 'post',
        url: '/verdesc/get'
    }, params)
};

export const $axAuditAnnouncement = params => {
    return axios({
        method: 'post',
        url: '/notice/audit'
    }, params)
};
export const $axAuditVersionDesc = params => {
    return axios({
        method: 'post',
        url: '/verdesc/audit'
    }, params)
};
export const $axAuditMaintnotice = params => {
    return axios({
        method: 'post',
        url: '/maintnotice/audit'
    }, params)
};
export const $axAuditLegendMallAd = params => {
    return axios({
        method: 'post',
        url: '/legendshopplan/audit'
    }, params)
};
export const $axAuditLimitedMallAd = params => {
    return axios({
        method: 'post',
        url: '/fixtimeshopplan/audit'
    }, params)
};
export const $axAuditBattlepassAd = params => {
    return axios({
        method: 'post',
        url: '/battlepassshopplan/audit'
    }, params)
};
export const $axAuditRegularMail = params => {
    return axios({
        method: 'post',
        url: '/mailplan/audit'
    }, params)
};