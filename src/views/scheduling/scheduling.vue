<template>
  <div class="app-container">
    <el-button type="primary" @click="handleaddScheduling">
      {{ $t('scheduling.addScheduling') }}
    </el-button>

    <el-table :data="schedulingList" style="width: 100%;margin-top:30px;" border max-height="250">
      <el-table-column align="center" label="Espaço" fixed>
        <template slot-scope="scope">
          {{ scope.row.space.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Status" fixed>
        <template slot-scope="scope">
          {{ scope.row.status }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Professor" fixed>
        <template slot-scope="scope">
          {{ scope.row.professor.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Turma" fixed>
        <template slot-scope="scope">
          {{ scope.row.classes.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Operações" width="300" fixed>
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">
            {{ $t('scheduling.edit') }}
          </el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">
            {{ $t('scheduling.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'Editar Agendamento':'Novo Agendamento'">
      <el-form :model="scheduling" label-width="120px" label-position="left">
        <el-form-item label="Espaço">
          <el-select v-model="scheduling.space.id">
            <el-option
              v-for="spaceToShow in this.spaceList"
              :value="spaceToShow.id"
              :label="spaceToShow.name"
            >
              {{ spaceToShow.name }}
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Tipo" prop="type">
          <el-select v-model="scheduling.space.type">
            <el-option value="ROOM" label="Sala" selected>Sala</el-option>
            <el-option value="LAB" label="Lab">Laboratório</el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="scheduling.space.type == 'ROOM' || scheduling.space.type == 'Sala'" label="Numero de cadeiras">
          <el-input-number v-model="scheduling.space.numberChair" :min="1" placeholder="Quantity of chairs" />
        </el-form-item>
        <el-form-item v-if="scheduling.space.type == 'LAB' || scheduling.space.type == 'Laboratorio'" label="Numero de computadores">
          <el-input-number v-model="space.numberPc" :min="1" placeholder="Quantity of PCs" />
        </el-form-item>
        <el-form-item label="Projetor" prop="project">
          <el-select v-model="scheduling.space.project">
            <el-option value="1" label="Possui">Possui</el-option>
            <el-option value="0" label="Não Possui">Não Possui</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Quadro Inteligente" prop="smartBoard">
          <el-select v-model="scheduling.space.smartBoard">
            <el-option value="1" label="Possui">Possui</el-option>
            <el-option value="0" label="Não Possui">Não Possui</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Quadro" prop="board">
          <el-select v-model="scheduling.space.board">
            <el-option value="1" label="Possui">Possui</el-option>
            <el-option value="0" label="Não Possui">Não Possui</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Turma">
          <el-select v-model="scheduling.classes.id">
            <el-option
              v-for="classesToShow in this.classesList"
              :value="classesToShow.id"
              :label="classesToShow.name"
            >
              {{ classesToShow.name }}
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Nome do Professor">
          <el-select v-model="scheduling.scheduler.name">
            <el-option
              v-for="masterToShow in this.masterList"
              :value="masterToShow.id"
              :label="masterToShow.name"
            >
              {{ masterToShow.name }}
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Dia da Semana" prop="weekDay">
          <el-select v-model="scheduling.weekDay">
            <el-option value="1" label="Segunda">Segunda</el-option>
            <el-option value="2" label="Terça">Terça</el-option>
            <el-option value="3" label="Quarta">Quarta</el-option>
            <el-option value="4" label="Quinta">Quinta</el-option>
            <el-option value="5" label="Sexta">Sexta</el-option>
            <el-option value="6" label="Sabado">Sabado</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Data do Agendamento">
          <el-date-picker
            v-model="scheduling.filterdate"
            align="center"
            type="daterange"
            start-placeholder="Data inicial"
            end-placeholder="Data final"
            :picker-date="pickerOptions"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item label="Horário">
          <el-time-select
            v-model="scheduling.initialtime"
            :picker-options="{
              start: '08:00',
              step: '00:30',
              end: '22:30',
              maxTime: scheduling.endtime
            }"
            placeholder="Hora Inicial"
          />
          <el-time-select
            v-model="scheduling.endtime"
            arrow-control
            :picker-options="{
              start: '08:00',
              step: '00:30',
              end: '22:30',
              minTime: scheduling.initialtime
            }"
            placeholder="Hora Final"
          />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">
          {{ $t('scheduling.cancel') }}
        </el-button>
        <el-button type="primary" @click="confirmRole">
          {{ $t('scheduling.confirm') }}
        </el-button>
      </div>
    </el-dialog>

    <!--<el-dialog :visible.sync="dialogAddLack" :title="'Add Lack'">-->
    <!--<el-form :model="lack" label-width="120px" label-position="left">-->
    <!--<el-form-item label="Name">-->
    <!--<el-input v-model="scheduling.name" disabled="true"/>-->
    <!--</el-form-item>-->
    <!--<el-form-item label="Status">-->
    <!--<el-select v-model="scheduling.status" disabled="true">-->
    <!--<el-option value="1" label="Ativo">Ativo</el-option>-->
    <!--<el-option value="0" label="Inativo">Inativo</el-option>-->
    <!--</el-select>-->
    <!--</el-form-item>-->
    <!--<el-form-item label="Course Name">-->
    <!--<el-input v-model="scheduling.course.name" disabled="true"/>-->
    <!--</el-form-item>-->
    <!--<el-form-item label="Master Name">-->
    <!--<el-input v-model="scheduling.master.name" disabled="true"/>-->
    <!--</el-form-item>-->
    <!--<el-form-item label="Lack">-->
    <!--<el-date-picker v-model="lack.date" type="date" format="dd-MM-yyyy" value-format="yyyy-MM-dd">-->
    <!--</el-date-picker>-->
    <!--</el-form-item>-->
    <!--</el-form>-->
    <!--<div style="text-align:right;">-->
    <!--<el-button type="danger" @click="dialogAddLack=false">-->
    <!--{{ $t('scheduling.cancel') }}-->
    <!--</el-button>-->
    <!--<el-button type="primary" @click="confirmLack">-->
    <!--{{ $t('scheduling.confirm') }}-->
    <!--</el-button>-->
    <!--</div>-->
    <!--</el-dialog>-->

    <!--<el-dialog :visible.sync="dialogStudent" :title="'Students'">-->
    <!--<el-form :model="scheduling" label-width="80px" label-position="left">-->
    <!--<el-table :data="studentsSchedulingList" style="width: 100%;margin-top:30px;" border>-->
    <!--<el-table-column align="center" label="Space Name" width="220">-->
    <!--<template slot-scope="studentsSchedulingList">-->
    <!--{{ studentsSchedulingListScope.row.name }}-->
    <!--</template>-->
    <!--</el-table-column>-->
    <!--<el-table-column align="center" :data="studentsSchedulingList" label="Operations">-->
    <!--<template slot-scope="studentsSchedulingList">-->
    <!--<el-button type="danger" size="small" @click="handleDeleteStudents(studentsSchedulingList)">-->
    <!--{{ $t('space.delete') }}-->
    <!--</el-button>-->
    <!--</template>-->
    <!--</el-table-column>-->
    <!--</el-table>-->

    <!--<el-table :data="studentsList" style="width: 100%;margin-top:30px;" border>-->
    <!--<el-table-column align="center" label="Space Name" width="220">-->
    <!--<template slot-scope="studentsListScope">-->
    <!--{{ studentsListScope.row.name }}-->
    <!--</template>-->
    <!--</el-table-column>-->
    <!--<el-table-column align="center" :data="studentsList" label="Operations">-->
    <!--<template slot-scope="studentsListScope">-->
    <!--<el-button type="submit" size="small"-->
    <!--@click="handleAddStudentScheduling(studentsListScope)">-->
    <!--{{ $t('software.addSoftware') }}-->
    <!--</el-button>-->
    <!--</template>-->
    <!--</el-table-column>-->
    <!--</el-table>-->

    <!--</el-form>-->
    <!--<div style="text-align:right; margin-top: 10px">-->
    <!--<el-button type="danger" @click="dialogStudent=false">-->
    <!--{{ $t('space.dismiss') }}-->
    <!--</el-button>-->
    <!--</div>-->
    <!--</el-dialog>-->
  </div>
</template>

<script>
import { deepClone } from '@/utils'
import { getScheduling, addScheduling, deleteScheduling, updateScheduling } from '@/api/scheduling'
import { getCourse } from '@/api/course'
import { getSpaceEnable } from '@/api/space'
import { getClassEnable } from '@/api/classes'
import { getMasterUsers } from '@/api/user'

const defaultScheduling = {
  id: '',
  status: '',
  weekDay: '',
  classes: {
    id: '',
    name: ''
  },
  space: {
    id: '',
    name: ''
  },
  professor: {
    id: '',
    name: ''
  },
  it_responsable: {
    id: '',
    name: ''
  },
  scheduler: {
    id: '',
    name: ''
  },
  initialtime: '',
  endtime: '',
  filterdate: []
}

export default {
  data() {
    return {
      scheduling: Object.assign({}, defaultScheduling),
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now()
        }
      },
      dialogVisible: false,
      dialogAddLack: false,
      dialogStudent: false,
      dialogType: 'new',
      checkStrictly: false,
      schedulingList: [],
      masterList: [],
      spaceList: [],
      classesList: []
    }
  },
  computed: {
    routesData() {
      return this.routes
    }
  },
  created() {
    // Mock: get all routes and roles list from server
    this.getScheduling()
    this.getSpaceEnable()
    this.getMasterUsers()
  },
  methods: {
    async getScheduling() {
      const res = await getScheduling()
      this.schedulingList = res.data
    },
    async getMaster() {
      const res = await getMasterUsers()
      this.masterList = res.data
    },
    async handleaddScheduling() {
      this.scheduling = Object.assign({}, defaultScheduling)
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedNodes([])
      }
      const space = await getSpaceEnable()
      this.spaceList = space.data
      const classes = await getClassEnable()
      this.spaceList = classes.data
      this.dialogType = 'new'
      this.dialogVisible = true
    },
    async handleAddStudent() {
      this.scheduling = deepClone(scope.row)
      const students = await getStudents()
      this.studentsList = students.data
      const studentsScheduling = await getStudentScheduling(this.scheduling.id)
      this.studentsSchedulingList = studentsScheduling.data
      this.dialogVisible = true
    },
    handleEdit(scope) {
      this.dialogType = 'edit'
      this.dialogVisible = true
      this.checkStrictly = true
      this.scheduling = deepClone(scope.row)
    },
    handleAddLack(scope) {
      this.dialogAddLack = true
      this.checkStrictly = true
      this.lack = Object.assign({}, defaultLack)
      this.scheduling = deepClone(scope.row)
    },
    handleDelete({ $index, row }) {
      this.$confirm('Deseja remover o agendamento?', 'Warning', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      })
        .then(async() => {
          await deleteScheduling(row.id)
          this.schedulingList.splice($index, 1)
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
          await deleteStudentScheduling(row.id, this.scheduling.id)
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
        await updateScheduling(this.scheduling.id, this.scheduling)
        for (let index = 0; index < this.schedulingList.length; index++) {
          if (this.schedulingList[index].id === this.scheduling.id) {
            this.schedulingList.splice(index, 1, Object.assign({}, this.scheduling))
            break
          }
        }
      } else {
        const { data } = await addScheduling(this.scheduling)
        this.scheduling.id = data.key
        this.schedulingList.push(this.scheduling)
      }

      const { name } = this.scheduling
      this.dialogVisible = false
      this.$notify({
        title: 'Success',
        dangerouslyUseHTMLString: true,
        message: `
            <div>Scheduling: ${name}</div>
          `,
        type: 'success'
      })
    },
    async confirmLack() {
      this.lack.scheduling.id = this.scheduling.id
      this.lack.master.id = this.scheduling.master.id
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
