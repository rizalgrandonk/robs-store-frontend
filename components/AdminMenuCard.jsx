import Image from "next/image";
import { useState } from "react";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import MenuForm from "./MenuForm";

export default function AdminMenuCard({ menu, setMenus }) {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  return (
    <>
      <div className="p-2 flex items-center rounded-md bg-white gap-4 drop-shadow">
        <div className="w-24 h-20 relative overflow-hidden">
          <Image
            src={menu.image}
            alt={menu.name}
            fill
            loading="lazy"
            sizes="50vw"
            className="object-cover h-full w-full"
          />
        </div>
        <div className="flex-grow">
          <p className="text-gray-900 text-xl font-medium">{menu.name}</p>
          <span className="text-gray-500 text-lg">
            {"Rp " + menu.price.toLocaleString("id-ID")}
          </span>
        </div>
        <div className="flex self-end">
          <span
            onClick={() => setDeleteModalOpen(true)}
            className="text-rose-600 text-2xl py-1 px-1.5 border border-gray-500"
          >
            <MdOutlineDelete />
          </span>
          <span
            onClick={() => setEditModalOpen(true)}
            className="text-secondary text-2xl py-1 px-1.5 border border-gray-500"
          >
            <MdOutlineEdit />
          </span>
        </div>
      </div>
      <DeleteModal
        menu={menu}
        setMenus={setMenus}
        setDeleteModalOpen={setDeleteModalOpen}
        isOpen={deleteModalOpen}
      />
      <EditModal
        menu={menu}
        setMenus={setMenus}
        setEditModalOpen={setEditModalOpen}
        isOpen={editModalOpen}
      />
    </>
  );
}

function DeleteModal({ menu, setMenus, setDeleteModalOpen, isOpen }) {
  const handleDelete = () => {
    setMenus((prev) => prev.filter((item) => item.id !== menu.id));
    setDeleteModalOpen(false);
  };
  return isOpen ? (
    <div className="fixed inset-0 grid place-items-center bg-black/30 z-40">
      <div className="w-full min-h-[60%] bg-white rounded-t-3xl px-5 py-4 absolute bottom-0">
        <div className="flex justify-between items-center pb-2 border-b">
          <p className="text-xl font-medium">Delete Menu</p>
          <span
            onClick={() => setDeleteModalOpen(false)}
            className="text-2xl text-gray-600 font-bold px-1"
          >
            X
          </span>
        </div>
        <p className="py-8 text-xl">
          Are you sure deleting <span className="font-medium">{menu.name}</span>{" "}
          ?
        </p>
        <div className="w-full flex justify-end items-center gap-4">
          <button
            type="button"
            className="bg-gray-600 text-gray-100 py-2 px-6 rounded-lg text-lg"
            onClick={() => setDeleteModalOpen(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="bg-rose-500 text-gray-100 py-2 px-6 rounded-lg text-lg"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

function EditModal({ menu, setMenus, setEditModalOpen, isOpen }) {
  const handleSubmit = (formData) => {
    const editedMenu = {
      id: menu.id,
      name: formData.name,
      price: parseFloat(formData.price),
      sales: menu.sales,
      image: `https://source.unsplash.com/random/?${formData.name}`,
    };

    setMenus((prev) => {
      const filtered = prev.filter((item) => item.id !== menu.id);
      return [...filtered, editedMenu];
    });
    setEditModalOpen(false);
  };
  return isOpen ? (
    <div className="fixed inset-0 grid place-items-center bg-black/30 z-40">
      <div className="w-full min-h-[60%] bg-white rounded-t-3xl px-5 py-4 absolute bottom-0">
        <div className="flex justify-between items-center pb-2 border-b">
          <p className="text-xl">Edit Menu</p>
          <span
            onClick={() => setEditModalOpen(false)}
            className="text-2xl text-gray-600 font-bold px-1"
          >
            X
          </span>
        </div>
        <MenuForm
          name={menu.name}
          price={`${menu.price}`}
          onSubmit={handleSubmit}
          setModalOpen={setEditModalOpen}
        />
      </div>
    </div>
  ) : (
    ""
  );
}
