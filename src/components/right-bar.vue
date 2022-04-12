<template>
  <div>
    <div v-click-outside="config" class="right-bar">
      <div>
        <div class="rightbar-title px-3 py-4">
          <a href="javascript:void(0);" class="right-bar-toggle float-right" @click="hide">
            <i class="mdi mdi-close noti-icon"></i>
          </a>
          <h5 class="m-0">Settings</h5>
        </div>
        <hr class="mt-0" /> 

        <h6 class="text-center mb-0">Choose Mode</h6>

        <div class="p-4">
          <div class="mb-2">
              <div class="mb-3 text-center">
                <label class="card-radio-label mb-2">
                  <input
                    type="radio"
                    name="theme"
                    class="card-radio-input"
                    :checked="theme == 'light' ? true : false" 
                    @click="seltheme = 'light'"
                  />
                  <div class="card-radio">
                    <div>
                      <img src="@/assets/images/layouts/layout-1.jpg" class="img-fluid img-thumbnail"/>
                    </div>
                  </div>
                </label>
                <span class="font-weight-bold">Light Mode</span>
              </div>
          </div>
          <div class="mb-2">
              <div class="mb-3 text-center">
                <label class="card-radio-label mb-2">
                  <input
                    type="radio"
                    name="theme"
                    class="card-radio-input"
                    :checked="theme == 'dark' ? true : false"
                    @click="seltheme = 'dark'"
                  />
                  <div class="card-radio">
                    <div>
                      <img src="@/assets/images/layouts/layout-2.jpg" class="img-fluid img-thumbnail" alt />
                    </div>
                  </div>
                </label>
                <span class="font-weight-bold">Dark Mode</span>
              </div>
          </div>
          <b-button variant="primary" class=" w-xs float-right" @click="setTheme()">apply</b-button>
        </div>
      </div>
    </div>

    <!-- Right bar overlay-->
    <div class="rightbar-overlay"></div>
  </div>
</template>

<script>
/**
 * Right sidebar component
 */
export default {
  components: {},
  data() {
    return {
      config: {
        handler: this.handleRightBarClick,
        middleware: this.middleware,
        events: ["click"]
      },
      theme: (localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light'),
      seltheme: ''
    };
  },

  methods: {
    setTheme(){
      if (this.seltheme != '') {
        localStorage.setItem('theme', this.seltheme);
      }
      this.$router.go(this.$router.currentRoute)
    },

    hide() {
      this.$parent.toggleRightSidebar();
    },
    // eslint-disable-next-line no-unused-vars
    handleRightBarClick(e, el) {
      this.$parent.hideRightSidebar();
    },
    // eslint-disable-next-line no-unused-vars
    middleware(event, el) {
      return !event.target.classList.contains("toggle-right");
    }
  },

  mounted(){
    this.theme = (localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light');
  }
};
</script>

<style lang="scss"></style>
