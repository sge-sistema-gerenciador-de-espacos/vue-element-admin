<template>
    <div class="app-container">
        <el-button type="primary" @click="handleaddScheduling">
            {{ $t('scheduling.addScheduling') }}
        </el-button>

        <el-table :data="schedulingList" style="width: 100%;margin-top:30px;" border>
            <el-table-column align="center" label="Scheduling Name" width="220">
                <template slot-scope="scope">
                    {{ scope.row.space.name }}
                </template>
            </el-table-column>
            <el-table-column align="header-center" label="Status">
                <template slot-scope="scope">
                    {{ scope.row.status }}
                </template>
            </el-table-column>
            <el-table-column align="header-center" label="Scheduler Name">
                <template slot-scope="scope">
                    {{ scope.row.scheduler.name}}
                </template>
            </el-table-column>
            <el-table-column align="header-center" label="IT Responsable">
                <template slot-scope="scope">
                    {{ scope.row.it_responsable.name }}
                </template>
            </el-table-column>
            <el-table-column align="header-center" label="Professor">
                <template slot-scope="scope">
                    {{ scope.row.class.name }}
                </template>
            </el-table-column>
            <el-table-column align="center" label="Operations" width="400">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" @click="handleAddLack(scope)">
                        {{ $t('scheduling.addLack') }}
                    </el-button>
                    <el-button type="primary" size="small" @click="handleAddStudent(scope)">
                        {{ $t('scheduling.addStudent') }}
                    </el-button>
                    <el-button type="primary" size="small" @click="handleEdit(scope)">
                        {{ $t('scheduling.edit') }}
                    </el-button>
                    <el-button type="danger" size="small" @click="handleDelete(scope)">
                        {{ $t('scheduling.delete') }}
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'Edit Scheduling':'New Scheduling'">
            <el-form :model="scheduling" label-width="120px" label-position="left">
                <el-form-item label="Name">
                    <el-input v-model="scheduling.name" placeholder="Scheduling Name"/>
                </el-form-item>
                <el-form-item label="Status">
                    <el-select v-model="scheduling.status">
                        <el-option value="1" label="Ativo">Ativo</el-option>
                        <el-option value="0" label="Inativo">Inativo</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="Course Name">
                    <el-select v-model="scheduling.course.id">
                        <el-option v-for="courseToShow in this.courseList" :value="courseToShow.id"
                                   :label="courseToShow.name">
                            {{courseToShow.name}}
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="Master Name">
                    <el-select v-model="scheduling.master.name">
                        <el-option v-for="masterToShow in this.masterList" :value="masterToShow.id"
                                   :label="masterToShow.name">
                            {{masterToShow.name}}
                        </el-option>
                    </el-select>
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


        <el-dialog :visible.sync="dialogAddLack" :title="'Add Lack'">
            <el-form :model="lack" label-width="120px" label-position="left">
                <el-form-item label="Name">
                    <el-input v-model="scheduling.name" disabled="true"/>
                </el-form-item>
                <el-form-item label="Status">
                    <el-select v-model="scheduling.status" disabled="true">
                        <el-option value="1" label="Ativo">Ativo</el-option>
                        <el-option value="0" label="Inativo">Inativo</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="Course Name">
                    <el-input v-model="scheduling.course.name" disabled="true"/>
                </el-form-item>
                <el-form-item label="Master Name">
                    <el-input v-model="scheduling.master.name" disabled="true"/>
                </el-form-item>
                <el-form-item label="Lack">
                    <el-date-picker v-model="lack.date" type="date" format="dd-MM-yyyy" value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <div style="text-align:right;">
                <el-button type="danger" @click="dialogAddLack=false">
                    {{ $t('scheduling.cancel') }}
                </el-button>
                <el-button type="primary" @click="confirmLack">
                    {{ $t('scheduling.confirm') }}
                </el-button>
            </div>
        </el-dialog>

        <el-dialog :visible.sync="dialogStudent" :title="'Students'">
            <el-form :model="scheduling" label-width="80px" label-position="left">
                <el-table :data="studentsSchedulingList" style="width: 100%;margin-top:30px;" border>
                    <el-table-column align="center" label="Space Name" width="220">
                        <template slot-scope="studentsSchedulingList">
                            {{ studentsSchedulingListScope.row.name }}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" :data="studentsSchedulingList" label="Operations">
                        <template slot-scope="studentsSchedulingList">
                            <el-button type="danger" size="small" @click="handleDeleteStudents(studentsSchedulingList)">
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
                            <el-button type="submit" size="small"
                                       @click="handleAddStudentScheduling(studentsListScope)">
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
    import {deepClone} from '@/utils'
    import {getScheduling, addScheduling, deleteScheduling, updateScheduling, addLack} from '@/api/scheduling'
    import {getCourse} from '@/api/course'
    import {getMasterUsers} from '@/api/user'

    const defaultScheduling = {
        id: '',
        status: '',
        name: '',
        classes: {
            id: '',
            name: ''
        },
        space:
            {
                id: '',
                name: '',
            },
        it_responsable: {
            id: '',
            name: '',
        },
        scheduler: {
            id: '',
            name: '',
        },
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
        scheduling: {
            id: ''
        }
    }


    export default {
        data() {
            return {
                scheduling: Object.assign({}, defaultScheduling),
                courses: Object.assign({}, defaultCourse),
                masters: Object.assign({}, defaultMaster),
                lack: Object.assign({}, defaultLack),
                students: Object.assign({}, defaultStudent),
                dialogVisible: false,
                dialogAddLack: false,
                dialogStudent: false,
                dialogType: 'new',
                checkStrictly: false,
                schedulingList: [],
                courseList: [],
                masterList: [],
                studentsList: [],
                studentsSchedulingList: []
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
            this.getMaster()
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
            handleDelete({$index, row}) {
                this.$confirm('Confirm to remove the scheduling?', 'Warning', {
                    confirmButtonText: 'Confirm',
                    cancelButtonText: 'Cancel',
                    type: 'warning'
                })
                    .then(async () => {
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
            handleDeleteStudents({$index, row}) {
                this.$confirm('Confirm to remove the student of the class?', 'Warning', {
                    confirmButtonText: 'Confirm',
                    cancelButtonText: 'Cancel',
                    type: 'warning'
                })
                    .then(async () => {
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
                    const {data} = await addScheduling(this.scheduling)
                    this.scheduling.id = data.id
                    this.schedulingList.push(this.scheduling)
                }

                const {name} = this.scheduling
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
