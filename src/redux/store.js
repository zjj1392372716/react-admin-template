import { createStore } from 'redux'
import rootReducer from './reducers'

/**
 * 配置函数
 * @param  {[type]} initialState [初始化]
 * @return {[type]}              [description]
 */
export default function configureStore() {
    const store = createStore(rootReducer,
        // 触发 redux-devtools
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
    return store
}
