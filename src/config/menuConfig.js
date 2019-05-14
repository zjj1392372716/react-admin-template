// ================================================
// 菜单配置
// ================================================

let menuListConfig = {};

// 学生身份
menuListConfig.menuList1 = [{
    title: '首页',
    key: '/admin/home',
    iconType: 'home'
  },
  {
    title: '个人管理',
    key: '/my',
    iconType: 'switcher',
    children: [{
        title: '个人信息',
        key: '/admin/myInfo',
        iconType: 'tags'
      },
      {
        title: '我的成绩',
        key: '/admin/myScore',
        iconType: 'switcher'
      }
    ]
  },
  {
    title: '选课管理',
    key: '/course1',
    iconType: 'security-scan',
    children: [{
        title: '我的课表',
        key: '/admin/mytimeable',
        iconType: 'tags'
      },
      {
        title: '选课',
        key: '/admin/SelectCourse',
        iconType: 'security-scan',
      },
      {
        title: '退课',
        key: '/admin/exitCourse',
        iconType: 'security-scan',
      }
    ]
  }
];

// 教师身份
menuListConfig.menuList2 = [{
    title: '首页',
    key: '/admin/home',
    iconType: 'home'
  },
  {
    title: '个人管理',
    key: '/my',
    iconType: 'switcher',
    children: [{
        title: '我的信息',
        key: '/admin/teacherInfo',
        iconType: 'tags'
      }
    ]
  },
  {
    title: '任课管理',
    key: '/course1',
    iconType: 'security-scan',
    children: [{
        title: '我的任课',
        key: '/admin/mycourse',
        iconType: 'tags'
      },
      {
        title: '我的学生',
        key: '/admin/myStudent',
        iconType: 'security-scan',
      },
      {
        title: '成绩录入',
        key: '/admin/inResult',
        iconType: 'security-scan',
      }
    ]
  }
];

menuListConfig.menuList3 = [{
    title: '首页',
    key: '/admin/home',
    iconType: 'home'
  },
  {
    title: '角色管理',
    key: '/admin/role',
    iconType: 'tags'
  },
  {
    title: '学生管理',
    key: '/student',
    iconType: 'switcher',
    children: [{
        title: '班级管理',
        key: '/admin/class',
        iconType: 'tags'
      },
      {
        title: '学生信息管理',
        key: '/admin/studentInfo',
        iconType: 'switcher'
      }
    ]
  },
  {
    title: '教室管理',
    key: '/admin/room',
    iconType: 'tags'
  },
  {
    title: '教师管理',
    key: '/admin/teacher',
    iconType: 'tags'
  },
  {
    title: '课程管理',
    key: '/course',
    iconType: 'security-scan',
    children: [{
        title: '课程管理',
        key: '/admin/courseMs',
        iconType: 'tags'
      },
      {
        title: '选课管理',
        key: '/admin/selectMs',
        iconType: 'security-scan',
      }
    ]
  }
];


export default menuListConfig;