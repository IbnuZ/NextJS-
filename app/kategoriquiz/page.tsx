import Image from 'next/image'
import React from 'react'
import RectangleTask from '../components/rectangle/rectangleTask'
import RectangleQuiz from '../components/rectangle/rectangleQuiz'
import Link from 'next/link'


export default function KategoriQuiz() {
  return (
    <div className="h-screen overflow-hidden">
    <div style={{ backgroundColor: '#096a88', minHeight: '100vh' }}>
        <div className="py-20 bg-cover bg-center " style={{ backgroundImage: "url(/img/background.png)" }}>
    
        <div className=" relative flex justify-center mt-11">
          <RectangleQuiz/>
          <div className="absolute">
            <div className="font-extrabold my-8 relative flex justify-center text-[#096A88] " style={{ fontSize: '40px' }}>        
                Pilih Kategori Quiz 
            </div>
        
            <div className='mt-7 flex justify-between' >
                    <div className="mx-5" >
                    <Link href={'pilihquiz/1'}>
                    <div className="flex justify-center items-center">
                    <RectangleTask />
                    <div className='absolute flex justify-center'>
                        <Image
                          src="/img/icon/anime.png"
                          alt=""
                          width={100}
                          height={100}
                        />
                        </div>
                      </div>
                      </Link>
                      <div className="font-semibold mt-5 flex justify-center text-[#096A88]" style={{ fontSize: "25px"}}>
                        Anime
                      </div>
                    </div>
    
                    <div className="mx-5" >
                    <Link href={'pilihquiz/2'}>
                    <div className="flex justify-center items-center">
                    <RectangleTask />
                        <Image className='absolute flex justify-center'
                          src="/img/icon/bumi.png"
                          alt=""
                          width={180}
                          height={180}
                        />
                      </div>
                      </Link>
                      <div className="font-semibold mt-5 flex justify-center text-[#096A88]" style={{ fontSize: "25px"}}>
                        Umum
                      </div>
                    </div>
    
                    <div className="mx-5">
                    <Link href={'pilihquiz/3'}>
                    <div className="flex justify-center items-center">

                      <RectangleTask />
                        <Image
                          className='absolute flex justify-center'
                          src="/img/icon/buku.png"  
                          alt=""
                          width={100}
                          height={100}
                        />
                      </div>
                      </Link>

                         <div className="font-semibold mt-5 flex justify-center text-[#096A88]" style={{ fontSize: "25px"}}  >
                        Akademis
                      </div>
                      </div>
                      </div>
                      </div>
                      </div>
                      </div>
    
    
            <div className="flex justify-between">
        <Image
          src="/img/iklan.png"
          alt=""
          width={200}
          height={350}
          />
    
          <div>
          <Image
          src="/img/iklan2.png"
          alt=""
          width={200}
          height={300}
          />
          </div>
        </div> 
    
        </div>
        </div>
  )
}
