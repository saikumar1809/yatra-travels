/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
//updateData
//type is either 'password' or 'data'
export const updateSettings = async (data, type) => {
  try {
    const url =
      type === 'data'
        ? 'http://127.0.0.1:3000/api/v1/users/updateMe'
        : 'http://127.0.0.1:3000/api/v1/users/updateMyPassword';
    const res = await axios({
      method: 'PATCH',
      url,
      data,
    });
    if (res.data.status === 'success') {
      showAlert('success', `${type.toUpperCase()} Updated sucessfully`);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
