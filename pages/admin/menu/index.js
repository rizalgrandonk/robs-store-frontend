import { useEffect, useState } from "react";
import {
  MdAdd,
  MdOutlineDelete,
  MdOutlineEdit,
  MdOutlineFilterAlt,
  MdSort,
} from "react-icons/md";
import MenuCard from "../../../components/MenuCard";

const daftarMenu = [
  {
    id: "1",
    name: "Americano",
    image: "https://source.unsplash.com/random/?americano",
    sales: 1300,
    price: 14000,
  },
  {
    id: "2",
    name: "Latte",
    image: "https://source.unsplash.com/random/?latte",
    sales: 2700,
    price: 18000,
  },
  {
    id: "3",
    name: "Cappuccino",
    image: "https://source.unsplash.com/random/?cappuccino",
    sales: 1600,
    price: 16000,
  },
  {
    id: "4",
    name: "Espresso",
    image: "https://source.unsplash.com/random/?espresso",
    sales: 1000,
    price: 12000,
  },
];

function Menu() {
  const [menus, setMenus] = useState(daftarMenu);
  const [sortOption, setSortOption] = useState("name");
  const sortMethods = {
    name: (a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    },
    price: (a, b) => a.price - b.price,
    sales: (a, b) => b.sales - a.sales,
  };

  return (
    <main className="pb-16 pt-[4.5rem] px-4 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between py-3">
        <div className="flex items-center gap-2">
          <SortButton setSortOption={setSortOption} />
        </div>
        <AddMenuButton setMenus={setMenus} />
      </div>
      <div className="space-y-4">
        {menus.sort(sortMethods[sortOption]).map((menu) => (
          <MenuCard key={menu.id} menu={menu} />
        ))}
      </div>
    </main>
  );
}

function AddMenuButton({ setMenus }) {
  const [modalOpen, setModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const menu = {
      id: (Math.random() + 1).toString(36).substring(7),
      name: formData.name,
      price: parseFloat(formData.price),
      sales: 0,
      image: `https://source.unsplash.com/random/?${formData.name}`,
    };

    setMenus((prev) => [...prev, menu]);
    setFormData({
      name: "",
      price: "",
    });
    setModalOpen(false);
  };

  return (
    <>
      <div className="bg-primary text-gray-600 flex items-center px-2 py-1 rounded">
        <span className="text-xl">
          <MdAdd />
        </span>
        <span onClick={() => setModalOpen(true)} className="text-sm">
          Tambahkan Menu
        </span>
      </div>
      {modalOpen ? (
        <div className="absolute inset-0 px-2 grid place-items-center bg-black/40 z-40">
          <div className="w-full bg-white rounded-md px-3 py-2">
            <div className="flex justify-between items-center pb-1 border-b">
              <p className="text-xl">Add Menu</p>
              <span
                onClick={() => setModalOpen(false)}
                className="text-2xl text-rose-500 font-bold px-1"
              >
                X
              </span>
            </div>
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
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

function SortButton({ setSortOption }) {
  const [sortOpen, setSortOpen] = useState(false);

  return (
    <div className="bg-primary text-gray-700 flex items-center px-2 py-1 rounded relative">
      <span onClick={() => setSortOpen((prev) => !prev)} className="text-xl">
        <MdSort />
      </span>
      <span className="text-sm">Sort</span>
      {sortOpen ? (
        <div className="absolute w-32 left-0 -bottom-[6.3rem] drop-shadow-xl bg-primary flex flex-col divide-y divide-white z-40 rounded">
          <p
            onClick={() => {
              setSortOption("name");
              setSortOpen(false);
            }}
            className="px-3 py-1"
          >
            Name
          </p>
          <p
            onClick={() => {
              setSortOption("price");
              setSortOpen(false);
            }}
            className="px-3 py-1"
          >
            Price
          </p>
          <p
            onClick={() => {
              setSortOption("sales");
              setSortOpen(false);
            }}
            className="px-3 py-1"
          >
            Sales
          </p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Menu;
