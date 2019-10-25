<template>
    <div class="page-wrap">
        <SearchPannel>
            <div slot="condition">
                <label>审核状态</label>
                <el-select @change="queryStatusChange" v-model="queryParams.status" placeholder="请选择">
                    <el-option
                            v-for="item in statusMap.get('all')"
                            :key="item.value"
                            :label="item.text"
                            :value="item.value">
                    </el-option>
                </el-select>
                &nbsp;
                <label>事件分类</label>
                <el-select @change="queryEventTypeChange" v-model="queryParams.businessType" placeholder="请选择">
                    <el-option
                            v-for="item in eventTypeMap.get('all')"
                            :key="item.value"
                            :label="item.text"
                            :value="item.value">
                    </el-option>
                </el-select>
            </div>
        </SearchPannel>
        <TableBox v-model="pagination" :action="queryList" class="table">
            <el-table v-loading="tableLoading" :data="list">
                <el-table-column label="编号"
                                 type="index"
                                 :index="indexMethod">
                </el-table-column>
                <el-table-column prop="submitTime"
                                 label="提交时间">
                </el-table-column>
                <el-table-column label="事件类别">
                    <template slot-scope="{row}">{{eventTypeMap.get(row.businessType)}}</template>
                </el-table-column>
                <el-table-column prop="publisherName" label="发布者">
                </el-table-column>
                <el-table-column prop="publishAreaCode" label="发布区组">
                </el-table-column>
                <el-table-column prop="planPubStartTime" label="计划发布时间">
                </el-table-column>
                <el-table-column prop="planPubEndTime" label="计划结束时间">
                </el-table-column>
                <el-table-column label="当前状态">
                    <template slot-scope="{row}">
                        <color-text :type="formatStatusType(row.status)">{{statusMap.get(row.status)}}</color-text>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="{row}">
                        <asyncButton size="mini" label="查看" @_click="handleEditClick" :arguments="row" type="primary"></asyncButton>
                    </template>
                </el-table-column>
            </el-table>
        </TableBox>
        <el-dialog center :visible.sync="showDialog">
            <announcement v-if="dialogState[0]" ref="announcement"></announcement>
            <legendMallAd v-if="dialogState[1]" ref="legendMallAd"></legendMallAd>
            <battlepassMallAd v-if="dialogState[2]" ref="battlepassMallAd"></battlepassMallAd>
            <limitedMallAd v-if="dialogState[3]" ref="limitedMallAd"></limitedMallAd>
            <regularMail v-if="dialogState[4]" ref="regularMail"></regularMail>
            <versionDesc v-if="dialogState[5]" ref="versionDesc"></versionDesc>
            <maintenanceNotice v-if="dialogState[6]" ref="maintenanceNotice"></maintenanceNotice>
            <span slot="footer" class="dialog-footer">
            <asyncButton label="通过" @_click="passApproval" type="primary" exec_label="正在提交"></asyncButton>
            <asyncButton label="拒绝" @_click="rejectApproval" type="primary" exec_label="正在提交"></asyncButton>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {approveStatus,eventTypeMap} from '@/utils/constents'
    import TableBox from '@/components/tableBox'
    import SearchPannel from '@/components/search-pannel'
    import colorText from '@/components/color-text'
    import asyncButton from '@/components/asyncButton'
    import triggerSearch from '@/mixins/triggerSearch'
    import announcement from "./components/announcement";
    import battlepassMallAd from "./components/battlepassMallAd";
    import legendMallAd from "./components/legendMallAd";
    import limitedMallAd from "./components/limitedMallAd";
    import regularMail from "./components/regularMail";
    import versionDesc from "./components/versionDesc";
    import maintenanceNotice from "./components/maintenanceNotice"
    import {createNamespacedHelpers} from 'vuex'
    const {mapState,mapActions} = createNamespacedHelpers('approveList');

    export default {
        name: "notice",
        mixins:[triggerSearch],
        components:{TableBox,SearchPannel,asyncButton,colorText,announcement,battlepassMallAd,legendMallAd,limitedMallAd,regularMail,versionDesc,maintenanceNotice},
        created() {
            this.statusMap = approveStatus;
            this.eventTypeMap = eventTypeMap;
        },
        data(){
            return {
                queryParams:{status:'',businessType:''},
                pagination: {
                    pageIndex: 1,
                    pageSize: 10,
                    total: 0
                },
                tableLoading:false,
                showDialog:false,
                dialogState:[0,0,0,0,0,0,0]
            }
        },
        computed:{
            ...mapState({
                list:'list'
            })
        },
        methods:{
            ...mapActions({
                sendGetList:'sendGetList',
                sendQueryAnnouncement:'sendQueryAnnouncement',
                sendQueryBattlepassMallAd:'sendQueryBattlepassMallAd',
                sendQueryLegendMallAd:'sendQueryLegendMallAd',
                sendQueryLimitedMallAd:'sendQueryLimitedMallAd',
                sendQueryMaintenanceNotice:'sendQueryMaintenanceNotice',
                sendQueryRegularMail:'sendQueryRegularMail',
                sendQueryVersionDesc:'sendQueryVersionDesc',
                sendAuditAnnouncement:'sendAuditAnnouncement',
                sendAuditVersionDesc:'sendAuditVersionDesc',
                sendAuditMaintnotice:'sendAuditMaintnotice',
                sendAuditLegendMallAd:'sendAuditLegendMallAd',
                sendAuditLimitedMallAd:'sendAuditLimitedMallAd',
                sendAuditRegularMail:'sendAuditRegularMail',
                sendAuditBattlepassAd:'sendAuditBattlepassAd'

            }),
            formatAnnouncementData(data){
                if(data.showButton){
                    let btns = data.showButton.split(',');
                    data.filelist = data.imgs.map(item=>({imgCode:item.imgCode,url:item.url,_url:null}));
                    data.btns = data.imgs.map((item,index)=>({imgCode:item.imgCode,url:item.url,_url:null,btn:btns[index]}));
                }
                return data;
            },
            formatRegularMailData(data){
                data.prop = JSON.parse(data.prop);
                if(data.assginUserIds === 'ALL'){
                    data.publishGroup = 'ALL';
                    data.userids = [];
                }else{
                    data.publishGroup = 'PART'
                    data.userids = [{imgCode:data.assginUserIds.split(':')[1],url:''}]
                }
                return data
            },
            formatMallAdData(data){
                data.filelist = data.imgs.map(item=>({imgCode:item.imgCode,url:item.url,_url:item.url}));
                return data
            },
            openDialog(){
                this.showDialog = true;
            },
            switchDialogConfig(type){
                let ref = '',queryFunc,formatFunc,auditFunc;
                switch (type) {
                    case 'NOTICE_WORD':
                    case 'NOTICE_IMG':
                        this.dialogState = [1,0,0,0,0,0,0];
                        ref = 'announcement';
                        queryFunc = this.sendQueryAnnouncement;
                        formatFunc = this.formatAnnouncementData;
                        auditFunc = this.sendAuditAnnouncement;
                        break;
                    case 'LEGEND_AD':
                        this.dialogState = [0,1,0,0,0,0,0];
                        ref = 'legendMallAd';
                        queryFunc = this.sendQueryLegendMallAd;
                        formatFunc = this.formatMallAdData;
                        auditFunc = this.sendAuditLegendMallAd;
                        break;
                    case 'BATTLE_AD':
                        this.dialogState = [0,0,1,0,0,0,0];
                        ref = 'battlepassMallAd';
                        queryFunc = this.sendQueryBattlepassMallAd;
                        formatFunc = this.formatMallAdData;
                        auditFunc = this.sendAuditBattlepassAd;
                        break;
                    case 'FIX_TIME_AD':
                        this.dialogState = [0,0,0,1,0,0,0];
                        ref = 'limitedMallAd';
                        queryFunc = this.sendQueryLimitedMallAd;
                        formatFunc = this.formatMallAdData
                        auditFunc = this.sendAuditLimitedMallAd;
                        break;
                    case 'MAIL_PLAN':
                        this.dialogState = [0,0,0,0,1,0,0];
                        ref = 'regularMail';
                        queryFunc = this.sendQueryRegularMail;
                        formatFunc = this.formatRegularMailData;
                        auditFunc = this.sendAuditRegularMail;
                        break;
                    case 'VER_DESC':
                        this.dialogState = [0,0,0,0,0,1,0];
                        ref = 'versionDesc';
                        queryFunc = this.sendQueryVersionDesc;
                        auditFunc = this.sendAuditVersionDesc;
                        break;
                    case 'MAINT_NOTICE':
                        this.dialogState = [0,0,0,0,0,0,1];
                        ref = 'maintenanceNotice';
                        queryFunc = this.sendQueryMaintenanceNotice;
                        auditFunc = this.sendAuditMaintnotice;
                        break;
                }
              return {ref,queryFunc,formatFunc,auditFunc};
            },
            passApproval(promise){
                let cacheData = this.cacheData;
                promise(cacheData.auditFunc({audit:'pass',businessId:cacheData.businessId}).then(()=>{
                    this.$message.success('操作成功！');
                    this.closeDialog();
                    this.queryList();
                }))
            },
            rejectApproval(promise){
                let cacheData = this.cacheData;
                promise(cacheData.auditFunc({audit:'reject',businessId:cacheData.businessId}).then(()=>{
                    this.$message.success('操作成功！');
                    this.closeDialog();
                    this.queryList();
                }))
            },
            closeDialog(){
              this.showDialog = false
            },
            handleEditClick(promise,row){
                let target = this.switchDialogConfig(row.businessType);
                this.cacheData = {...target,businessId:row.businessId};
                promise(Promise.all([this.getAreaLanguageData(),target.queryFunc({businessId:row.businessId})]).then(res=>{
                    let data = res[1];
                    target.formatFunc && (data=target.formatFunc(data));
                    this.openDialog();
                    this.$nextTick(()=>{
                    this.$refs[target.ref].initFormData(data);
                })
                }))
            },
            submitForm(){
              let data = this.$refs['creditOrEdit'].getData();
              console.log(data);
              if(data){
                if(data.id){//编辑
                    this.sendEditItem(data);
                }else {//新增
                    this.sendAddItem(data);
                }
              }
            },
            queryList(){
                this.tableLoading = true;
                this.sendGetList({
                    status:this.queryParams.status,
                    businessType:this.queryParams.businessType,
                    pageindex:this.pagination.pageIndex,
                    pageSize:this.pagination.pageSize
                }).then(res=>{
                    this.tableLoading = false;
                    this.pagination.total = res.total;
                }).catch(()=>{this.tableLoading = false})
            }
        },
        mounted() {
            this.queryList();
        }
    }
</script>

<style scoped>

</style>