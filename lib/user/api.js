export const getAllMenu = async () => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/user/menu`)
    .then((res) => res.json())
    .then((data) => {
      if (data.code === 400) {
        throw new Error(data.message);
      }
      return data.data;
    });
  return data;
};

export const getAllTopping = async () => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/user/topping`)
    .then((res) => res.json())
    .then((data) => {
      if (data.code === 400) {
        throw new Error(data.message);
      }
      return data.data;
    });
  return data;
};

export const createOrder = async (formData) => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/user/order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((res) => res.json())
    .then((data) => data.data)
    .catch((err) => console.log(err));

  return data;
};

export const payOrder = async (formData, token) => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/user/order`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((res) => res.json())
    .then((data) => data.data)
    .catch((err) => console.log(err));

  return data;
};
