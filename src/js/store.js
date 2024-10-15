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

const initialFarmerState = {
  firstname: '',
  lastname: '',
  age: '',
  community: '1, Samoa(Bongolo), Lambusie, Upper West',
  mobilenumber: '',
  gender: 'male',
  experience_year: '2024',
  idcardtype: '',
  idcardnumber: '',
}

const initialStateFarmData = [
  {    
    farmName: '',
    location: '1, Samoa(Bongolo), Lambusie, Upper West',
    yieldFromLastSeason: '',
    yearOfEstablishment: '2024',
    typeOfLabour: ['family labour'],
    size: '',
    commodity: [],
    colorCode: 'none',
  }
];

const store = createStore({
  state: {
    user: initialState,
    farmer: initialFarmerState,
    farmData: initialStateFarmData,
    connectFarmer: {},
    verifiedFarmer: {},
  },
  getters: {
    user({ state }) {
      return state.user;
    },
    farmerName({ state }) {
      return `${state?.farmer?.firstname} ${state?.farmer?.lastname}` || 'Farmer name unset';
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
    setVerifiedFarmer({ state }, farmData) {
      state.verifiedFarmer = farmData;
    },
    setFarmerConnection({ state }, connectionData) {
      state.connectFarmer = connectionData;
    },
    farmerIntentComplete({ state }) {
        state.connectFarmer = {};
        state.verifiedFarmer = {}; 
    },
    farmerRegistrationComplete({ state }) {
        state.farmer = initialFarmerState;
        state.farmData = initialStateFarmData;
    },
    resetState({ state }) {
      state = {
        user: initialState,
        farmer: initialFarmerState,
        farmData: initialStateFarmData,
        connectFarmer: {},
        verifiedFarmer: {},
      };
    },

  },
})
export default store;
