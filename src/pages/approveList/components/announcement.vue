<template>
    <el-form :model="form" :rules="rules" ref="form" label-width="80px" class="form-wrap">
        <el-form-item label="公告模板" required>
            <el-col :span="6">
                <el-form-item prop="eventType">
                    <el-select :disabled="disabled" v-model="form.eventType" placeholder="请选择公告模板">
                        <el-option v-for="item in templateTypeMap.get('all')" :key="item.value" :label="item.text" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <template v-if="form.eventType==='NOTICE_IMG'">
                <el-col class="line" :span="1">&nbsp;</el-col>
                <el-col :span="6">
                    <el-form-item prop="styleType">
                        <el-select :disabled="disabled" v-model="form.styleType" placeholder="请选择图片模板">
                            <el-option v-for="item in templateMap.get('all')" :key="item.value" :label="item.text" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </template>
        </el-form-item>
        <template v-if="form.eventType ==='NOTICE_WORD'">
            <el-form-item label="公告标题" prop="title">
                <el-input :disabled="disabled" v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="公告内容" prop="content">
                <el-input :disabled="disabled" type="textarea" :rows="5" v-model="form.content"></el-input>
            </el-form-item>
        </template>
        <el-form-item v-if="form.eventType==='NOTICE_IMG'" label="图片上传">
            <el-row>
                <template v-for="(objImg,imgIndex) in form.imgs">
                    <el-col :span="8" :key="imgIndex">
                        <el-row>
                            <el-form-item>
                                <uploadImageBox :disabled="disabled" :identity="imgIndex+1+''" v-model="form.imgs[imgIndex]" class="imgBox"></uploadImageBox>
                            </el-form-item>
                        </el-row>
                        <el-row>
                            <el-form-item>
                                <el-select :disabled="disabled" v-model="objImg.buttonId" placeholder="请选择显示按钮">
                                    <el-option v-for="item in btnMap.get('all')" :key="item.value" :label="item.text" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-row>
                    </el-col>
                </template>
        </el-row>
        </el-form-item>
        <el-form-item label="发布区组">
            <el-col :span="6">
                <el-form-item prop="publishAreaCode">
                    <el-select :disabled="disabled" v-model="form.publishAreaCode" placeholder="请选择发布区组">
                        <el-option v-for="(item,index) in areaList" :key="index" :label="item.areaName" :value="item.areaCode"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item prop="languageCode">
                    <el-select :disabled="disabled" v-model="form.languageCode" placeholder="请选择语言包">
                        <el-option v-for="(item,index) in languageList" :key="index" :label="item.langName" :value="item.langCode"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <color-text type="warning">提示：请注意图片或文字是否与选择服务器一致</color-text>
        </el-form-item>
        <el-form-item label="发布版本" prop="vers">
            <el-input :disabled="disabled" v-model="form.vers"></el-input>
        </el-form-item>
        <el-form-item label="定时发布" prop="planPubStartTime">
            <el-date-picker
                    :disabled="disabled"
                    v-model="form.planPubStartTime"
                    type="datetime"
                    placeholder="选择定时发布时间">
            </el-date-picker>
            {{_planPubStartTime}}
        </el-form-item>
        <el-form-item label="定时关闭" prop="planPubEndTime">
            <el-date-picker
                    :disabled="disabled"
                    v-model="form.planPubEndTime"
                    type="datetime"
                    placeholder="选择定时关闭时间">
            </el-date-picker>
            {{_planPubEndTime}}
        </el-form-item>
    </el-form>
</template>
<script>
    import areaMixin from '@/mixins/area-group'
    import colorText from '@/components/color-text'
    import uploadImageBox from '@/components/uploadImageBox'
    import {templateMap,templateTypeMap,btnMap} from '@/utils/constents'
    export default {
        components:{colorText,uploadImageBox},
        mixins:[areaMixin],
        created(){
            this.rules = {
                styleType: [{required: true, message: '请选择图片模板', trigger: 'change'}],
                eventType: [{required: true, message: '请选择公告模板', trigger: 'change'}],
                title: [{required: true, message: '请输入公告标题', trigger: 'blur'}],
                content: [{required: true, message: '请输入公告内容', trigger: 'blur'}],
                publishAreaCode: [{required: true, message: '请选择发布区组', trigger: 'change'}],
                languageCode: [{required: true, message: '请选择语言包', trigger: 'change'}],
                planPubStartTime: [{required: true, message: '请选择定时发布时间', trigger: 'change'}],
                planPubEndTime: [{required: true, message: '请选择定时关闭时间', trigger: 'change'}],
                vers: [{required: true, message: '请输入发布版本', trigger: 'blur'}],
            };
            this.templateMap = templateMap;
            this.templateTypeMap = templateTypeMap;
            this.btnMap = btnMap;
        },
        data(){
            return{
                disabled:true,
                form:{
                    eventType:'NOTICE_WORD',
                    styleType:'',
                    title:'',
                    content:'',
                    publishAreaCode:'',
                    languageCode:'',
                    planPubStartTime:'',
                    planPubEndTime:'',
                    vers:'',
                    imgs:[{buttonId:'',imgCode:'',url:''},{buttonId:'',imgCode:'',url:''},{buttonId:'',imgCode:'',url:''}]
                },
            }
        },
        methods:{
            initFormData(data){
                this.form = {
                    ...this.form,
                    ...data
                }
            },
            getData(){
                let flag = false;
                this.$refs['form'].validate(valid=>{
                    flag = valid;
                });
                if(!flag){
                    return flag;
                }else {
                    let data,form = this.form;
                    form.planPubStartTime = this.$dayjs(form.planPubStartTime).format('YYYY-MM-DD HH:mm:ss');
                    form.planPubEndTime = this.$dayjs(form.planPubEndTime).format('YYYY-MM-DD HH:mm:ss');
                    if(form.eventType === 'NOTICE_WORD'){
                        data = {
                            id:form.id,
                            businessId:form.businessId,
                            "eventType":form.eventType,
                            "title":form.title,
                            "content":form.content,
                            "publishAreaCode":form.publishAreaCode,
                            "languageCode":form.languageCode,
                            "planPubStartTime": form.planPubStartTime,
                            "planPubEndTime": form.planPubEndTime,
                            vers:form.vers
                        }
                    }else{
                        for(let item of form.imgs){
                            if(item.buttonId&&!item.imgCode ||!item.buttonId&&item.imgCode){
                                this.$message.warning('图片和按钮需一一对应,都选或者都不选');
                                return false;
                            }
                        }
                        data = {
                            id:form.id,
                            businessId:form.businessId,
                            "eventType":form.eventType,
                            "styleType":form.styleType,
                            "publishAreaCode":form.publishAreaCode,
                            "languageCode":form.languageCode,
                            "planPubStartTime": form.planPubStartTime,
                            "planPubEndTime": form.planPubEndTime,
                            "imgCodes":form.imgs.map(item=>item.imgCode?item.imgCode:'{noop}').join(','),
                            "showButton":form.imgs.map(item=>item.buttonId?item.buttonId:'0').join(','),
                            vers:form.vers
                        }
                    }
                    return data;
                }
            }
        }
    }
</script>
<style type="text/scss" scoped lang="scss">
.imgBox{
    height: 153px;
    width: 266px
}
</style>