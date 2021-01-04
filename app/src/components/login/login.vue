<template>
  <div class="formcont">
    <v-form class="loginform" ref="form" v-model="valid" lazy-validation>
      <h1>LOGIN</h1>
      <v-text-field
        v-model="name"
        :counter="10"
        :rules="nameRules"
        label="Name"
        required
      ></v-text-field>

      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="password"
        type="password"
        required
      ></v-text-field>

      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="loginreq(name, email), validate"
      >
        Validate
      </v-btn>

      <v-btn color="error" class="mr-4" @click="reset">
        Reset Form
      </v-btn>
    </v-form>
  </div>
</template>
<script>
export default {
  props: {
    loginreq: Function,
  },
  data: () => ({
    valid: true,
    name: "",
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
    email: "",
    emailRules: [(v) => !!v || "password is required"],
  }),

  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>
<style scoped>
.loginform {
  margin: 15% auto;
  background-color: rgb(251, 251, 251);
  padding: 2%;
  border-radius: 25px;
  width: 40%;
  border: 0.6px solid rgb(160, 160, 160);
}
</style>
