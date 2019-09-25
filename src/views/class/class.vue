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
            <el-button type="primary" size="small" @click="handleAddStudent(scope)">
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
              <el-select v-model="classes.course.id">
                  <el-option
                          v-for="courseToShow in this.courseList"
                          :key="courseToShow.id"
                          :label="courseToShow.name"
                          :value="courseToShow.id"
                  />
              </el-select>
          </el-form-item>
          <el-form-item label="Master Name">
              <el-select v-model="classes.master.id">
                  <el-option
                          v-for="masterToShow in this.masterList"
                          :key="masterToShow.id"
                          :label="masterToShow.name"
                          :value="masterToShow.id"
                  />
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
          <el-form :model="lack" label-width="120px" label-position="left">
              <el-form-item label="Master Name">
                  <el-input v-model="classes.master.name" disabled="true"/>
              </el-form-item>
              <el-form-item label="Lack">
                  <el-date-picker v-model="lack.date" type="date" format="dd-MM-yyyy" value-format="yyyy-MM-dd">
                  </el-date-picker>
              </el-form-item>
          </el-form>
          <div style="text-align:right;">
              <el-button type="danger" @click="dialogAddLack=false">
                  {{ $t('classes.cancel') }}
              </el-button>
              <el-button type="primary" @click="confirmLack">
                  {{ $t('classes.confirm') }}
              </el-button>
          </div>
      </el-dialog>

      <el-dialog :visible.sync="dialogStudent" :title="'Students'">
          <el-form :model="classes" label-width="80px" label-position="left">
              <el-table :data="studentsClassList" style="width: 100%;margin-top:30px;" border>
                  <el-table-column align="center" label="Space Name" width="220">
                      <template slot-scope="studentsClassList">
                          {{ studentsClassListScope.row.name }}
                      </template>
                  </el-table-column>
                  <el-table-column align="center" :data="studentsClassList" label="Operations">
                      <template slot-scope="studentsClassList">
                          <el-button type="danger" size="small" @click="handleDeleteStudents(studentsClassList)">
                              {{ $t('space.delete') }}
                          </el-button>
                      </template>
                  </el-table-column>
              </el-table>

              <el-table :data="studentsList" style="width: 100%;margin-top:30px;" border>
                  <el-table-column align="center" label="Space Name" width="220">
                      <template slot-scope="studentsListScope">
                          {{ studentsListScope.row.name }}
                      </template>
                  </el-table-column>
                  <el-table-column align="center" :data="studentsList" label="Operations">
                      <template slot-scope="studentsListScope">
                          <el-button type="submit" size="small" @click="handleAddStudentClass(studentsListScope)">
                              {{ $t('software.addSoftware') }}
                          </el-button>
                      </template>
                  </el-table-column>
              </el-table>

          </el-form>
          <div style="text-align:right; margin-top: 10px">
              <el-button type="danger" @click="dialogStudent=false">
                  {{ $t('space.dismiss') }}
              </el-button>
          </div>
      </el-dialog>
  </div>
</template>

<script>
import { deepClone } from '@/utils'
import { getClass, addClass, deleteClass, updateClass, addLack } from '@/api/classes'
import { getCourse } from '@/api/course'
import { getMasterUsers } from '@/api/user'

const defaultClass = {
    id: '',
    status: '',
    name: '',
    course: {
        id: ''
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

const defaultStudent = {
    id: '',
    name: ''
}

const defaultLack = {
    master: {
        id: ''
    },
    date: '',
    classes: {
        id: ''
    }
}


export default {
  data() {
    return {
      classes: Object.assign({}, defaultClass),
      courses: Object.assign({}, defaultCourse),
      masters: Object.assign({}, defaultMaster),
      lack: Object.assign({}, defaultLack),
      students: Object.assign({}, defaultStudent),
      dialogVisible: false,
      dialogAddLack: false,
      dialogStudent: false,
      dialogType: 'new',
      checkStrictly: false,
      classesList: [],
      courseList: [],
      masterList: [],
      studentsList: [],
      studentsClassList: []
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
    this.getMaster()
    this.getCourses()
  },
  methods: {
    async getClass() {
      const res = await getClass()
      this.classesList = res.data
    },
    async getMaster() {
       const res = await getMasterUsers()
       this.masterList = res.data
    },
    async getCourses() {
        const res = await getCourse()
        this.courseList = res.data
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
      async handleAddStudent() {
          this.classes = deepClone(scope.row)
          const students = await getStudents()
          this.studentsList = students.data
          const studentsClass = await getStudentClass(this.classes.id)
          this.studentsClassList = studentsClass.data
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
          this.lack = Object.assign({}, defaultLack)
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
      handleDeleteStudents({ $index, row }) {
          this.$confirm('Confirm to remove the student of the class?', 'Warning', {
              confirmButtonText: 'Confirm',
              cancelButtonText: 'Cancel',
              type: 'warning'
          })
              .then(async() => {
                  await deleteStudentClass(row.id, this.classes.id)
                  this.softwareList.push(row)
                  this.softwareSpaceList.splice($index, 1)
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
    },
      async confirmLack() {
        this.lack.classes.id = this.classes.id
        this.lack.master.id = this.classes.master.id
        console.log(this.lack)
        await addLack(this.lack)
          this.dialogAddLack = false
          this.$notify({
              title: 'Success',
              dangerouslyUseHTMLString: true,
              message: `
            <div>Lack added</div>
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
