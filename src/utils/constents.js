/**
 * 公告 状态类型枚举
 * @type {Map<any, any>}
 */
export const announcementStatus = new Map();
announcementStatus.set('all',[
    {value:'',text:'全部'},
    {value:'1',text:'待审核'},
    {value:'2',text:'已通过'},
    {value:'3',text:'已拒绝'}
]);
announcementStatus.set('1','待审核');
announcementStatus.set('2','已通过');
announcementStatus.set('3','已拒绝');

/**
 * 版本 状态类型枚举
 * @type {Map<any, any>}
 */
export const versionDescStatus = new Map();
versionDescStatus.set('all',[
    {value:'',text:'全部'},
    {value:'1',text:'待审核'},
    {value:'2',text:'已通过'},
    {value:'3',text:'已拒绝'}
]);
versionDescStatus.set('1','待审核');
versionDescStatus.set('2','已通过');
versionDescStatus.set('3','已拒绝');


/**
 * 常规邮件 状态类型枚举
 * @type {Map<any, any>}
 */
export const regularMailStatus = new Map();
regularMailStatus.set('all',[
    {value:'',text:'全部'},
    {value:'1',text:'待审核'},
    {value:'2',text:'已通过'},
    {value:'3',text:'已拒绝'}
]);
regularMailStatus.set('1','待审核');
regularMailStatus.set('2','已通过');
regularMailStatus.set('3','已拒绝');

/**
 * 现实商城广告 状态类型枚举
 * @type {Map<any, any>}
 */
export const limitedMallAdStatus = new Map();
limitedMallAdStatus.set('all',[
    {value:'',text:'全部'},
    {value:'1',text:'待审核'},
    {value:'2',text:'已通过'},
    {value:'3',text:'已拒绝'}
]);
limitedMallAdStatus.set('1','待审核');
limitedMallAdStatus.set('2','已通过');
limitedMallAdStatus.set('3','已拒绝');

/**
 * 传奇商城广告 状态类型枚举
 * @type {Map<any, any>}
 */
export const legendMallAdStatus = new Map();
legendMallAdStatus.set('all',[
    {value:'',text:'全部'},
    {value:'1',text:'待审核'},
    {value:'2',text:'已通过'},
    {value:'3',text:'已拒绝'}
]);
legendMallAdStatus.set('1','待审核');
legendMallAdStatus.set('2','已通过');
legendMallAdStatus.set('3','已拒绝');

/**
 * battlepass商城广告 状态类型枚举
 * @type {Map<any, any>}
 */
export const battlepassMallAdStatus = new Map();
battlepassMallAdStatus.set('all',[
    {value:'',text:'全部'},
    {value:'1',text:'待审核'},
    {value:'2',text:'已通过'},
    {value:'3',text:'已拒绝'}
]);
battlepassMallAdStatus.set('1','待审核');
battlepassMallAdStatus.set('2','已通过');
battlepassMallAdStatus.set('3','已拒绝');

/**
 * 审批端 状态类型枚举
 * @type {Map<any, any>}
 */
export const approveStatus = new Map();
approveStatus.set('all',[
    {value:'',text:'全部'},
    {value:'1',text:'待审核'},
    {value:'2',text:'已通过'},
    {value:'3',text:'已拒绝'}
]);
approveStatus.set('1','待审核');
approveStatus.set('2','已通过');
approveStatus.set('3','已拒绝');

/**
 * 审批端 事件类型枚举
 * @type {Map<any, any>}
 */
export const eventTypeMap = new Map();
eventTypeMap.set('all',[
    {value:'',text:'公告发布-文字'},
    {value:'1',text:'公告发布-图片'},
    {value:'2',text:'版本日志'},
    {value:'3',text:'维护预告'},
    {value:'4',text:'停服公告'},
    {value:'5',text:'常规邮件/补偿'},
    {value:'6',text:'限时商城广告'},
    {value:'7',text:'传奇商城广告'},
    {value:'8',text:'battlepass商城广告'}
]);
eventTypeMap.set('1','公告发布-文字');
eventTypeMap.set('2','公告发布-图片');
eventTypeMap.set('3','版本日志');
eventTypeMap.set('4','维护预告');
eventTypeMap.set('5','常规邮件/补偿');
eventTypeMap.set('6','限时商城广告');
eventTypeMap.set('7','传奇商城广告');
eventTypeMap.set('8','battlepass商城广告');


