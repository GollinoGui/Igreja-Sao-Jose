import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ScrollProgressBar } from "./ScrollProgressBar";

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollProgressBar />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
