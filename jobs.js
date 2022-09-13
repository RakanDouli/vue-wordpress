const app = Vue.createApp({
  // data, fuctions

  data() {
    return {
      jobs: [],
      checkboxes: [],
      search: "",
      // categories: [],
    };
  },
  methods: {
    async fetchUsers() {
      try {
        const res = await axios.get("https://reqres.in/api/users");
        this.jobs = res.data.data;
      } catch (err) {
        console.log(err);
      }
    },
  },

  mounted() {
    this.fetchUsers();
  },
  computed: {
    setOfCategories: function () {
      const categories = this.jobs.map((job) => job.first_name);

      const NumberOfVacancies = new Map();
      let freq = 0;
      for (var i = 1; i < categories.length; i++) {
        if (categories[i] == categories[i - 1]) {
          freq++;
        } else {
          NumberOfVacancies.set(categories[i - 1], freq + 1);
          freq = 0;
        }
      }
      // console.log(NumberOfVacancies);
      return NumberOfVacancies;
    },
    setOfRegios: function () {
      const categories = this.jobs.map((job) => job.last_name);

      const NumberOfVacancies = new Map();
      let freq = 0;
      for (var i = 1; i < categories.length; i++) {
        if (categories[i] == categories[i - 1]) {
          freq++;
          Í;
        } else {
          NumberOfVacancies.set(categories[i - 1], freq + 1);
          freq = 0;
        }
      }
      // console.log(NumberOfVacancies);
      return NumberOfVacancies;
    },
    filteredJobs: function () {
      if (this.search.replace(/\s+/g, " ").trim().length > 0) {
        return this.jobs.filter((job) => {
          return (
            job.first_name.toLowerCase().match(this.search.toLowerCase()) ||
            job.last_name.toLowerCase().match(this.search.toLowerCase())
          );
        });
      } else if (this.checkboxes.length > 0) {
        return this.jobs.filter((job) => {
          return Object.values(this.checkboxes).some(
            (box) =>
              box.toLowerCase() === job.first_name.toLowerCase() ||
              box.toLowerCase() === job.last_name.toLowerCase()
          );
        });
      } else {
        return this.jobs;
      }
    },
  },
});

app.mount("#app");
