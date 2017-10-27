/*
 * 端口域名配置
 * @type Object
 */
var apiUrl = {
    basehostUrl: 'http://121.41.33.113:9902',
}
export default {
   loginhash:apiUrl.basehostUrl+'/v1/user/get-hash',            //用户操作--获取哈希

   login:apiUrl.basehostUrl+'/v1/user/login',						//用户操作--用户登录

   loginout:apiUrl.basehostUrl+'/v1/user/logout',             //用户操作--用户注销

   useradd:apiUrl.basehostUrl+'/v1/user/add',						//用户操作--用户添加

   hardlist:apiUrl.basehostUrl+'/v1/mach/list',						//硬件监控--硬件监控列表

   serverInfo:apiUrl.basehostUrl+'/v1/mach/get-server',			//硬件监控--第一次获取进度条

   hardadd:apiUrl.basehostUrl+'/v1/mach/add',						//硬件监控--添加服务器

   fwqdelete:apiUrl.basehostUrl+'/v1/mach/delete',             //硬件监控--删除服务器

   softlist:apiUrl.basehostUrl+'/v1/project/list',					//软件监控--软件监控列表

   softaddform:apiUrl.basehostUrl+'/v1/project/add',           //软件监控--项目添加

   softdelete:apiUrl.basehostUrl+'/v1/project/delete',         //软件监控--项目删除

   mangeradmins:apiUrl.basehostUrl+'/v1/project/list-admins',  //软件监控--项目管理者

   appmonitoring:apiUrl.basehostUrl+'/v1/server/project-status',//软件监控--应用监控

   pointlist:apiUrl.basehostUrl+'/v1/mach/type-list',          //软件监控--节点下拉

   mangeradd:apiUrl.basehostUrl+'/v1/admin/add',               //软件监控--添加管理员

   adminlist:apiUrl.basehostUrl+'/v1/admin/index',             //软件监控--管理员

   mangerList:apiUrl.basehostUrl+'/v1/admin/list',             //软件监控--管理员下拉菜单

   datarecord:apiUrl.basehostUrl+'/v1/count/project-info',//数据统计--列表
   
   getinfoNodelist:apiUrl.basehostUrl+'/v1/project/info-node',       //项目节点信息
   
   errorcomond:apiUrl.basehostUrl+'/v1/alarm-log/list',			//异常记录--列表

   emailtoadmin:apiUrl.basehostUrl+'/v1/server/project-to-admin',       //异常发送邮件

   pointjiankong:apiUrl.basehostUrl+'/v1/project/info-node',       //异常发送邮件

   errorintroduce:apiUrl.basehostUrl+'/v1/alarm-log/log-update',       //异常记录处理按钮 

   switchchangeon:apiUrl.basehostUrl+'/v1/project/change-monitor',     //软件监控--开关

   switchchangeson:apiUrl.basehostUrl+'/v1/project/change-node',     //软件监控节点--开关

   pointdelete:apiUrl.basehostUrl+'/v1/project/delete-node',          //软件节点删除

   machinfo:apiUrl.basehostUrl+'/v1/mach/info', //获取服务器信息

   updateserver:apiUrl.basehostUrl+'/v1/mach/get-server', //获取硬件信息

   machprojects:apiUrl.basehostUrl+'/v1/mach/projects', //获取项目信息

   deletenode:apiUrl.basehostUrl+'/v1/project/delete-node',//删除节点

   machdelete:apiUrl.basehostUrl+'/v1/mach/delete',//删除服务器v1/project/add-node

   addnode:apiUrl.basehostUrl+'/v1/project/add-node',//节点监控添加节点

   pointreplace:apiUrl.basehostUrl+'/v1/project/restart-node',//节点监控重启按钮

}
