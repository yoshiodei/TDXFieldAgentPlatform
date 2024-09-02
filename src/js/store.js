
import { createStore } from 'framework7/lite';

const initialState = {
  firstname: '',
  lastname: '',
  mobile: '',
  photo: '',
  email: '',
  token: '',
  access_token: ''
}

const store = createStore({
  state: {
    user: initialState,
    farmer: {},
    farmData: [],
    connectFarmer: {} 
  },
  getters: {
    user({ state }) {
      return state.user;
    },
    farmerName({ state }) {
      return state?.farmer?.name || 'Farmer name unset';
    },
    farmerData({ state }) {
      return state?.farmer;
    },
    farmData({ state }) {
      return state?.farmData;
    },
    connectFarmer({ state }) {
      return state?.connectFarmer;
    },
  },
  actions: {
    setUser({ state }, user) {
      state.user = user;
    },
    setFarmer({ state }, farmerData) {
      state.farmer = farmerData;
    },
    setFarmData({ state }, farmData) {
      state.farmData = farmData;
    },
    setFarmerConnection({ state }, connectionData) {
      state.connectFarmer = connectionData;
    },
    resetState({ state }) {
      state = {
        user: initialState,
        farmer: {},
        farmData: [],
        connectFarmer: {} 
      };
    },

  },
})
export default store;
