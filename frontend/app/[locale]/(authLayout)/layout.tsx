export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex flex-row h-screen bg-no-repeat bg-cover bg-auth-light">
        <div className="flex justify-center items-center w-full m-auto md:w-[40%] bg-white rounded-md drop-shadow-lg max-w-[350px]">
          {children}
        </div>
      </div>
    </>
  );
}
