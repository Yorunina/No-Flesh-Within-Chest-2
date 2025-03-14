//priority:1000000
/**
 * @author WhiseNT
 */
//加载KubeLoader后会使用serverField,反之则使用global
const publicField = serverField !== undefined ? serverField : global;
//const publicField = serverField
if (Platform.isLoaded("kubeloader")){
    console.log("未加载KubeLoader")
} else console.log("已加载KubeLoader")

publicField.NFWC = {
    /**
     * 提供新增的器官事件
     */
    events:{},
    /**
     * 提供创建新器官的功能
     */
    organManager:{
        /**
         * 提供创建器官相关的函数
         */
        utils:{},
        OrganList:[],
        PseudoOrganList:[],
        OrganScoreGoopRenderStrategy:[],
    },
    /**
     * 提供构造函数
     */
    constructors:{
        //目前只添加了器官organ,若有其他开发者可能用到的可以再添加
        organ:{},

    },
    /**
     * 存储实体相关内容
     */
    entity:{
        /**
         * 提供boss列表
         */
        BossEntityTypeList:[]
    }
}
