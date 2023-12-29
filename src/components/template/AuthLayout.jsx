import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export const AuthLayout = ({ children }) => {
  return (
    <main className="h-screen grid lg:grid-cols-2">
      <div className="bg-oren-light bg-[url('/auth-bg.svg')] bg-cover bg-no-repeat bg-center m-5 rounded-2xl rounded-br-[200px] border border-oren fixed lg:static inset-x-0 inset-y-0 lg:block opacity-30 lg:opacity-100" />
      <div className="flex justify-center items-center p-5">
        <section className="max-w-none lg:max-w-[550px] mx-5 md:mx-20 lg:mx-auto w-full z-20 bg-white lg:bg-none p-5 rounded-2xl shadow-xl lg:shadow-none my-5 lg:my-0">
          <Link href={"/"} className="mb-16 text-left inline-block underline">
            <ChevronLeft className="inline"/> Back to Homepage
          </Link>
          <div>{children}</div>
        </section>
      </div>
    </main>
  );
};
