import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "Social Hub",
  description: "Generated by Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light" style={{ colorScheme: "light" }}>
      <body className="dark:bg-black">
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
