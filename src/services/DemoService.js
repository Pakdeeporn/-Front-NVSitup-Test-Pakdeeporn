import { axios } from '../common/utils'; 
import { appSettings } from '../common/configs';

const DemoService = {};

DemoService.login = (username, password) => {
    return new Promise((resolve, reject) => {
      axios({
        method: "post",
        url: `${appSettings.apiUrl}/api/User/Login`,
        params: {
          username: username,
          password: password
        }
      })
        .then(response => resolve(response.data))
        .catch(error => reject(error));
    });
  };

  DemoService.getDataTable = (token) => {
    return new Promise((resolve, reject) => {
      axios({
        headers: { Authorization: token },
        method: "get",
        url: `${appSettings.apiUrl}/api/Demo/GetListUserTable`,
      })
        .then(response => resolve(response.data))
        .catch(error => reject(error));
    });
  };

  DemoService.CreateUser = (token, obj) => {
    return new Promise((resolve, reject) => {
      axios({
        headers: { Authorization: token },
        method: "post",
        url: `${appSettings.apiUrl}/api/Demo/CreateUser`,
        data: obj
      })
        .then(response => resolve(response.data))
        .catch(error => reject(error));
    });
  };

  DemoService.UpdateUser = (token, obj) => {
    return new Promise((resolve, reject) => {
      axios({
        headers: { Authorization: token },
        method: "put",
        url: `${appSettings.apiUrl}/api/Demo/UpdateUser`,
        data: obj
      })
        .then(response => resolve(response.data))
        .catch(error => reject(error));
    });
  };

  DemoService.DeleteUser = (token, user_id) => {
    return new Promise((resolve, reject) => {
      axios({
        headers: { Authorization: token },
        method: "delete",
        url: `${appSettings.apiUrl}/api/Demo/DeleteUser`,
        params:{
          user_id: user_id
        }
      })
        .then(response => resolve(response.data))
        .catch(error => reject(error));
    });
  };


  export default DemoService;