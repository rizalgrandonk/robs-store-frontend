function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-10 bg-primary p-4 shadow-md">
      <div className="flex items-center gap-2">
        <div className="h-10 w-10 grid place-items-center bg-gray-500 text-gray-200 rounded-full tracking-normal leading-none">
          U
        </div>
        <p className="text-gray-800 font-medium">User 1234</p>
      </div>
    </header>
  );
}

export default Header;
