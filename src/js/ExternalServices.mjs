const baseURL = "https://wdd330-backend.onrender.com";

export function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw { name: 'servicesError', message: res };
  }
}



export default class ExternalServices {
  constructor() {

  }

  async getData(category) {
    const response = await fetch(baseURL + `/products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }
  async findProductById(id) {
    const response = await fetch(baseURL + `/product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  async loginRequest(creds){
    console.log('first')
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(creds),
    };
    // return await fetch(baseURL + "/admin", options).then(convertToJson);
    const response = await fetch(baseURL + "/login", options).then(convertToJson);
    console.log('second')
    // console.log('response')
    return response.accessToken;
}




  //   async checkout(order) {
  //     const options = {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(order)
  //     }
  //     const orderObj = await fetch(order, options)
  //     console.log(orderObj)
  //     return orderObj;
  // }

  async checkout(payload) {
    console.log(payload);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    return await fetch(baseURL + "/checkout", options).then(convertToJson);
  }
  
  async getOrders(token) {
    const options = {
        method: "GET",
        // the server will reject our request if we don't include the Authorization header with a valid token!
        headers: {
        Authorization: `Bearer ${token}`,
        },
    };
    const response = await fetch(baseURL + "/orders", options).then(
        convertToJson
    );
    return response;
}

  
}

