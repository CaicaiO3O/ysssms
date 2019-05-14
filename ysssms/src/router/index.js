import Vue from 'vue'
import Router from 'vue-router'

import login from '@/components/login/login'
import home from '@/components/home/home'
import main from '@/components/main/main'
import proManage from '@/components/proManage/proManage'
import proAdd from '@/components/proAdd/proAdd'
import proEdit from '@/components/proEdit/proEdit'
import proParameter from '@/components/proParameter/proParameter'
import proSample from '@/components/proSample/proSample'
import addParam from '@/components/addParam/addParam'
import sampleRecord from '@/components/sampleRecord/sampleRecord'
import proIntegration from '@/components/proIntegration/proIntegration'
import proStatistics from '@/components/proStatistics/proStatistics'
import vipInformation from '@/components/vipInformation/vipInformation'
import vipJoinRecord from '@/components/vipJoinRecord/vipJoinRecord'
import vipRecommendRecord from '@/components/vipRecommendRecord/vipRecommendRecord'
import vipQcAudit from '@/components/vipQcAudit/vipQcAudit'
import vipZyzAudit from '@/components/vipZyzAudit/vipZyzAudit'
import vipIntegration from '@/components/vipIntegration/vipIntegration'
import goodsSeries from '@/components/goodsSeries/goodsSeries'
import goodsAdmin from '@/components/goodsAdmin/goodsAdmin'
import goodsOrder from '@/components/goodsOrder/goodsOrder'
import vipEdit from '@/components/vipEdit/vipEdit'
import vipIntegrationRecord from '@/components/vipIntegrationRecord/vipIntegrationRecord'
import vipActivity from '@/components/vipActivity/vipActivity'
import vipTelVerify from '@/components/vipTelVerify/vipTelVerify'
import settingBanner from '@/components/settingBanner/settingBanner'
import settingIntr from '@/components/settingIntr/settingIntr'
import settingNotice from '@/components/settingNotice/settingNotice'
import settingQuestion from '@/components/settingQuestion/settingQuestion'
import settingRule from '@/components/settingRule/settingRule'
import settingFeedback from '@/components/settingFeedback/settingFeedback'


Vue.use(Router)

export default new Router({
  routes: [
//  {
//    path: '/login',
//    name: 'login',
//    component: login,
//  },
    {
      path: '/',
      name: 'home',
      component: home,
      redirect: 'main',
      children: [
        {
          path: 'main',
          name: '首页',
          component: main,
        },
        {
          path: 'settingBanner',
          name: 'banner设置',
          component: settingBanner,
        },      
        {
          path: 'settingIntr',
          name: '平台简介',
          component: settingIntr,
        },
        {
          path: 'settingNotice',
          name: '网站公告',
          component: settingNotice,
        }, 
        {
          path: 'settingRule',
          name: '兑换工作',
          component: settingRule,
        },         
        {
          path: 'settingQuestion',
          name: '常见问题',
          component: settingQuestion,
        },
        {
          path: 'settingFeedback',
          name: '业务联系',
          component: settingFeedback,
        },  
        {
          path: 'vipInformation',
          name: '会员信息',
          component: vipInformation,
        },
        {
          path: 'vipJoinRecord',
          name: '参与记录',
          component: vipJoinRecord,
        },
        {
          path: 'vipQcAudit',
          name: '电话QC记录',
          component: vipQcAudit,
        },  
        {
          path: 'vipZyzAudit',
          name: '执业证审核',
          component: vipZyzAudit,
        },
        {
          path: 'vipRecommendRecord',
          name: '推荐记录',
          component: vipRecommendRecord,
        },
        {
          path: 'vipIntegration',
          name: '积分管理',
          component: vipIntegration,
        },
        {
          path: 'vipEdit',
          name: '编辑会员信息',
          component: vipEdit,
        },
        {
          path: 'vipIntegrationRecord',
          name: '会员积分记录',
          component: vipIntegrationRecord,
        },
        {
          path: 'vipActivity',
          name: '活跃度',
          component: vipActivity,
        },
        {
          path: 'vipTelVerify',
          name: '电话QC审核',
          component: vipTelVerify,
        },
        {
          path: 'goodsSeries',
          name: '商品系列',
          component: goodsSeries,
        },   
        {
          path: 'goodsAdmin',
          name: '商品管理',
          component: goodsAdmin,
        },   
        {
          path: 'goodsOrder',
          name: '订单列表',
          component: goodsOrder,
        },   
        {
          path: 'proManage',
          name: '项目管理',
          component: proManage,
        },
        {
          path: 'proAdd',
          name: '增加项目',
          component: proAdd,
        },
        {
          path: 'proEdit',
          name: '编辑项目',
          component: proEdit,
        },
        {
          path: 'proParameter',
          name: '项目参数',
          component: proParameter,
        },
        {
          path: 'proParameter',
          name: '项目参数',
          component: proParameter,
        },   
        {
          path: 'proSample',
          name: '项目抽样',
          component: proSample,
        },
        {
          path: 'addParam',
          name: '添加抽样条件',
          component: addParam,
        },     
        {
          path: 'sampleRecord',
          name: '项目抽样记录',
          component: sampleRecord,
        }, 
        {
          path: 'proIntegration',
          name: '项目积分',
          component: proIntegration,
        },
        {
          path: 'proStatistics',
          name: '项目进度',
          component: proStatistics,
        }, 
      ]      
    },
  ]
})
