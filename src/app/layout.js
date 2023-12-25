import { Inter, Jua } from "next/font/google";
import { Provider } from "@/components/provider";
import "@/styles/globals.css";
import { DefaultLayout } from "@/components/template/DefaultLayout";

export const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter" 
});

export const jua = Jua({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-jua",
});

export const metadata = {
  title: "Adopt Hunt",
  description: "Final Assignment",
  icons: {
    icon: "/lucide_paw-print.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jua.variable}`}>
        <Provider>
          <DefaultLayout>{children}</DefaultLayout>
        </Provider>
      </body>
    </html>
  );
}
