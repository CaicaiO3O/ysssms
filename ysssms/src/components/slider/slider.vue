<template>
    <el-aside>
    	<el-row class="tac" style="height: 100%;">
  		  <el-col style="height: 100%;">
  		    <el-menu
  		      :default-active="$route.path"
  		      class="slider"
  		      background-color="#f4f4f4"
  		      text-color="#333"
  		      active-text-color="#13B5BB"
  		      router
  		      >
  			    <el-submenu v-for="(item,index) in menuList" :key="index" :index='item.id'>
  			      <template slot="title">
  			        <i :class="item.icon"></i>
  			        <span>{{item.title}}</span>
  			      </template>
  			      <el-menu-item-group >
  			        <el-menu-item v-for="child in item.children" :key="child.id" :index='child.index'>{{child.childtitle}}</el-menu-item>
  			      </el-menu-item-group>
  			    </el-submenu>
  		    </el-menu>
  		  </el-col>
    	</el-row>
    </el-aside>	
</template>

<script>
export default {
  name: 'slider',
  data(){
    return {
      menuList:[
        {
          id:'1',
          title: '会员管理',
          icon:'el-icon-star-on',
          children:[
            {
              index:'/vipInformation',
              childtitle:'会员信息'
            },
            {
              index:'/vipQcAudit',
              childtitle:'电话QC记录'
            },
            {
              index:'/vipZyzAudit',
              childtitle:'执业证审核'
            },
            {
              index:'/vipIntegration',
              childtitle:'积分管理'
            },  
          ]
        },
        {
          id:'2',
          title: '商城管理',
          icon:'el-icon-goods',
          children:[
            {
              index:'/goodsSeries',
              childtitle:'商品系列'
            }, 
            {
              index:'/goodsAdmin',
              childtitle:'商品管理'
            }, 
            {
              index:'/goodsOrder',
              childtitle:'订单列表'
            }, 
          ]
        },        
        {
          id:'3',
          title: '调研项目管理',
          icon:'el-icon-setting',
          children:[
            {
              index:'/proManage',
              childtitle:'项目管理'
            },            
          ]
        },
        {
          id:'4',
          title: '网站信息维护',
          icon:'el-icon-edit-outline',
          children:[
            {
              index:'/settingBanner',
              childtitle:'banner配置'
            }, 
            {
              index:'/settingNotice',
              childtitle:'网站公告'
            },   
            {
              index:'/settingQuestion',
              childtitle:'常见问题'
            },
            {
              index:'/settingRule',
              childtitle:'兑换规则'
            },
            {
              index:'/settingFeedback',
              childtitle:'业务联系'
            },
          ]
        },
        {
          id:'5',
          title: '系统管理',
          icon:'el-icon-edit-outline',
          children:[
            {
              index:'/manAccount',
              childtitle:'账户管理'
            },
            {
              index:'/manRole',
              childtitle:'角色管理'
            },
          ]
        },        
      ]
    }
  },

}
</script>

<style>
	.el-aside,.tac{
		height: 100%;
	}
	
	.slider{
	  height: 100%;
	}
	
	.el-menu-item-group__title{
	  padding: 0;
	}
	
	.el-aside .el-submenu{
	  /*border-bottom: 1px solid #fff;*/
	}
	
	.el-submenu .el-menu-item {
    /*border-top: 1px solid #fff;*/
  }
</style>