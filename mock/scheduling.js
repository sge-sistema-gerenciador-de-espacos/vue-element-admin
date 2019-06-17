import Mock from 'mockjs'

const accessSchedulers = [
  {
    id: 1,
    status: 'Ativo',
    classes: {
      id: 1,
      name: 'Sistemas'
    },
    space: {
      id: 1,
      name: 'Sistemas'
    },
    it_responsable: {
      id: 1,
      name: 'Sistemas'
    },
    scheduler: {
      id: 1,
      name: 'Sistemas'
    }
  },
  {
    id: 2,
    status: 'Ativo',
    classes: {
      id: 'Sistemas',
      name: 'Sistemas'
    },
    space: {
      id: 2,
      name: 'Sistemas'
    },
    it_responsable: {
      id: 2,
      name: 'Sistemas'
    },
    scheduler: {
      id: 2,
      name: 'Sistemas'
    }
  }
]

export default [
  {
    url: '/scheduler',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: accessSchedulers
      }
    }
  },
  {
    url: '/scheduler',
    type: 'post',
    response: {
      code: 20000,
      data: {
        key: Mock.mock('@integer(300, 5000)')
      }
    }
  },
  {
    url: '/scheduler/[A-Za-z0-9]',
    type: 'put',
    response: {
      code: 20000,
      data: {
        status: 'success'
      }
    }
  },
  {
    url: '/scheduler/[A-Za-z0-9]',
    type: 'delete',
    response: {
      code: 20000,
      data: {
        status: 'success'
      }
    }
  }

]
