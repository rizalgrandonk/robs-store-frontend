import Image from "next/image";
import { useRef, useState } from "react";
import { BiImageAdd } from "react-icons/bi";
export default function ToppingForm({
  name = "",
  price = "",
  edit = false,
  onSubmit,
  setModalOpen,
}) {
  const [formData, setFormData] = useState({
    name: name,
    price: price,
  });
  const [image, setImage] = useState(null);

  const imageInputRef = useRef();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleChaneImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("price", formData.price);
    if (!edit) {
      data.append("typeId", "1");
    }
    if (image) {
      data.append("topping", image);
    }
    onSubmit(data);
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
      <input
        ref={imageInputRef}
        type="file"
        accept="image/jpg,image/png,image/jpeg"
        name="image"
        id="image"
        className="hidden"
        onChange={handleChaneImage}
      />

      {!image ? (
        <div
          onClick={() => imageInputRef.current.click()}
          className="w-1/2 h-40 border-2 border-gray-500 flex flex-col justify-center items-center text-9xl text-gray-500 cursor-pointer"
        >
          <BiImageAdd />
          {edit ? (
            <p className="text-sm py-1 px-4 text-center">
              Kosongi jika tidak ingin merubah image
            </p>
          ) : (
            ""
          )}
        </div>
      ) : (
        <div
          onClick={() => imageInputRef.current.click()}
          className="w-1/2 h-40 flex justify-center items-center text-9xl relative text-gray-500 cursor-pointer"
        >
          <Image
            src={URL.createObjectURL(image)}
            alt="Menu Image"
            fill
            loading="lazy"
            sizes="50vw"
            className="object-cover h-full w-full"
          />
        </div>
      )}

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
      <div className="w-full flex justify-end items-center pt-6 gap-4">
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
