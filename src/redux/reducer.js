const initialState = {
    id: 0,
    username: '',
    world_id: 0,
    worldName: ''
}

export const USER_INFO = 'USER_INFO'
export const WORLD_NAME = 'WORLD_NAME'

export function userInfo(id, username){
    
    return {
        type: USER_INFO,
        payload: id, username
    }
}

export function worldInfo(world_id, worldName){
    return{
        type: WORLD_NAME,
        payload: world_id, worldName
    }
}

export default function reducer(state = initialState, action){
    const {type, payload} = action
  
    switch(type){
        case USER_INFO:
            
            const {id, username} = payload
            return {...state, id, username}
        case WORLD_NAME: 
            console.log(payload)
            const {world_id, worldName} = payload
            return {...state, world_id, worldName}

        default: 
            return state;
    }
}