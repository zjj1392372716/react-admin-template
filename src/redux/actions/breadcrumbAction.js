import { CHANGE_BREAD_CRUMB_LIST } from './actionsTypes';

export function changeNavList(data) {
  return {
    type: CHANGE_BREAD_CRUMB_LIST,
    data
  }
}
