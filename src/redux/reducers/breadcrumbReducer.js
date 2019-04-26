import * as actionTypes from '../actions/actionsTypes';

const initState = {
  nav: [
    {
      link: '/admin/home',
      name: '首页'
    }
  ]
}

const getbreadcrumb = (state, action) => {
  return {...state, nav: action.data.list}
}

export default function breadcrumbReducer(state = initState, action) {
  switch(action.type) {
    // 更改nav
    case actionTypes.CHANGE_BREAD_CRUMB_LIST:
      return getbreadcrumb(state, action);
    default:
      return state;
  }
}
