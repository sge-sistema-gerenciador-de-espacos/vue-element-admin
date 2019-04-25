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

export default [

  // get software info
  // {
  //   url: '/software/info\.*',
  //   type: 'get',
  //   response: config => {
  //     const { token } = config.query
  //     const info = softwares[token]
  //
  //     // mock error
  //     if (!info) {
  //       return {
  //         code: 50008,
  //         message: 'Login failed, unable to get software details.'
  //       }
  //     }
  //
  //     return {
  //       code: 20000,
  //       data: info
  //     }
  //   }
  // },
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
  }

]
