<template>
  <v-form class="frm" ref="form" v-model="valid" lazy-validation>
    <h1>add users</h1>
    <v-text-field
      v-model="name"
      :counter="10"
      :rules="nameRules"
      label="Name"
      required
    ></v-text-field>

    <v-text-field
      v-model="password"
      :rules="emailRules"
      label="password"
      type="password"
      required
    ></v-text-field>

    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="validate, send()"
    >
      Validate
    </v-btn>

    <v-btn color="error" class="mr-4" @click="reset">
      Reset Form
    </v-btn>
  </v-form>
</template>
<script>
const axios = require("axios");
export default {
  name: "Create",
  data: () => ({
    valid: true,
    name: "",
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
    password: "",
    emailRules: [(v) => !!v || "pass is required "],
  }),

  methods: {
    //posting data to the adduser route to add users
    send() {
      if (this.name.length > 0 && this.password.length > 0) {
        axios.post("http://localhost:5000/adduser", {
          name: this.name,
          pass: this.password,
        });
        document.location.reload(true);
      }
    },
    //////////////////////////////////////////
    validate() {
      this.$refs.form.validate();
    },
    ////////////////////////////////////////
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>
<style scoped>
.frm {
  max-width: 60%;

  margin: 5% auto;
  padding: 3%;
  background-color: rgb(251, 251, 251);
  border-radius: 25px;
  border: 0.6px solid rgb(160, 160, 160);
}
</style>
