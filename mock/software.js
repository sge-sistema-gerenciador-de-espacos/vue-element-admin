import Mock from 'mockjs'

const accessSoftware = [
  {
    id: 1,
    status: 'ativo',
    name: 'word'
  },
  {
    id: 2,
    status: 'ativo',
    name: 'chrome'
  }
]

const software = [
  {
    id: 1,
    status: 'ativo',
    name: 'teste Ativo'
  },
  {
    id: 2,
    status: 'ativo',
    name: 'Ativo teste'
  }
]

export default [
  {
    url: '/software',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: accessSoftware
      }
    }
  },
  {
    url: '/software',
    type: 'post',
    response: {
      code: 20000,
      data: {
        key: Mock.mock('@integer(300, 5000)')
      }
    }
  },
  {
    url: '/software/[A-Za-z0-9]',
    type: 'put',
    response: {
      code: 20000,
      data: {
        status: 'success'
      }
    }
  },
  {
    url: '/software/[A-Za-z0-9]',
    type: 'delete',
    response: {
      code: 20000,
      data: {
        status: 'success'
      }
    }
  },
  {
    url: '/software/space/[0-9]',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: accessSoftware
      }
    }
  },
  {
    url: '/active/software',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: software
      }
    }
  }

]
