let btnStatus = {
    _showExamine:false,//审批操作
    _showReopen:false//重新打开
};
export default {
    data(){
        return {
            btnStatus:{...btnStatus}
        }
    },
    methods:{
        queryStatusChange(){
            this.queryList()
        },
        queryEventTypeChange(){
            this.queryList();
        },
        formatStatusType(status){
            let type = 'primary';
            switch (status) {
                case 'WAIT_AUDIT':type = "primary";break;
                case 'WAIT_PUSH':type = "success";break;
                case 'REJECT':type = "danger";break;
            }
            
        },
        getAreaLanguageData(){
            return Promise.all([this.$store.dispatch('common/sendGetAreas'),this.$store.dispatch('common/sendGetLanguages')])
        },
        indexMethod(index) {
            return index +1;
        }
    },
    watch:{
        showDialog(val){
            if(!val){
                this.btnStatus = {...btnStatus};
            }else{
                let status = this.cacheData.rowData.status;
                if(status === 'WAIT_AUDIT'){
                    this.btnStatus._showExamine = true;
                }
                if(status === 'WAIT_PUSH'){
                    this.btnStatus._showReopen = true;
                }
            }
        }
    } 
}