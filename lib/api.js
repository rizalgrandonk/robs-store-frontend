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
    })
    .catch((err) => console.log(err));
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
    })
    .catch((err) => console.log(err));
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
    })
    .catch((err) => console.log(err));
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
    })
    .catch((err) => console.log(err));
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
    })
    .catch((err) => console.log(err));
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