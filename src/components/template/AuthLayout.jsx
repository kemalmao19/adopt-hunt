import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export const AuthLayout = ({ children }) => {
  return (
    <main className="h-screen grid md:grid-cols-2">
      <div className="bg-oren-light bg-[url('/auth-bg.svg')] bg-cover bg-no-repeat bg-center m-5 rounded-2xl rounded-br-[200px] border border-oren hidden lg:block" />
      <div className="flex justify-center item-stretch md:items-center p-5">
        <section className="max-w-[550px] w-full">
          <Link href={"/"} className="mb-16 text-left block underline">
            <ChevronLeft className="inline"/> Back to Homepage
          </Link>
          <div>{children}</div>
        </section>
      </div>
    </main>
  );
};
