<template>
<!-- 表头 -->
     <div class="header">
        <a-form-item label="统计方式：" >
            <a-select v-model="formData.type" placeholder="请选择统计方式">
            <a-select-option v-for="item in list" :key="item.value" >{{item.name}}</a-select-option>
            </a-select>
        </a-form-item>
        <a-form-item label="统计时间：" class="formtimer">
              <a-date-picker v-model:value="startTime" placeholder="请选择开始时间"/>
              <div class="timeLine">-</div>
              <a-date-picker v-model:value="endTime" placeholder="请选择结束时间"/>
        </a-form-item>
        <a-form-item label="行政区域：" >
              <a-cascader v-model:value="value" :options="admin" placeholder="请选择" />
        </a-form-item>
        <a-form-item label="接种单位：" >
            <a-select v-model="formData.type" placeholder="请输入">
            <a-select-option v-for="(item,index) in units" :key="index">{{item.name}}</a-select-option>
            </a-select>
        </a-form-item>
        <a-form-item label="疫苗生产企业：" >
            <a-select v-model="formData.type" placeholder="请选择">
            <a-select-option v-for="(item,index) in production" :key="index">{{item.name}}</a-select-option>
            </a-select>
        </a-form-item>
        <a-form-item label="剂次：" >
            <a-select v-model="formData.type" placeholder="请选择">
            <a-select-option v-for="(item,index) in count" :key="index">{{item.name}}</a-select-option>
            </a-select>
        </a-form-item>
        <a-button type="primary" :size="size" class="search">搜索</a-button>
         <a-button :size="size" >清空</a-button>
     </div>
     <!-- 表格 -->
     <div class="form_table">
         <a-table 
            :columns="columns" 
            :data-source="data"
            :loading="loading"
            :pagination = "false"
            bordered
            size="middle"
            :scroll="{ x: 'calc(700px + 50%)' }"
          />
     </div>
</template>
<script lang="ts" >

import { defineComponent, reactive,ref } from 'vue';
// import {axios} from 'axios'
// #region
interface Option {
  value: string;
  label: string;
  children?: Option[];
}
const admin: Option[] = [
  {value: '椒江区',label: '椒江区',
    children: [
      {value: '海门街道',label: '海门街道',},
      {value: '白云街道',label: '白云街道',},
      {value: '葭沚街道',label: '葭沚街道',},
      {value: '洪家街道',label: '洪家街道',},
      {value: '三甲街道',label: '三甲街道',},
    ]},
  {value: '临海市',label: '临海市',
    children: [
      {value: '古城街道办事处',label: '古城街道办事处',},
      {value: '大洋街道办事处',label: '大洋街道办事处',},
      {value: '江南街道办事处',label: '江南街道办事处',},
      {value: '大田街道办事处',label: '大田街道办事处',},
      {value: '汛桥镇',label: '汛桥镇', },
    ],
  },
];
// 表格表头
const columns = [
  // 左侧固定区域
  {title: '排序',dataIndex: 'name1',key: '1',width: 80,fixed: 'left',},
  {title: '县市区',dataIndex: 'name2',key: '2',width: 130,fixed: 'left',},
  {title: '乡镇街道',dataIndex: 'name3',key:'3',width: 130,fixed: 'left',},
  {title: '接种单位',dataIndex: 'name4', key: '4',width: 200,fixed: 'left',},
// 合计部分
  {title: '合计',
  children: [
      {title: '第1剂次接种量(万)',dataIndex: 'a',key: '5',width: 150,},
      {title: '第2剂次接种量(万)',dataIndex: 'b',key: '6',width: 150,},  
      {title: '第3剂次接种量(万)',dataIndex: 'c',key: '7',width: 150,},    
      {title: '总几剂次(万)',dataIndex: 'total',key: '8',width: 150, },      
    ],
  },
  // 北京北生研生物制品有限公司
  {title: '北京北生研生物制品有限公司 ',
    children: [
      {title: '第1剂次接种量(万)',dataIndex: 'a1', key: '9',width: 150,},
      {title: '第2剂次接种量(万)',dataIndex: 'b1',key: '10',width: 150,},  
      {title: '第3剂次接种量(万)',dataIndex: 'c1',key: '11',width: 150,},    
      {title: '总几剂次(万)',dataIndex: 'total1',key: '12',width: 150,},      
    ],
  },
  // 北京科兴中维生物技术有限工资
  {title: '北京科兴中维生物技术有限公司 ',
    children: [
      {title: '第1剂次接种量(万)',dataIndex: 'a2',key: '13', width: 150,},
      {title: '第2剂次接种量(万)',dataIndex: 'b2',key: '14',width: 150,},  
      {title: '第3剂次接种量(万)',dataIndex: 'c2',key: '15', width: 150,},    
      {title: '总几剂次(万)',dataIndex: 'total2',key: '16',width: 150,},      
    ],
  },
];
// 表格模拟数据
const mockdata = ref([
   { 
    name1:1,name2:'椒江区',name3:'海门街道',name4:'001',
    a:76,b:12,c:0,total:88,a1:0,
    b1:0,c1:0,total1:0,
    a2:76,b2:12,c2:0,total2:88
   },
   {
    name1:2,name2:'临海市',name3:'古城街道办事处',name4:'001',
    a:6,b:6,c:0,total:12,
    a1:0,b1:0,c1:0,total1:0,
    a2:0,b2:0,c2:0,total2:0 
   },
   {
    name1:3,name2:'椒江区',name3:'海门街道',name4:'001',
    a:7,b:1,c:0,total:8,
    a1:0,b1:0,c1:0,total1:0,
    a2:0,b2:0,c2:0,total2:0
   },
   {
    name1:4,name2:'路桥区',name3:'路桥街道',name4:'001',
    a:4,b:4,c:0,total:8,
    a1:0,b1:0,c1:0,total1:0,
    a2:4,b2:4,c2:0,total2:8
   },
   {
    name1:5,name2:'椒江区',name3:'葭沚街道',name4:'001',
    a:5,b:2,c:0,total:7,
    a1:0,b1:0,c1:0,total1:0,
    a2:5,b2:2,c2:0,total2:7
   }
])
// 统计方式
const list = [
  {name:' 按接种单位统计',value:'unit'},
  {name:' 按乡镇街道统计',value:'street'},
]
// 接种单位
const units = [
  {name:'古城街道社区卫生服务中心'},
  {name:'浙江省台州医院'}
]
// 生产企业
const production = [
   {name:'北京科兴中维生物技术有限公司'},
   {name:'北京北生研生物制品有限公司'},
   {name:'北京祥瑞制品有限公司'}
]
// 剂次
const count = [
  {name:'第一剂次'},
  {name:'第二剂次'},
  {name:'第三剂次'}
]
// #endregion
export default defineComponent({
    name:'FirstTable',
    created(){
       this.getTableData()
    },
    setup() {
          let formData = reactive({
              type:''
          })
          let startTime = ref('')
          let endTime = ref('')
         
          function getTableData(){
            setTimeout(() => {
              data:mockdata
            },3000)
          }

        
        return{
          formData,
          list,
          units,
          count,
          production,
          startTime,
          endTime,
          value: ref<string[]>([]),
          admin,
          size:ref('large'),
          data:[],
          // mockdata,
          columns,
          loading:false,
          getTableData,
          // loading
       } 
    
    }
    });


</script>
<style>
.header{
  display: flex;
  flex-wrap: wrap;
}
.ant-select{
    min-width: 200px;
}
.ant-form-item{
  display: flex;
  flex-wrap: nowrap;
  margin:0 20px 10px 0; 
}
.ant-form-item-control-input-content{
  display: flex;
  height: 32px;
  line-height: 30px;
}
.timeLine{
  margin: 0 5px;
}
.ant-btn-lg{
   height: 32px;
   line-height: 30px;
   padding: 0 15px;
   border-radius: 6px;
}
.search{
    margin-right: 20px;
}
.form_table{
  margin-top: 15px;
}
.ant-table-content::-webkit-scrollbar {
    height: 10px;
    width: 5px;
}
.ant-table-content::-webkit-scrollbar-thumb {
    width: 50%;
    background: #E3ECE8;
}
.ant-table table{
    text-align: center;
}  
.ant-table-content > table > thead > tr > th{
  text-align: center;
  font-weight: 800;
}
</style>