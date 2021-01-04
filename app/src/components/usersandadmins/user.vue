<template>
  <div class="text-center">
    <div>
      <v-alert class="suc" :color="type" v-if="type">
        saved ! you score is {{ (this.score += 1) }}
      </v-alert>
    </div>
    <div class="btnbtn">
      <v-btn
        class="ma-2"
        :loading="loading4"
        :disabled="loading4"
        color="info"
        @click="(loader = 'loading4'), showAlert('success'), out(), updt()"
      >
        register entry
        <template v-slot:loader>
          <span class="custom-loader">
            <v-icon light>mdi-cached</v-icon>
          </span>
        </template>
      </v-btn>
    </div>
  </div>
</template>
<script>
const Cookies = require("js-cookie");
const axios = require("axios");
export default {
  name: "user",
  props: { logout: Function },
  data() {
    return {
      type: null,
      elapse: null,
      loader: null,
      loading4: false,
      score: 0,
    };
  },
  mounted: async function() {
    const resp = await axios.post("http://localhost:5000/userscore", {
      username: Cookies.get("name"),
    });
    this.score = resp.data;
  },
  methods: {
    //updates the points when the user clicks on the pointer button
    async updt() {
      await axios.post("http://localhost:5000/scorepluplus", {
        name: Cookies.get("name"),
      });
    },
    //logs the user out after 4 seconds from clicking the ,
    //pointer since he wont need to be logged in because you click the pointer  only once a day
    out() {
      setTimeout(() => {
        this.logout();
      }, 4000);
    },
    //shows a success alert and the user score  if the user clicks on the pointing button
    showAlert(type) {
      this.type = type;

      let timer = this.showAlert.timer;
      if (timer) {
        clearTimeout(timer);
      }
      this.showAlert.timer = setTimeout(() => {
        this.type = null;
      }, 3000);

      this.elapse = 1;
      let t = this.showAlert.t;
      if (t) {
        clearInterval(t);
      }

      this.showAlert.t = setInterval(() => {
        if (this.elapse === 3) {
          this.elapse = 0;
          clearInterval(this.showAlert.t);
        } else {
          this.elapse++;
        }
      }, 1000);
    },
  },
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => {
        this[l] = false;
      }, 2000);

      this.loader = null;
    },
  },
};
</script>
<style>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
.btnbtn {
  margin: 20% auto;
}
.suc {
  margin: 1% auto;
  width: 10%;
}
</style>
