export const getAllMenu = async (token) => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/admin/menu`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.code === 400) {
        throw new Error(data.message);
      }
      return data.data;
    });
  return data;
};

export const addMenu = async (formdata, token) => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/admin/menu`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formdata,
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.code === 400) {
        throw new Error(data.message);
      }
      return data.data;
    });
  return data;
};

export const deleteMenu = async (id, token) => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_HOST_URL}/admin/menu/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.code === 400) {
        throw new Error(data.message);
      }
      return data.data;
    });
  return data;
};

export const editMenu = async (id, formdata, token) => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_HOST_URL}/admin/menu/${id}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formdata,
    }
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.code === 400) {
        throw new Error(data.message);
      }
      return data.data;
    });
  return data;
};

export const getAllTopping = async (token) => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_HOST_URL}/admin/topping`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.code === 400) {
        throw new Error(data.message);
      }
      return data.data;
    });
  return data;
};

export const addTopping = async (formdata, token) => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_HOST_URL}/admin/topping`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formdata,
    }
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.code === 400) {
        throw new Error(data.message);
      }
      return data.data;
    });
  return data;
};

export const deleteTopping = async (id, token) => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_HOST_URL}/admin/topping/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.code === 400) {
        throw new Error(data.message);
      }
      return data.data;
    });
  return data;
};

export const editTopping = async (id, formdata, token) => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_HOST_URL}/admin/topping/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "aplication/form-data",
        Authorization: `Bearer ${token}`,
      },
      body: formdata,
    }
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.code === 400) {
        throw new Error(data.message);
      }
      return data.data;
    });
  return data;
};

export const getAllPesanan = async (token) => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_HOST_URL}/admin/order?order_by=createdAt&order_dir=DESC`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.code === 400) {
        throw new Error(data.message);
      }
      return data.data;
    });
  return data;
};

export const getDetailPesanan = async (id, token) => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_HOST_URL}/admin/order/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.code === 400) {
        throw new Error(data.message);
      }
      return data.data;
    });
  return data;
};

export const scanOrderQR = async (formdata, token) => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_HOST_URL}/admin/scan-qr`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formdata,
    }
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.code === 400) {
        throw new Error(data.message);
      }
      return data.data;
    });
  return data;
};

export const payUserOrder = async (formdata, token) => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/admin/pay`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formdata),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.code === 400) {
        throw new Error(data.message);
      }
      return data.data;
    });
  return data;
};
