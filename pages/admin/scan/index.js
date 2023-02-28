import Image from "next/image";
import { useRouter } from "next/router";
import QrScanner from "qr-scanner";
import { useEffect, useRef, useState } from "react";
import { useMutation } from "react-query";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { useAuth } from "../../../contexts/AuthContext";
import { payOrder } from "../../../lib/user/api";

export default function Scan() {
  const { user } = useAuth();
  const router = useRouter();
  const videoRef = useRef();

  const mutation = useMutation((formData) => payOrder(formData, user.token), {
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      router.push(`/admin/pesanan/${data}`);
    },
  });

  useEffect(() => {
    if (!videoRef.current) {
      return;
    }

    const qrScanner = new QrScanner(
      videoRef.current,
      (result) => mutation.mutate({ order: result.data }),
      {
        // preferredCamera: "environment",
      }
    );
    qrScanner.start();

    return () => {
      qrScanner.destroy();
    };
  }, [videoRef, mutation]);

  if (mutation.isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <LoadingSpinner />
        Loading...
      </div>
    );
  }

  if (!mutation.isLoading) {
    return (
      <main className="pb-16 pt-24 px-6 bg-gray-50 min-h-screen grid place-items-center">
        <video ref={videoRef}></video>
      </main>
    );
  }
}
