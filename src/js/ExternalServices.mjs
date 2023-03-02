const baseURL = "https://wdd330-backend.onrender.com";

export function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ExternalServices {
  constructor() {}

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
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };
  return await fetch(baseURL + "/checkout", options).then(convertToJson);
}
}
