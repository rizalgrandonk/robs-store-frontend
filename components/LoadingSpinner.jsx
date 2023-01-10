export default function LoadingSpinner() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="border-t-transparent border-solid animate-spin  rounded-full border-primary border-8 h-20 w-20"></div>
    </div>
  );
}
