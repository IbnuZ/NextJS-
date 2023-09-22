import Image from "next/image";
import React, { useEffect } from "react";
import RectangleQuiz from "../../components/rectangle/rectangleQuiz";
import RectangleTask from "../../components/rectangle/rectangleTask";
import Link from "next/link";


async function getData(id: string) {
  const res = await fetch(`https://ibnu.posei.me/api/quizCategory/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function PilihQuiz({
  params,
}: {
  params: { id: string };
}) {
  const data: [] = await getData(params.id);
  console.log(data);
  return (
    <div className=" h-screen overflow-hidden">
      <div style={{ backgroundColor: "#096a88", minHeight: "100vh" }}>
        <div
          className="py-20 bg-cover bg-center"
          style={{ backgroundImage: "url(/img/background.png)" }}
        >

          <div className=" relative flex justify-center mt-11">
            <RectangleQuiz />
            <div className="absolute">
              <div
                className="font-extrabold my-8 relative flex justify-center text-[#096A88] "
                style={{ fontSize: "40px" }}
              >
                Pilih Quiz
              </div>

              <div className="mt-7 flex justify-between">
                {data.map((item: any) => (
                  <div className="mx-5" key={item.id}>
                    <Link href={`/soalquiz/${item.id}`}>
                      <div className="relative flex justify-center items-center">
                        <RectangleTask />
                        <Image
                          className="absolute flex justify-center"
                          src="/img/icon/quiz.png"
                          alt=""
                          width={100}
                          height={100}
                        />
                      </div>
                    </Link>

                    <div
                      className="w-52 mx-auto font-semibold mt-5 flex justify-center text-center text-[#096A88]"
                      style={{ fontSize: "25px" }}
                    >
                      {item.name}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mb-6 flex justify-center">
            <Link href={"/kategoriquiz"}>
              <button className="font-semibold flex justify-center items-center text-[#FF9C41]" style={{ fontSize: "25px" }}>
                Kembali 
              </button>
            </Link>
          </div>
            </div>
           
          </div>

        
        </div>

        <div className="flex justify-between">
          <Image src="/img/iklan.png" alt="" width={200} height={350} />

          <div>
            <Image src="/img/iklan2.png" alt="" width={200} height={300} />
          </div>
        </div>
      </div>
    </div>
  );
}
