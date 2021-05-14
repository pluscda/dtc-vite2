<template>
  <div>
    <div class="flex space-x-3">
      <input v-model="name" />
      <button @click="searchDb">Search</button>
      <button @click="clearSearch">ClearmSearch</button>
    </div>
    <table>
      <tr>
        <th v-for="(item, i) in headers" :key="i" @click="sort(item)">
          {{ item }}
        </th>
      </tr>
      <tr v-for="(item, i) in items" :key="'item' + i">
        <td>{{ item.name }}</td>
        <td>{{ item.position }}</td>
        <td>{{ item.office }}</td>
        <td>{{ item.startDate }}</td>
      </tr>
    </table>
    <b-pagination v-model="currentPageNum" :total-rows="rowCount" :per-page="pagingRowPerPage"> </b-pagination>
  </div>
</template>

<script>
const headers = [
  { name: "Name", key: "name", sortDesc: null },
  { name: "Position", key: "position", sortDesc: null },
  { name: "Office", key: "office", sortDesc: null },
  { name: "Start Date", key: "startDate", sortDesc: null },
];

export default {
  data() {
    return {
      headers,
      orderBy: [],
      items: [],
      currentPageNum: 1,
      rowCount: 0,
      pagingRowPerPage: 10,
      search: false,
      name: "",
      totalCountStr: "",
    };
  },
  methods: {
    sort(item) {
      if (item.sortDesc) {
        item.sortDesc = null;
      } else if (false === item.sortDesc) {
        item.sortDesc = true;
      } else if (null === item.sortDesc) {
        item.sortDesc = false;
      }
      this.orderBy = [];
      this.headers.forEach((s) => {
        if (s.sortDesc !== null) {
          this.orderBy.push(s.sortDesc ? `${s.key}:desc` : `${s.key}`);
        }
      });
      this.getData();
    },
    searchDb() {
      this.search = true;
      this.getData();
    },
    async clearSearch() {
      // should clear data here to empty;
      this.name = "";
      this.getData();
    },
    async getData() {
      this.items = [];
      let qs = "";
      qs += "&_limit=" + this.pagingRowPerPage;
      if (this.orderBy.length) {
        qs += "&_sort=" + this.orderBy.join(",");
      }
      if (this.currentPageNum > 1) {
        qs += `&_start=` + (this.currentPageNum - 1) * this.pagingRowPerPage;
      }
      //check filter now
      if (this.name) {
        qs += `&name_contains=` + this.name;
      }

      const { items, count } = await actions.getInfo(qs);
      this.items = [...items];
      this.rowCount = count;
      this.totalCountStr = `共${count} 筆`;
    },
  },
};
</script>

<style></style>
