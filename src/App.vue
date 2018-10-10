<template>
  <div id="app">
  	<div id="main">
  		<h1>Current Brightness: {{brightness}}</h1>
  		<div id="setter" v-if="isSetting">
  			<i class="arrow down" ref="arrow"></i>
  			<div id="rectangle" class="animate" ref="volume" :style="{ 'animation-play-state': playState, background: `linear-gradient(to right, #1E88E5 ${this.brightness}%, #d3d3d3 ${this.brightness}%)`}">
					<img src="./assets/sun.svg" class="sun tick">
				</div>
  		</div>
    	<button v-if="!isSetting" @click="btn">{{msg}}</button>
		<button v-if="isSetting" @click="running">{{startStop}}</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
     	brightness: 0,
     	isSetting: false,
		playState: 'running', 
    }
  },

  methods: {
		running(){
				if(this.playState === 'paused'){
					this.playState = 'running';
				} else {
					this.playState = 'paused';
				}

				this.set();
		},
		btn(){
			if(this.isSetting){
				if(this.isMoving){
					this.isMoving = false;
				} else {
					this.isMoving = true;
				}
			} else {
				this.isSetting = true;
			}
		},
		set(){
			if(this.playState !== 'running'){
				let vw = document.documentElement.clientWidth;
				let rect_width = 0.4 * vw;
				let left = this.$refs['volume'].getBoundingClientRect().x;
				let right = left + rect_width;
				let center = vw/2;
				if(left < center && right > center){
					let percent = ((center - left) / rect_width) * 100;
					this.brightness = Math.round(percent);
				} else{
					this.brightness = 0;
				}
			}
		}
		
  },

  computed: {
    // a computed getter
    msg: function () {
      // `this` points to the vm instance
      return this.isSetting ? "Stop" : "Adjust Screen Brightness"
    },
	startStop() {
		return this.playState === 'paused' ? 'Set' : 'Stop';
	}
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100vh;
  width: 100vw;
}

.sun{
	height: 15px;
	width: 15px;
}

.tick{
	margin-left: 5px;
	margin-right: 5px;
	z-index: 2;
}
/* The animation code */
@keyframes example {
    from {margin-left: -45%;}
    to {margin-left: 100%;}
}

.animate{
	animation-direction: alternate;
	animation-duration: 1s;
	animation-iteration-count: infinite;
	animation-name: example;
}

#rectangle {
	width: 40vw;
	height: 25px;
	border-radius: 2px;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	position:relative;
	color: white;
}

i {
    border: solid black;
    border-width: 0 6px 6px 0;
    display: inline-block;
    padding: 3px;
    height: 10px;
    width: 10px;
    margin-bottom: 10px
}

.down {
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
}


#setter {
	width: 100%;
	height: 80px;
}

#main{
  height: 100vh;
  width: 100vw;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
}

button{
	height: 50px;
	width: 200px;
	background: black;
	color: white;
	font-size: 15px;
	border-radius: 4px;
	border: 0px;
	cursor: pointer;
}

button:hover{
	background: #696969;
}

</style>
