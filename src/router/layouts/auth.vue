<template>
  <div>
    <body id="particles-js" style="margin-top:0%; background-color: #052948;" v-if='theme !=="dark"'></body>
     <body id="particles-js" style="margin-top:0%; background-color: #222736;" v-else></body>
    <div class="home-btn d-none d-sm-block pt-0">
        <!-- <router-link tag="a" to="/" class="text-dark">
          <i class="fas fa-home h2"></i>
        </router-link> -->
        <label class="switch">
      <input type="checkbox" @click="toggleCheckbox" :checked="theme == 'dark'">
      <div class="slider round"></div>
    </label>

    </div>
    <div class="account-pages my-0 pt-0">
      <div class="container pt-5">
        <h1 class="text-success"></h1>
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import "particles.js";

export default {
  components: {},
  data() {
    return {
      theme:'',
      checkbox: false,
    }
  },
  mounted(){
    this.theme = localStorage.getItem('theme');
    require('particles.js')
      this.$nextTick(() => {
      this.initParticles();
    })
  },
  methods:{
    initParticles() {
      // console.log('runningx');
      if(this.theme !== 'dark'){
           window.particlesJS("particles-js", {"particles":{"number":{"value":80,"density":{"enable":true,"value_area":800}},"color":{"value":"#ffffff"},"shape":{"type":"circle","stroke":{"width":0,"color":"#000000"},"polygon":{"nb_sides":5},"image":{"src":"img/github.svg","width":100,"height":100}},"opacity":{"value":0.5,"random":false,"anim":{"enable":false,"speed":1,"opacity_min":0.1,"sync":false}},"size":{"value":3,"random":true,"anim":{"enable":false,"speed":40,"size_min":0.1,"sync":false}},"line_linked":{"enable":true,"distance":150,"color":"#ffffff","opacity":0.4,"width":1},"move":{"enable":true,"speed":6,"direction":"none","random":false,"straight":false,"out_mode":"out","bounce":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"detect_on":"canvas","events":{"onhover":{"enable":true,"mode":"repulse"},"onclick":{"enable":true,"mode":"push"},"resize":true},"modes":{"grab":{"distance":400,"line_linked":{"opacity":1}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":8,"speed":3},"repulse":{"distance":200,"duration":0.4},"push":{"particles_nb":4},"remove":{"particles_nb":2}}},"retina_detect":true});
      } else {
            window.particlesJS("particles-js", {"particles":{"number":{"value":80,"density":{"enable":true,"value_area":800}},"color":{"value":"#eeeeee"},"shape":{"type":"circle","stroke":{"width":0,"color":"#000000"},"polygon":{"nb_sides":5},"image":{"src":"img/github.svg","width":100,"height":100}},"opacity":{"value":0.5,"random":false,"anim":{"enable":false,"speed":1,"opacity_min":0.1,"sync":false}},"size":{"value":3,"random":true,"anim":{"enable":false,"speed":40,"size_min":0.1,"sync":false}},"line_linked":{"enable":true,"distance":150,"color":"#eeeeee","opacity":0.4,"width":1},"move":{"enable":true,"speed":6,"direction":"none","random":false,"straight":false,"out_mode":"out","bounce":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"detect_on":"canvas","events":{"onhover":{"enable":true,"mode":"repulse"},"onclick":{"enable":true,"mode":"push"},"resize":true},"modes":{"grab":{"distance":400,"line_linked":{"opacity":1}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":8,"speed":3},"repulse":{"distance":200,"duration":0.4},"push":{"particles_nb":4},"remove":{"particles_nb":2}}},"retina_detect":true});
      }        
    },
      toggleCheckbox() {   
      if(this.theme == 'light') {
          location.reload();
          this.theme = 'dark';
          localStorage.setItem('theme', 'dark');
          this.checkbox = !this.checkbox;
          this.$emit('setCheckboxVal', this.checkbox);
      } 
      else if(this.theme == 'dark') {
          location.reload();
          this.theme = '';
          localStorage.setItem('theme', '');
          this.checkbox = !this.checkbox;
          this.$emit('setCheckboxVal', this.checkbox);
      } 
       else {
          this.theme = 'dark'
          localStorage.setItem('theme', 'dark')
          this.checkbox = !this.checkbox
          this.$emit('setCheckboxVal', this.checkbox)
          location.reload();
      }  
    }
  }
};
</script>

<style scoped>
#particles-js {
  position: absolute;
  width: 100%;
  height: 100%;
}
body {
  padding: 0;
  margin: 0;
}

.togle{
  margin-bottom: -0%;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  display: none;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #021d37;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: #042d50;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #292f3d;
}

input:focus + .slider {
  box-shadow: 0 0 1px #ccc;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

</style>
