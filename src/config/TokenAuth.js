import ClienteAxios from './Axios';

const TokenAuth = token => {
    if(token){
        ClienteAxios.defaults.headers.common['x-auth-token'] = token;
    }else{
        delete ClienteAxios.defaults.headers.common['x-auth-token'];
    }
}

export default TokenAuth;