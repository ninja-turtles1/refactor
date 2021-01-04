<template>
  <div id="cont">
    <div class="cardcont" v-if="!wichone">
      <v-card
        v-for="item in this.arr"
        :key="item.id"
        class="mx-auto"
        max-width="400"
        tile
      >
        <v-icon @click="del(item._id)" class="minus" color="red"
          >mdi-minus</v-icon
        >
        <v-list-item class="infor" two-line>
          <v-list-item-content class="infor">
            <v-list-item-title>{{ item.username }} </v-list-item-title>
            <v-list-item-subtitle
              >score: {{ item.points }}</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </div>

    <div v-else>
      <Create />
    </div>

    <v-btn class="yo" depressed color="primary" @click="this.switch">
      switch
    </v-btn>
    <v-btn class="yo" depressed color="primary" @click="logout">
      logout
    </v-btn>
  </div>
</template>

<script>
import Create from "../userCreationForm/createUser";
const axios = require("axios");
export default {
  //requesting data when the admin component mounts to display the users
  mounted: function() {
    this.$nextTick(async function() {
      try {
        const resp = await axios.get("http://localhost:5000/data");
        this.arr = resp.data.filter((item) => !item.isadmin);
      } catch (err) {
        // Handle Error Here
        console.error(err);
      }
    });
  },
  name: "admin",
  components: {
    Create,
  },
  methods: {
    //the method responsible for deleting a user
    del(itemid) {
      axios.post("http://localhost:5000/delete", { id: itemid });
      document.location.reload(false);
    },
    //the method responsible for switching between the user list and
    //the add user list
    switch() {
      this.wichone = !this.wichone;
    },
  },
  props: {
    logout: Function,
  },
  data() {
    return {
      wichone: false,
      arr: [],
    };
  },
};
</script>

<style scoped>
#cont {
  margin: 5% auto;
  display: flex;
  flex-direction: column;
}
.yo {
  width: 10%;
  margin: 1% auto;
}

.mx-auto {
  display: flex;
  justify-content: space-between;
}
.infor {
  max-width: 40%;
  display: flex;
  justify-content: flex-end;
}
.minus {
  padding: 0;
  cursor: pointer;
}
</style>
