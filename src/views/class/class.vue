<template>
  <div class="app-container">
    <el-button type="primary" @click="handleaddClass">
      {{ $t('classes.addClass') }}
    </el-button>

    <el-table :data="classesList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="Class Name" width="220">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="Status">
        <template slot-scope="scope">
          {{ scope.row.status }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="Course Name">
        <template slot-scope="scope">
            {{ scope.row.course.name}}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="Professor">
        <template slot-scope="scope">
          {{ scope.row.master.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Operations" width="400">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleAddLack(scope)">
            {{ $t('classes.addLack') }}
          </el-button>
            <el-button type="primary" size="small" @click="handleEdit(scope)">
                {{ $t('classes.addStudent') }}
            </el-button>
            <el-button type="primary" size="small" @click="handleEdit(scope)">
                {{ $t('classes.edit') }}
            </el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">
            {{ $t('classes.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'Edit Class':'New Class'">
      <el-form :model="classes" label-width="120px" label-position="left">
        <el-form-item label="Name">
          <el-input v-model="classes.name" placeholder="Class Name" />
        </el-form-item>
        <el-form-item label="Status">
          <el-select v-model="classes.status">
            <el-option value="1" label="Ativo">Ativo</el-option>
            <el-option value="0" label="Inativo">Inativo</el-option>
          </el-select>
        </el-form-item>
          <el-form-item label="Course Name">
              <el-select v-model="classes.course.name">
                  <el-option v-for="courseToShow in this.courseList" :value="courseToShow.id" :label="courseToShow.name">
                      {{courseToShow.name}}
                  </el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="Master Name">
              <el-select v-model="classes.master.name">
                  <el-option v-for="masterToShow in this.masterList" :value="masterToShow.id" :label="masterToShow.name">
                      {{masterToShow.name}}
                  </el-option>
              </el-select>
          </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">
          {{ $t('classes.cancel') }}
        </el-button>
        <el-button type="primary" @click="confirmRole">
          {{ $t('classes.confirm') }}
        </el-button>
      </div>
    </el-dialog>




      <el-dialog :visible.sync="dialogAddLack" :title="'Add Lack'">
          <el-form :model="classes" label-width="120px" label-position="left">
              <el-form-item label="Name">
                  <el-input v-model="classes.name" placeholder="Class Name" />
              </el-form-item>
              <el-form-item label="Status">
                  <el-select v-model="classes.status">
                      <el-option value="1" label="Ativo">Ativo</el-option>
                      <el-option value="0" label="Inativo">Inativo</el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="Course Name">
                  <el-select v-model="classes.course.name">
                      <el-option v-for="courseToShow in this.courseList" :value="courseToShow.id" :label="courseToShow.name">
                          {{courseToShow.name}}
                      </el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="Master Name">
                  <el-select v-model="lackes.master.id">
                      <el-option v-for="masterToShow in this.masterList" :value="masterToShow.id" :label="masterToShow.name">
                          {{masterToShow.name}}
                      </el-option>
                  </el-select>
              </el-form-item>
              <el-date-picker v-model="lackes.date" type="date">
              </el-date-picker>
          </el-form>
          <div style="text-align:right;">
              <el-button type="danger" @click="dialogVisible=false">
                  {{ $t('classes.cancel') }}
              </el-button>
              <el-button type="primary" @click="confirmRole">
                  {{ $t('classes.confirm') }}
              </el-button>
          </div>
      </el-dialog>
  </div>
</template>

<script>
import { deepClone } from '@/utils'
import { getClass, addClass, deleteClass, updateClass } from '@/api/classes'
import { getCourse } from '@/api/course'
import { getMasterUsers } from '@/api/user'

const defaultClass = {
    id: '',
    status: '',
    name: '',
    course: {
        name: ''
    },
    master:
        {
            id: '',
            name: '',
        }
}

const defaultCourse = {
    id: '',
    name: ''
}

const defaultMaster = {
    id: '',
    name: ''
}

const defaultLack = {
    master: {
        id: ''
    },
    date: ''
}


export default {
  data() {
    return {
      classes: Object.assign({}, defaultClass),
      courses: Object.assign({}, defaultCourse),
      masters: Object.assign({}, defaultMaster),
      lackes: Object.assign({}, defaultLack),
      dialogVisible: false,
      dialogAddLack: false,
      dialogType: 'new',
      checkStrictly: false,
      classesList: [],
      courseList: [],
      masterList: []
    }
  },
  computed: {
    routesData() {
      return this.routes
    }
  },
  created() {
    // Mock: get all routes and roles list from server
    this.getClass()
  },
  methods: {
    async getClass() {
      const res = await getClass()
      this.classesList = res.data
    },
    async handleaddClass() {
      this.classes = Object.assign({}, defaultClass)
      const courses = await getCourse()
      this.courseList = courses.data
      const master = await getMasterUsers()
      this.masterList = master.data
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedNodes([])
      }
      this.dialogType = 'new'
      this.dialogVisible = true
    },
    handleEdit(scope) {
      this.dialogType = 'edit'
      this.dialogVisible = true
      this.checkStrictly = true
      this.classes = deepClone(scope.row)
    },
      handleAddLack(scope) {
          this.dialogAddLack = true
          this.checkStrictly = true
          this.classes = deepClone(scope.row)
      },
    handleDelete({ $index, row }) {
      this.$confirm('Confirm to remove the classes?', 'Warning', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      })
        .then(async() => {
          await deleteClass(row.id)
          this.classesList.splice($index, 1)
          this.$message({
            type: 'success',
            message: 'Delete succed!'
          })
        })
        .catch(err => {
          console.error(err)
        })
    },
    async confirmRole() {
      const isEdit = this.dialogType === 'edit'

      if (isEdit) {
        await updateClass(this.classes.id, this.classes)
        for (let index = 0; index < this.classesList.length; index++) {
          if (this.classesList[index].id === this.classes.id) {
            this.classesList.splice(index, 1, Object.assign({}, this.classes))
            break
          }
        }
      } else {
        const { data } = await addClass(this.classes)
        this.classes.id = data.id
        this.classesList.push(this.classes)
      }

      const { name } = this.classes
      this.dialogVisible = false
      this.$notify({
        title: 'Success',
        dangerouslyUseHTMLString: true,
        message: `
            <div>Class: ${name}</div>
          `,
        type: 'success'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
    .app-container {
        .roles-table {
            margin-top: 30px;
        }
        .permission-tree {
            margin-bottom: 30px;
        }
    }
</style>
