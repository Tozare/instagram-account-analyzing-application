import axios from "axios";


const url = 'http://jibek100.pythonanywhere.com/plane/';

export const getCommentsGraphInfo = async () => {

  const res = await axios({
    method: 'GET',
    url: url,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return res;
}
