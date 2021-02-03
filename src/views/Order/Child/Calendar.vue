<template>
  <div>
    <van-cell is-link title="基础用法" @click="show = true" :value="date" />
    <van-calendar
      v-model="show"
      :min-date="new Date('2020/01/01')"
      :max-date="maxDate"
      :default-date="defaultDate"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import { Calendar, ActionSheet, Cell, CellGroup } from "vant";
export default {
  name: "Calendar",
  data() {
    return {
      date: "",
      show: false,
      defaultDate: "",
      maxDate: "",
    };
  },
  components: {
    [Calendar.name]: Calendar,
    [ActionSheet.name]: ActionSheet,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
  },
  created() {
    this.addDate();
  },
  methods: {
    addDate() {
      var nowDate = new Date();
      let date = {
        year: nowDate.getFullYear(),
        month: nowDate.getMonth() + 1,
        date: nowDate.getDate(),
      };
      console.log(date);
      let systemDate = date.year + "/" + 0 + date.month + "/" + 0 + date.date;
      let systemmaxDate = date.year + 1 + "/" + 0 + 12 + "/" + 0 + 31;
      this.defaultDate = new Date(systemDate);
      this.maxDate = new Date(systemmaxDate);
    },
    formatDate(date) {
      return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    },
    onConfirm(date) {
      this.show = false;
      this.date = this.formatDate(date);
    },
  },
};
</script>

<style scoped lang="less">
</style>