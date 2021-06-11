<template>
  <div class="pl-1 pr-1">
    <header class="dtc-page-header dtc-page-header-grid grid text-white relative">
      <div>掛號作業</div>
      <div></div>
      <Button label="進行查詢" icon="pi pi-search" class="p-button-small" style="margin: 4px" />
      <Button label="清除查詢" class="p-button-warning p-button-small" style="margin: 4px" icon="pi pi-undo" />
    </header>
    <main class="grid gap-2 grid-cols-2" style="grid-template-rows: 40px">
      <DtxInputGroup prepend="掛號日期">
        <Calendar @date-select="getOptDepartment" class="h-10 w-full" v-model="regTime" placeholder="請輸入日期" :showIcon="true" dateFormat="yy-mm-dd" />
      </DtxInputGroup>
      <DtxInputGroup prepend="看診科別">
        <el-select filterable v-model="dept" clearable placeholder="請選擇" class="border-l-0" @change="getOptSpecialty">
          <el-option v-for="item in deptt" :key="item.departmentId" :label="item.departmentName" :value="item.departmentId"> </el-option>
        </el-select>
      </DtxInputGroup>
      <DtxInputGroup prepend="項次科別">
        <el-select v-model="specialty" clearable placeholder="請選擇" class="border-l-0" @change="getOptShift">
          <el-option v-for="item in specialtyy" :key="item.specialtyId" :label="item.specialtyName" :value="item.specialtyId"> </el-option>
        </el-select>
      </DtxInputGroup>
      <DtxInputGroup prepend="看診醫師">
        <el-select clearable filterable v-model="shift" placeholder="請選擇" class="border-l-0">
          <el-option v-for="item in doctors" :key="item.doctorId" :label="item.doctorName" :value="item.doctorId"> </el-option>
        </el-select>
      </DtxInputGroup>
      <DtxInputGroup prepend="看診時段">
        <el-select clearable filterable v-model="sect" placeholder="請選擇" class="border-l-0">
          <el-option v-for="item in sections" :key="item.opdtimeId" :label="item.opdtimeName" :value="item.opdtimeId"> </el-option>
        </el-select>
      </DtxInputGroup>
      <DtxInputGroup prepend="調閱病歷">
        <el-input placeholder="搜尋身份證字號" v-model="input1" readonly class="bg-gray-300" />
      </DtxInputGroup>
    </main>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
import dayjs from "dayjs";
import { opdRegister$ } from "/@/store";
import { exhaustMap, throttle } from "rxjs/operators";

let subscribe1 = "";
export default {
  name: "regsiter",
  components: {},
  inject: ["actions", "global"],
  data() {
    return {
      dept: "",
      deptt: [],
      specialty: "",
      specialtyy: [],
      shift: "",
      shiftt: [],
      sect: "",
      regTime: dayjs().format("YYYY-MM-DD"),
    };
  },
  computed: {
    doctors() {
      if (!this.shiftt?.length) return [];
      if (this.sect) {
        return this.shiftt.filter((s) => s.opdtimeId === this.sect);
      }
      return this.shiftt.reduce((acc, cur) => {
        return !acc.find((s) => s.doctorId == cur.doctorId) ? acc.concat(cur) : acc;
      }, []);
    },
    sections() {
      if (!this.shiftt?.length) return [];
      if (this.shift) {
        return this.shiftt.filter((s) => s.doctorId == this.shift);
      }
      return this.shiftt.reduce((acc, cur) => {
        return !acc.find((s) => s.opdtimeName === cur.opdtimeName) ? acc.concat(cur) : acc;
      }, []);
    },
  },
  methods: {
    async registerPerson(item) {
      if (!this.regTime || !this.shift || !item?.patientId) return;
      const patientId = item.patientId;
      const opdDate = dayjs(this.regTime).format("YYYY-MM-DD") + this.global.zeros;
      const doctorId = this.shift;
      const shiftId = this.shiftt.find((s) => s.doctorId == doctorId && s.specialtyId == this.specialty)?.shiftId;
      const obj = { patientId, opdDate, shiftId };
      alert(JSON.stringify(obj, null, 2));
      try {
        await this.actions.addOpdRegistration(obj);
        ElMessage.success("掛號作業成功");
      } catch (e) {
        ElMessage.error("掛號作業 Fail");
      }
    },
    async getOptShift() {
      // when 項次科別 change.
      this.cleanAll(["dept", "deptt", "specialtyy", "specialty", "regTime"]);
      try {
        const time = dayjs(this.regTime).format("YYYY-MM-DD") + this.global.zeros;
        const { entry } = await this.actions.getOptShift(time, this.specialty);
        this.shiftt = entry;
      } catch (e) {
        alert(e);
      }
    },
    async getOptSpecialty() {
      // when 看診科別 change.
      this.cleanAll(["dept", "deptt", "regTime"]);
      try {
        const time = dayjs(this.regTime).format("YYYY-MM-DD") + this.global.zeros;
        const { entry } = await this.actions.getOptSpecialty(time, this.dept);
        this.specialtyy = entry;
      } catch (e) {
        alert(e);
      }
    },
    async getOptDepartment() {
      // when 掛號日期 change.
      if (!this.regTime) return;
      this.cleanAll(["regTime"]);
      try {
        const time = dayjs(this.regTime).format("YYYY-MM-DD") + this.global.zeros;
        const { entry } = await this.actions.getOptDepartmentByDate(time);
        this.deptt = entry;
      } catch (e) {
        alert("getOptDepartmentByDate: " + e);
      }
    },
    cleanAll(skips) {
      Object.keys(this.$data).forEach((s) => {
        if (!skips.find((key) => key === s)) this.$data[s] = "";
      });
    },
  },
  beforeUnmount() {
    subscribe1.unsubscribe();
  },
  async mounted() {
    this.getOptDepartment();
    subscribe1 = opdRegister$.pipe(throttle(2000), exhaustMap(this.registerPerson)).subscribe();
  },
  watch: {
    sect(v) {
      if (!v) this.shift = "";
    },
    shift(v) {
      if (!v) this.sect = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.dtc-template-columns {
  grid-template-columns: 180px repeat(2, 160px) 1fr;
}

.dtc-page-header-grid {
  grid-template-columns: max-content 1fr max-content max-content;
  overflow: hidden;
  gap: 1rem;
}
</style>
