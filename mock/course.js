import Mock from 'mockjs'

const accessCourse = [
  {
    id: 1,
    code: 'SI-012',
    name: 'Projeto Final',
    status: 'ativo',
    credit: 15
  },
  {
    id: 2,
    code: 'SI-0123',
    name: 'Projeto Final 2',
    status: 'ativo',
    credit: 15
  }
]

export default [
  {
    url: '/course',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: accessCourse
      }
    }
  },
  {
    url: '/course',
    type: 'post',
    response: {
      code: 20000,
      data: {
        key: Mock.mock('@integer(300, 5000)')
      }
    }
  },
  {
    url: '/course/[A-Za-z0-9]',
    type: 'put',
    response: {
      code: 20000,
      data: {
        status: 'success'
      }
    }
  },
  {
    url: '/course/[A-Za-z0-9]',
    type: 'delete',
    response: {
      code: 20000,
      data: {
        status: 'success'
      }
    }
  },
  {
    url: '/course/space/[A-Za-z0-9]',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: accessCourse
      }
    }
  }

]
