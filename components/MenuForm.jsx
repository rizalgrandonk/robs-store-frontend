import { useState } from "react";

function MenuForm({ name = "", price = "", onSubmit, setModalOpen }) {
  const [formData, setFormData] = useState({
    name: name,
    price: price,
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      name: "",
      price: "",
    });
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="py-4 flex flex-col items-center gap-3"
    >
      <div className="w-full flex flex-col gap-0">
        <label htmlFor="name" className="text-lg font-medium">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="rounded-md text-lg"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div className="w-full flex flex-col gap-0">
        <label htmlFor="price" className="text-lg font-medium">
          Price
        </label>
        <input
          type="text"
          id="price"
          name="price"
          className="rounded-md text-lg"
          value={formData.price}
          onChange={handleChange}
        />
      </div>
      {/* <div className="w-full flex flex-col gap-0">
                <label htmlFor="image" className="text-lg font-medium">
                  Image
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  className="rounded-md text-lg"
                  onChange={handleChange}
                />
              </div> */}
      <div className="w-full flex justify-between pt-6">
        <button
          type="button"
          className="bg-rose-600 text-gray-100 py-2 px-6 rounded-lg text-lg"
          onClick={() => setModalOpen(false)}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-primary text-gray-800 py-2 px-6 rounded-lg text-lg"
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default MenuForm;
