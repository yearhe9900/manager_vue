<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo">
        <h1 v-else class="sidebar-title">{{ $t('navbar.title') }}</h1>
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo">
        <h1 class="sidebar-title">{{ $t('navbar.title') }}</h1>
      </router-link>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      logo:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABGCAMAAABG8BK2AAAAP1BMVEVHcEz/YwD/ZAD+YgD/ZAD/ZAD/YwD/bQD/YAD/ZQD/YwD/agD/WAD+WQD+aQD+bQD+VgD+cAD+UgD+XgD+ZQD5IyImAAAADXRSTlMAM9qRR614C8IeX+zqhXp4VAAAAw9JREFUWMO1WIu2aCAQPXrQQ0j+/1tvTyoNOWfdjTJm2s00SsvPz/8HJyOmlDFG8Uj4rygmQZEuIKn4SkWoboKJqd+REWkQcuwkEg8k3UQD069A5I1l1F3Ajw5NVHcCPSSNI90NOYDDIvW6WgtbrN401bqUo55ALOvqLE7oZ7nNw+X6DVo34prQ+hVa3seZrr8AqvM+ZsqlMl4aBIs/Na4Gxj5dom4Jt31yOczMqU+sZxFEadcbTGVDX4Yl/MM1HsvVm6sYiaYDrvX2HDMatEBYWe42pzcDOWXOQJCiTsXNZHx1Zm1MZAG6MwAstDmLb3GJWnHY4wS0NhWdOnsWp8FyHIe7AsKdHKF1esmsDt9xcJrYu/DAH15DObROJyvpPl2TBSdhhuKjBhugdTr5iu8WqCK5JTnFg8+AGyvxVLFAq7WQjwZDQQINCkEvBiIjgZLM6YtBZnIgaFDGoDfQWxCJBGaUjlBHPh7jBoX/fo9jk2w5DPwWdG0usHfEGOgt6NtcSOeJMQee/hKP8QCT3LXxo8YPigGTPGDKEJyakOQ5uAJtiuyWzEQw0FlibdygGHiq+3ADzwjGE/sZnkctor0nwFE7g1PdlOAPJAZKchq1E3NjP/w2bgSZGjQEahdD6+lARmr7Uf6Ap7pVujMZuiLEPiXW8NB5CSbZKGWuI9pHY+p02WkIlGSVHEjGrmApXKWy57Zi7SSr2FAVPqmzU9tLIvKXwo0kXxzRMja68jSejxPqZIu5Mri4rld4mjNlABrqeEr9iTnrUNy0m0q7o4kw9YBiPqEbi9osE7VLgRdAoDINvmEqttB02y7By4U+HNXcxb5NKDxBkrdaVlF2LFud0ol5glBEL84qky8uV7Hb287n7TPmxvQd1GeW5qJGrGbPzfa7XADa1XnTfQ9VaFXKey6DX4RhDsZ7bLaX1UnmyvnhW8yZa1S2yjlD7S7Gn7/ZwbCFQBTq14/xgKL12X+8z4A6Nhf2e7k/Yu78S/FI1EsSft6wNgn7us3hglY+zd9/A2U/pVj4KSX+sMfpxj+JJZUGAQ0LpgAAAABJRU5ErkJggg=='
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #2b2f3a;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
