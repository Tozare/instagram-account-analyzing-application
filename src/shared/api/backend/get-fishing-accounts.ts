import axios from "axios";


const url = 'http://jibek100.pythonanywhere.com/getphishers/';

export const getComments = async () => {

  const res = await axios({
    method: 'GET',
    url: url,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return res;
}
