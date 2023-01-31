import Image from "next/image";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { QrReader } from "react-qr-reader";
import { useMutation } from "react-query";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { useAuth } from "../../../contexts/AuthContext";
import { payOrder } from "../../../lib/user/api";

export default function Scan() {
  const { user } = useAuth();
  const router = useRouter();
  const qr = useRef();

  // const queryClient = useQueryClient();

  // const [errors, setErrors] = useState({});

  const mutation = useMutation((formData) => payOrder(formData, user.token), {
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      console.log(data);
      router.push("/admin/pesanan");
    },
  });

  if (mutation.isLoading) {
    return (
      <div className="h-screen flex flex-col items-center gap-4">
        <LoadingSpinner />
        Loading...
      </div>
    );
  }

  if (!mutation.isLoading) {
    return (
      <main className="pb-16 pt-16 px-1 bg-gray-50 h-screen">
        <div className="px-1 pt-12">
          <QrReader
            onResult={(result, error) => {
              if (result) {
                mutation.mutate({ order: result.text });
              }

              if (error) {
                console.log(error);
              }
            }}
            style={{ width: "100%" }}
            constraints={{ facingMode: "environment" }}
          />
        </div>
      </main>
    );
  }
}
