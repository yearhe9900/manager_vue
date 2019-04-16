<template>
  <div class="menu-wrapper">
    <template v-for="item in routesClass">
      <span
        v-if="item.children.length===1 && !item.children[0].children && !item.alwaysShow"
        :key="item.children[0].name"
      >
        <el-menu-item :index="item.path+'/'+item.children[0].path">
          <span
            v-if="item.children[0].meta&&item.children[0].meta.title"
          >{{item.children[0].meta.title}}</span>
        </el-menu-item>
      </span>

      <el-submenu v-else :index="item.name||item.path" :key="item.name">
        <template slot="title">
          <span v-if="item.meta&&item.meta.title">{{item.meta.title}}</span>
        </template>

        <template v-for="child in item.children">
          <sidebar-item
            :is-nest="true"
            v-if="!child.hidden&&child.children&&child.children.length>0"
            :routes="[child]"
            :key="child.path"
          ></sidebar-item>

          <span v-else :key="child.name">
            <el-menu-item :index="item.path+'/'+child.path">
              <span v-if="child.meta&&child.meta.title">{{child.meta.title}}</span>
            </el-menu-item>
          </span>
        </template>
      </el-submenu>
    </template>
  </div>
</template>

<script>
export default {
  name: "sidebarItem",
  props: {
    routes: {
      type: Array
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    routesClass: function() {
      console.log(this.routes.filter(item => !item.hidden && item.children))
      return this.routes.filter(item => !item.hidden && item.children);
    }
  }
};
</script>
