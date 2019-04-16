// 引入mockjs
import {
  Random as _Random,
  mock
} from 'mockjs';
// 获取 mock.Random 对象
const Random = _Random
// mock一组数据

const getMenuInfo = function () {
  let articles = [{
      "path": "",
      "component": "Layout",
      "redirect": "dashboard",
      "children": [{
        "path": "dashboard",
        "component": "dashboard/index",
        "meta": {
          "title": "首页",
          "icon": "el-icon-menu"
        }
      }]
    },
    {
      "path": "/logs",
      "component": "Layout",
      "redirect": "/logs/web",
      "name": "Logs",
      "meta": {
        "title": "日志",
        "icon": "el-icon-menu"
      },
      "children": [{
          "path": "webadmin",
          "name": "WebAdmin",
          "component": "logs/webadmin/index",
          "meta": {
            "title": "站点日志",
            "icon": "el-icon-menu"
          }
        },
        {
          "path": "webapi",
          "name": "WebApi",
          "component": "logs/webapi/index",
          "meta": {
            "title": "接口日志",
            "icon": "el-icon-menu"
          }
        },
        {
          "path": "manager",
          "name": "Manager",
          "component": "logs/manager/index",
          "meta": {
            "title": "配置管理",
            "icon": "el-icon-menu"
          }
        }
      ]
    },
    {
      "path": "/form",
      "component": "Layout",
      "children": [{
        "path": "index",
        "name": "Form",
        "component": "form/index",
        "meta": {
          "title": "表单",
          "icon": "el-icon-menu"
        }
      }]
    },
    {
      "path": "*",
      "redirect": "/404",
      "hidden": true
    }
  ];

  return {
    router: articles
  };
}

// Mock.mock( url, post/get , 返回的数据)
mock('api/menu/info', 'post', getMenuInfo)
