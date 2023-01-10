import Image from "next/image";
import { useState } from "react";
import { MdClose, MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import { useMutation, useQueryClient } from "react-query";
import { useAuth } from "../contexts/AuthContext";
import { deleteTopping, editTopping } from "../lib/api";
import ToppingForm from "./ToppingForm";

export default function AdminToppingCard({ topping }) {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  return (
    <>
      <div className="p-2 flex items-center rounded-md bg-white gap-4 drop-shadow">
        <div className="w-24 h-20 relative overflow-hidden">
          <Image
            src={topping.img}
            alt={topping.name}
            fill
            loading="lazy"
            sizes="50vw"
            className="object-cover h-full w-full"
          />
        </div>
        <div className="flex-grow">
          <p className="text-gray-900 text-xl font-medium">{topping.name}</p>
          <span className="text-gray-500 text-lg">
            {"Rp " + topping.price.toLocaleString("id-ID")}
          </span>
        </div>
        <div className="flex self-end">
          <span
            onClick={() => setDeleteModalOpen(true)}
            className="text-rose-600 text-2xl py-1 px-1.5 border border-gray-500"
          >
            <MdOutlineDelete />
          </span>
          {/* <span
            onClick={() => setEditModalOpen(true)}
            className="text-secondary text-2xl py-1 px-1.5 border border-gray-500"
          >
            <MdOutlineEdit />
          </span> */}
        </div>
      </div>

      <DeleteModal
        topping={topping}
        setDeleteModalOpen={setDeleteModalOpen}
        isOpen={deleteModalOpen}
      />
      <EditModal
        topping={topping}
        setEditModalOpen={setEditModalOpen}
        isOpen={editModalOpen}
      />
    </>
  );
}

function DeleteModal({ topping, setDeleteModalOpen, isOpen }) {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const mutation = useMutation((id) => deleteTopping(id, user.token), {
    onSuccess: () => {
      queryClient.invalidateQueries("allTopping");
      setDeleteModalOpen(false);
    },
  });

  const handleDelete = () => {
    mutation.mutate(topping.id);
  };

  if (isOpen) {
    return (
      <div className="fixed inset-0 grid place-items-center bg-black/30 z-40">
        <div className="w-full min-h-[60%] bg-white rounded-t-3xl px-5 py-4 absolute bottom-0">
          <div className="flex justify-between items-center pb-2 border-b">
            <p className="text-xl font-medium">Delete Topping</p>
            <span
              onClick={() => setDeleteModalOpen(false)}
              className="text-2xl text-gray-600 font-bold px-1"
            >
              <MdClose />
            </span>
          </div>
          {mutation.isError ? (
            <div>An error occurred: {mutation.error.message}</div>
          ) : null}
          {mutation.isLoading ? (
            <div className="w-full flex justify-center items-center py-6">
              <div className="border-t-transparent border-solid animate-spin  rounded-full border-primary border-8 h-20 w-20"></div>
            </div>
          ) : (
            <>
              <p className="py-8 text-xl">
                Are you sure deleting{" "}
                <span className="font-medium">{topping.name}</span> ?
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
            </>
          )}
        </div>
      </div>
    );
  }
}

function EditModal({ topping, setEditModalOpen, isOpen }) {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (data) => editTopping(topping.id, data, user.token),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("allTopping");
        setEditModalOpen(false);
      },
    }
  );

  const handleSubmit = (formData) => {
    console.log(formData);
    mutation.mutate(formData);
  };

  return isOpen ? (
    <div className="fixed inset-0 grid place-items-center bg-black/30 z-40">
      <div className="w-full min-h-[60%] bg-white rounded-t-3xl px-5 py-4 absolute bottom-0">
        <div className="flex justify-between items-center pb-2 border-b">
          <p className="text-xl">Edit Topping</p>
          <span
            onClick={() => setEditModalOpen(false)}
            className="text-2xl text-gray-600 font-bold px-1"
          >
            <MdClose />
          </span>
        </div>
        {mutation.isError ? (
          <div className="p-2 bg-red-100 ring-1 ring-red-200 text-red-400 ">
            {mutation.error.message}
          </div>
        ) : null}
        {mutation.isLoading ? (
          <div className="w-full flex justify-center items-center py-6">
            <div className="border-t-transparent border-solid animate-spin  rounded-full border-primary border-8 h-20 w-20"></div>
          </div>
        ) : (
          <ToppingForm
            edit
            name={topping.name}
            price={`${topping.price}`}
            onSubmit={handleSubmit}
            setModalOpen={setEditModalOpen}
          />
        )}
      </div>
    </div>
  ) : (
    ""
  );
}
