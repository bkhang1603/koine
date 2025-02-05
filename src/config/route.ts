const configRoute = {
  home: '/',
  about: '/about',
  contact: '/contact',
  course: '/course',
  knowledge: '/knowledge',
  service: '/service',
  product: '/product',
  login: '/login',
  register: '/register',
  forgotPassword: '/forgot-password',
  setting: {
    profile: '/setting',
    myCourse: '/setting/my-course',
    order: '/setting/order',
    password: '/setting/password'
  },
  profile: '/profile',
  contentCreator: {
    dashboard: '/content-creator/dashboard',
    blog: '/content-creator/blog',
    addBlog: '/content-creator/blog/add',
    editBlog: '/content-creator/blog/edit',
    course: '/content-creator/course',
    addCourse: '/content-creator/course/add',
    editCourse: '/content-creator/course/edit'
  },
  parent: {
    dashboard: '/parent',
    child: '/parent/child',
    bookmark: '/parent/bookmark'
  },
  learn: '/learn',
  kid: {
    dashboard: '/kid',
    course: '/kid/course',
    knowledge: '/kid/knowledge',
    bookmark: '/kid/bookmark'
  }
}

export default configRoute
