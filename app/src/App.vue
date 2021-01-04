<template>
  <v-app>
    <div>
      <div v-if="!loggedin"><Form1 :loginreq="loginreq" /></div>
      <div v-else-if="loggedin && isitadmin">
        <admin :logout="logout" />
      </div>
      <div v-else-if="loggedin && !isitadmin"><user :logout="logout" /></div>
    </div>
  </v-app>
</template>

<script>
import Form1 from "./components/login/login";
import admin from "./components/usersandadmins/admin";
import user from "./components/usersandadmins/user";
const axios = require("axios");
const Cookies = require("js-cookie");
export default {
  name: "App",
  components: {
    Form1,
    admin,
    user,
  },
  data() {
    return {
      loggedin: false,
      isitadmin: false,
    };
  },
  //checks if the user is logged in or not and if he is an admin or not
  mounted: function() {
    if (Cookies.get("admin") && Cookies.get("name")) {
      this.isitadmin = true;
      this.loggedin = true;
    } else if (Cookies.get("name")) {
      this.loggedin = true;
    }
  },
  methods: {
    //logout function
    logout: function() {
      Cookies.remove("name");
      Cookies.remove("admin");
      this.isitadmin = false;
      this.loggedin = false;
      document.location.reload(true);
    },
    //login function
    loginreq: async function(email, pass) {
      try {
        const resp = await axios.post("http://localhost:5000/login", {
          email,
          pass,
        });
        console.log(resp.data);
        if (resp.data !== null) {
          try {
            if (resp.data.isadmin === true) {
              this.isitadmin = true;
              Cookies.set("admin", true, { expires: 1 });
            }
            Cookies.set("name", resp.data.username, { expires: 1 });

            this.loggedin = true;
          } catch (error) {
            console.log("sorry error happened ");
          }
        }
        document.location.reload(false);
      } catch (err) {
        // Handle Error Here
        console.error(err);
      }
    },
  },
};
</script>

<style>
#app {
  background-image: url("assets/Vorderrhein.svg");
  background-size: cover;
}
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #f5f5f5;
}
::-webkit-scrollbar {
  width: 10px;
  background-color: #f5f5f5;
}

::-webkit-scrollbar-thumb {
  background-color: #f90;
  background-image: -webkit-linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.2) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0.2) 75%,
    transparent 75%,
    transparent
  );
}
</style>
