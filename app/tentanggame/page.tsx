import Link from 'next/link';
import React from 'react';

export default function TentangGame() {
  return (
    <div className="bg-center " style={{ backgroundColor: "#096a88", minHeight: "100vh" }}>
      <div className="py-20 bg-cover" style={{ backgroundImage: "url('/img/background.png')" }}>


        <div className="bg-096A88 bg-opacity-90 p-8 rounded-lg text-096A88">
          <h1 className="text-3xl font-bold mb-4">BarnyFun - Platform Quiz</h1>

          <p className="text-096A88 mb-4">
            BarnyFun adalah sebuah platform hiburan daring yang dirancang untuk memberikan pengalaman bermain yang seru dan interaktif. Platform ini berbentuk Quiz dan memungkinkan pemain untuk bersaing dengan teman-teman mereka.
          </p>

          <p className="text-096A88 mb-6">
            Bergabunglah dalam berbagai kategori quiz dan uji pengetahuan Anda dalam waktu yang terbatas. Raih poin tertinggi dan rebut gelar juara!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left text-white mb-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Kategori Quiz:</h2>
              <ul className="list-disc ml-6">
                <li>Naruto</li>
                <li>Kimetsu no Yaiba</li>
                <li>Jujutsu Kaisen</li>
                <li>Hari-hari Penting Nasional</li>
                <li>Tokoh-tokoh Umum</li>
                <li>Letak Geografi</li>
                <li>Ilmu Pengetahuan Alam</li>
                <li>Matematika</li>
                <li>Bahasa Indonesia </li>
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Waktu Quiz:</h2>
              <div>
                <p>Quiz Anime: 30 detik</p>
                <p>Quiz Umum: 45 detik</p>
                <p>Quiz Akademis: 1 Menit</p>
              </div>
            </div>
          </div>

          <p className="text-xl font-bold mb-2">Total Quiz: 10</p>
          <p className="text-xl font-bold mb-2">Point per Soal Quiz: 10</p>
          <p className="text-xl font-bold">Tujuan Menang: Meraih poin paling besar dengan waktu yang singkat</p>
          <Link href="/homepage" className="block mt-4 text-[#fffff] hover:text-[#FF9C41] font-bold">
          Kembali
        </Link>
        </div>
        
      </div>
     
    </div>
  );
}
