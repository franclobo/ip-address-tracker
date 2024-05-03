import Image from "next/image";
import Arrow from "../public/images/icon-arrow.svg";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between">
      <header className="flex flex-col items-center justify-center gap-10 w-full pt-10 px-10 pb-40">
        <h1 className="font-bold text-white text-xl">IP Address Tracker</h1>
        <form className="grid grid-cols-10 justify-center">
          <input type="text" placeholder="Search for any IP address or domain" className="p-2 rounded-bl-lg rounded-tl-lg col-span-9" />
          <button className="flex items-center justify-center p-3 rounded-br-lg rounded-tr-lg bg-black text-white col-span-1">
            <Image src={Arrow} alt="Arrow" className="white-arrow-svg" />
          </button>
        </form>
      </header>
      <section className="relative flex items-center justify-center w-full">
        <div className="absolute text-center md:text-left top-100 bg-white p-10 rounded-lg flex flex-col items-center justify-center gap-4 md:flex-row">
          <div>
            <h2 className="uppercase text-xs">IP Address</h2>
            <p className="font-bold text-gray-900">192.212.174.101</p>
          </div>
          <div className="hidden md:flex md:bg-gray-300 md:h-20 md:w-0.5"></div>
          <div>
            <h2 className="uppercase text-xs">Location</h2>
            <p className="font-bold text-gray-900">Brooklyn, NY 10001</p>
          </div>
          <div className="hidden md:flex md:bg-gray-300 md:h-20 md:w-0.5"></div>
          <div>
            <h2 className="uppercase text-xs">Timezone</h2>
            <p className="font-bold text-gray-900">UTC -05:00</p>
          </div>
          <div className="hidden md:flex md:bg-gray-300 md:h-20 md:w-0.5"></div>
          <div>
            <h2 className="uppercase text-xs">ISP</h2>
            <p className="font-bold text-gray-900">SpaceX Starlink</p>
          </div>
        </div>
      </section>
    </main>
  );
}
