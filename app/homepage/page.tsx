"use client"

import React from "react";
import Rectangle from "../components/rectangle/rectangle";
import Image from "next/image";
import Link from "next/link";
import { FacebookShareButton,WhatsappShareButton,FacebookIcon,WhatsappIcon } from "react-share";



export default function HomePage() {
  return (
    <div className="bg-center h-screen overflow-hidden" style={{ backgroundColor: "#096a88", minHeight: "100vh" }}>
      <div
        className="py-20 bg-cover "
        style={{ backgroundImage: "url('/img/background.png')" }}>


          
        <div className="mb-10 flex justify-center ">
          <Image src="/img/logo.png" alt="" width={300} height={150} />
        </div>
        <div className=" relative flex justify-center ">
          <Rectangle />
          <div className="absolute my-24">
            <Link href={"/kategoriquiz"}>
              <button className="font-bold mb-6 rounded-xl w-80 h-11 bg-blue hover:bg-orange-400 hover:text-gray-600 text-white" style = {{fontSize: '17px'}}>
                Mulai
              </button>
            </Link>
            <div className="absolute">
              <Link href={"/kategorileaderboard"}>
                <button className="font-bold mb-6 rounded-xl w-80 h-11 bg-blue hover:bg-orange-400 hover:text-slate-600 text-white " style = {{fontSize: '17px'}}>
                  Leaderboard
                </button>
              </Link>
              <div className="absolute ">
              <Link href={"/tentanggame"}>
                <button className="font-bold mb-6 rounded-xl w-80 h-11 bg-blue hover:bg-orange-400 hover:text-slate-600 text-white " style = {{fontSize: '17px'}}>
                  Tentang Game
                </button>
                </Link>

                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between ">
          <Image src="/img/iklan.png" alt="" width={180} height={300} />

          <div className="-top-[500px]">
            <Image
              className="items-center mb-56"
              src="/img/iklan2.png"
              alt=""
              width={180}
              height={300}
            />
            </div>
          </div>
        </div>
        </div>
  );
}
