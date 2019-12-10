<template>
    <div class="app-container">
        <!--<el-button type="primary" v-if="checkSchedulings.includes(token)" @click="handleaddScheduling">-->
            <!--{{ $t('scheduling.checkSchedulings') }}-->
        <!--</el-button>-->

        <!--<el-button type="primary" v-if="checkITSchedulings.includes(token)" @click="handleaddScheduling">-->
            <!--{{ $t('scheduling.checkITSchedulings') }}-->
        <!--</el-button>-->


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
                    <el-button type="primary" size="small" v-if="checkSchedulings.includes(token)" @click="handleEditAuthorizer(scope)">
                        {{ $t('scheduling.checkSchedulings') }}
                    </el-button>
                    <el-button type="danger" size="small" v-if="checkITSchedulings.includes(token)" @click="handleEditIT(scope)">
                        {{ $t('scheduling.checkITSchedulings') }}
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog :visible.sync="dialogAuthorizer" :title="'Agendamentos Pendentes'">
            <el-form :model="scheduling" label-width="120px" label-position="left">
                <el-form-item label="Espaço">
                    <el-select v-model="scheduling.status">
                        <el-option value="ACCEPTED" label="Aceitar">Aceitar</el-option>
                        <el-option value="DENIED" label="Negar">Negar</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="Motivo" v-if="scheduling.status == 'DENIED'">
                    <el-input type="textarea" :rows="2" placeholder="Insira o motivo" v-model="textarea">
                    </el-input>
                </el-form-item>
            </el-form>
            <div style="text-align:right;">
                <el-button type="danger" @click="dialogAuthorizer=false">
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
    import { getToken } from '@/utils/auth' // get token from cookie

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
            name: '',
        },
        space_item: {
            type: '',
            numberPc: '',
            numberChair: '',
            project: '',
            smartBoard: '',
            board: ''
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
                dialogAuthorizer: false,
                dialogAddLack: false,
                dialogStudent: false,
                dialogType: 'new',
                checkStrictly: false,
                schedulingList: [],
                masterList: [],
                spaceList: [],
                classesList: [],
                token: '',
                checkSchedulings: ['ADMINISTRATOR', 'ASSISTANT', 'MANAGER', 'admin'],
                checkITSchedulings: ['IT_SUPPORT', 'admin']
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
            const token_ = getToken()
            this.token = token_.split('-')[0]
            this.id = token_.split('-')[1]

        },
        methods: {
            async getScheduling() {
                const res = await getScheduling()
                this.schedulingList = res.data
            },
            async getMasterUsers() {
                const res = await getMasterUsers()
                this.masterList = res.data
            },
            async getSpaceEnable() {
                const res = await getSpaceEnable()
                this.spaceList = res.data
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
                this.dialogAuthorizer = true
            },
            async handleAddStudent() {
                this.scheduling = deepClone(scope.row)
                const students = await getStudents()
                this.studentsList = students.data
                const studentsScheduling = await getStudentScheduling(this.scheduling.id)
                this.studentsSchedulingList = studentsScheduling.data
                this.dialogAuthorizer = true
            },
            handleEditAuthorizer(scope) {
                this.dialogType = 'edit'
                this.dialogAuthorizer = true
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
                this.dialogAuthorizer = false
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
