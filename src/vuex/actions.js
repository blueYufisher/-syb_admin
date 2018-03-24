//test
export const increment = ({commit}) => {
    commit('INCREMENT')
}
export const decrement = ({commit}) => {
    commit('DECREMENT')
}

export const editInfo = ({commit}, id) => {
    commit('EDIT_INFO', id);
}

export const editPic = ({commit}, id) => {
    commit('EDIT_PIC', id);
}

export const editProj = ({commit}, id) => {
    commit('EDIT_PROJ', id);
}

export const loginUser = ({commit}, user) => {
    commit('LOGINUSER', user);
}

export const logoutUser = ({commit}, user) => {
    commit('LOGOUTUSER', user);
}