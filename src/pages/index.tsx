import Image from "next/image";
import { Inter } from "next/font/google";
import Magic from "@/components/magichome";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main>

      {/* <Sidebar /> */}
      <div className="drawer">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="w-full navbar">
            <div className="flex-none lg:hidden fixed">
              <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </label>
            </div>
            {/* <div className="flex-1 px-2 mx-2">Navbar Title</div> */}
            <div className="flex-none hidden lg:block">
              <ul className="menu menu-horizontal">
                {/* Navbar menu content here */}
                <li><a>Navbar Item 1</a></li>
                <li><a>Navbar Item 2</a></li>
              </ul>
            </div>
          </div>

          <main className="min-h-screen flex flex-row ">
            <Magic />
          </main>

        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200">
            {/* Sidebar content here */}
            {/* <li><LoginButtonGoogle /></li> */}
            <li><button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover" >Sign out</button></li>
          </ul>
        </div>
      </div>

    </main>
  );
}
