import Mock from 'mockjs'

const accessClass = [
  {
    id: 1,
    status: 'ativo',
    name: 'Teste 1',
    course: {
      name: 'Turismo'
    },
    master:
    {
      id: 1,
      name: 'Super Admin2'
    }
  },
  {
    id: 2,
    status: 'ativo',
    name: 'teste 2',
    course: {
      name: 'SI'
    },
    master:
            {
              id: 1,
              name: 'Super Admin'
            }
  }
]

export default [
  {
    url: '/classes',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: accessClass
      }
    }
  },
  {
    url: '/classes',
    type: 'post',
    response: {
      code: 20000,
      data: {
        key: Mock.mock('@integer(300, 5000)')
      }
    }
  },
  {
    url: '/classes/[A-Za-z0-9]',
    type: 'put',
    response: {
      code: 20000,
      data: {
        status: 'success'
      }
    }
  },
  {
    url: '/classes/[A-Za-z0-9]',
    type: 'delete',
    response: {
      code: 20000,
      data: {
        status: 'success'
      }
    }
  }

]
