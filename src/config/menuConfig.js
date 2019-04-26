// ================================================
// 菜单配置
// ================================================
const menuList = [{
    title: '首页',
    key: '/admin/home',
    iconType: 'home'
  },
  {
    title: '新闻管理',
    key: '/news',
    iconType: 'switcher',
    children: [{
        title: '新闻分类',
        key: '/admin/newsSort',
        iconType: 'tags'
      },
      {
        title: '新闻管理',
        key: '/admin/newsManage',
        iconType: 'switcher'
      }
    ]
  },
  {
    title: '法律管理',
    key: '/law',
    iconType: 'security-scan',
    children: [{
        title: '法律分类',
        key: '/admin/lawSort',
        iconType: 'tags'
      },
      {
        title: '法律管理',
        key: '/admin/lawManage',
        iconType: 'security-scan',
      }
    ]
  },
  {
    title: '知识科普',
    key: '/known',
    iconType: 'read',
    children: [{
        title: '科普分类',
        key: '/admin/knownSort',
        iconType: 'tags',
      },
      {
        title: '科普知识',
        key: '/admin/knownScience',
        iconType: 'read',
      },
      {
        title: '科普动画分类管理',
        key: '/admin/knownAnSortMs',
        iconType: 'rocket'
      },
      {
        title: '科普动画管理',
        key: '/admin/knownAnMs',
        iconType: 'project'
      },
      {
        title: '百姓讲堂',
        key: '/admin/knownP',
        iconType: 'book'
      }
    ]
  }
];


export default menuList;
