import "./globals.css";
import { Figtree } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";

const FigtreeFont = Figtree({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${FigtreeFont.className} min-h-screen font-light`}>
        <div className="mx-auto max-w-xl px-4 pt-[6rem] md:px-0 md:pt-[4rem] xl:pt-[2rem]">
          <h1 className="text-center text-5xl font-medium tracking-tighter">
            AI chatbot built with Nvidia NIM and Vercel AI SDK
          </h1>
        </div>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
