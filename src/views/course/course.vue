<template>
  <div class="app-container">
    <el-button type="primary" @click="handleaddCourse">
      {{ $t('course.addCourse') }}
    </el-button>

    <el-table :data="courseList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="Course Name" width="220">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="Code">
        <template slot-scope="scope">
          {{ scope.row.code }}
        </template>
      </el-table-column>
        <el-table-column align="header-center" label="Status">
            <template slot-scope="scope">
                {{ scope.row.status }}
            </template>
        </el-table-column>
      <el-table-column align="header-center" label="Program">
        <template slot-scope="scope">
          {{ scope.row.program.name }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="Credit">
        <template slot-scope="scope">
          {{ scope.row.credit }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Operations">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">
            {{ $t('course.edit') }}
          </el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">
            {{ $t('course.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'Edit Course':'New Course'">
      <el-form :model="course" label-width="80px" label-position="left">
        <el-form-item label="Name">
          <el-input v-model="course.name" placeholder="Course Name" required />
        </el-form-item>
        <el-form-item label="Credit">
          <el-input v-model="course.credit" placeholder="Course Credit" required />
        </el-form-item>
          <el-form-item label="Code">
              <el-input v-model="course.code" placeholder="Course Code" required />
          </el-form-item>
          <el-form-item label="Program">
              <el-select v-model="course.program.id" required>
                  <el-option
                          v-for="item in programList"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id"
                  />
              </el-select>
          </el-form-item>
          <el-form-item label="Status">
              <el-select v-model="course.status" required>
                  <el-option value="1" label="Ativo">Ativo</el-option>
                  <el-option value="0" label="Inativo">Inativo</el-option>
              </el-select>
          </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">
          {{ $t('course.cancel') }}
        </el-button>
        <el-button type="primary" @click="confirmRole">
          {{ $t('course.confirm') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { deepClone } from '@/utils'
import { getCourse, addCourse, deleteCourse, updateCourse } from '@/api/course'
import { enableProgram } from '@/api/program'

const defaultCourse = {
  id: '',
  name: '',
  code: '',
  credit: '',
  status: '',
  program: {
    id: '',
    name: ''
  }
}

const defaultProgram = {
  id: '',
  name: '',
  code: ''
}

const status = {
    1: 'Ativo',
    0: 'Inativo'
}

export default {
  data() {
    return {
      course: Object.assign({}, defaultCourse),
      program: Object.assign({}, defaultProgram),
      dialogVisible: false,
      dialogType: 'new',
      checkStrictly: false,
      courseList: [],
      programList: [],
      statusList: Object.assign({}, status)
    }
  },
  computed: {
    routesData() {
      return this.routes
    }
  },
  created() {
    // Mock: get all routes and roles list from server
    this.getProgram()
    this.getCourse()
  },
  methods: {
    async getCourse() {
      const res = await getCourse()
      this.courseList = this.changeType(res.data)
    },
    async getProgram() {
      const res = await enableProgram()
      this.programList = res.data
    },
    handleaddCourse() {
      this.course = Object.assign({}, defaultCourse)
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
      this.course = deepClone(scope.row)
    },
    handleDelete({ $index, row }) {
      this.$confirm('Confirm to remove the course?', 'Warning', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      })
        .then(async() => {
          await deleteCourse(row.id)
          this.courseList.splice($index, 1)
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

        for (let index = 0; index < this.programList.length; index++) {
          if (this.course.program.id == this.programList[index].id) {
              this.course.program.name = this.programList[index].name
              break
          }
        }
      if (isEdit) {
        await updateCourse(this.course.id, this.course)
        for (let index = 0; index < this.courseList.length; index++) {
          if (this.courseList[index].id === this.course.id) {
            this.courseList.splice(index, 1, Object.assign({}, this.changeType(this.course)))
            break
          }
        }
      } else {
        const { data } = await addCourse(this.course)
        this.course.id = data.key
        this.courseList.push(this.changeType(this.course))
      }

      const { name } = this.course
      this.dialogVisible = false
      this.$notify({
        title: 'Success',
        dangerouslyUseHTMLString: true,
        message: `
            <div>Course: ${name}</div>
          `,
        type: 'success'
      })
    },
      changeType(courses) {
          if (Array.isArray(courses)) {
              for (let index = 0; index < courses.length; index++) {
                  courses[index].status = this.statusList[courses[index].status]
              }
              return courses
          }
          courses.status = this.statusList[courses.status]
          return courses
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
