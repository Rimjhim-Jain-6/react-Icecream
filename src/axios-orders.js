import axios from 'axios';
const instance=axios.create({
    baseURL:'https://react-my-burger-5a264.firebaseio.com/'
   // baseURL:'https://dessertpacific.firebaseio.com/'
}

);
export default instance;