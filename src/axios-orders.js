import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-68d5e.firebaseio.com/'
})

export default instance;