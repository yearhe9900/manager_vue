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
      "path": "/example",
      "component": "Layout",
      "redirect": "/example/table",
      "name": "Example",
      "meta": {
        "title": "案例",
        "icon": "el-icon-menu"
      },
      "children": [{
          "path": "table",
          "name": "Table",
          "component": "table/index",
          "meta": {
            "title": "表格",
            "icon": "el-icon-menu"
          }
        },
        {
          "path": "tree",
          "name": "Tree",
          "component": "tree/index",
          "meta": {
            "title": "树形菜单",
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
