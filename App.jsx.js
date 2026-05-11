import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';

const INSTAGRAM_URL = "https://www.instagram.com/shoot_with_anand?igsh=MTBtY2w2bTByMmF5bg==";
const CONTACT_EMAIL = "shootwithanands@gmail.com";

const MenuIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>;
const XIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>;
const ChevronRightIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>;
const ChevronLeftIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>;
const InstagramIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>;
const MailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/><rect width="20" height="16" x="2" y="4" rx="2"/></svg>;
const AwardIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>;

const categories = [
  { id: 'portrait', title: 'Portrait Art', image: 'https://i.ibb.co/d4y8VGs6/IMG-8029.jpg' },
  { id: 'female', title: 'Female Photoshoot', image: 'https://i.ibb.co/BHq5vffp/IMG-0253.jpg' },
  { id: 'male', title: 'Male Photoshoot', image: 'https://i.ibb.co/zjJNdJy/JPGE.jpg' },
  { id: 'child', title: 'Child Photoshoot', image: 'https://i.ibb.co/xtMs9T8V/IMG-8355.jpg' },
  { id: 'wildlife', title: 'Wildlife Visuals', image: 'https://i.ibb.co/jPtxF1NT/IMG-20260302-021923-jpg.jpg' },
  { id: 'night', title: 'Night Light Frames', image: 'https://i.ibb.co/84zRVm4x/MG-2649.jpg' },
  { id: 'walks', title: 'Visual Walks', image: 'https://i.ibb.co/VW6JBBX3/IMG-8456.jpg' },
  { id: 'food', title: 'Food', image: 'https://i.ibb.co/Q3sQxNLk/DSC-0329.jpg' },
  { id: 'fruit', title: 'Fruit & Vegetable', image: 'https://i.ibb.co/vx3jrzVB/DSC-0158.jpg' },
  { id: 'macro', title: 'Macro World', image: 'https://i.ibb.co/chVYxT6s/IMG-8572.jpg' }, 
  { id: 'drops', title: 'Milk & Water Drops', image: 'https://i.ibb.co/6RjGzZ3T/MG-9493.jpg' }
];

const galleryImagesData = {
  portrait: [{ id: 0, url: 'https://i.ibb.co/d4y8VGs6/IMG-8029.jpg' }, { id: 1, url: 'https://i.ibb.co/1JnycLyf/IMG-8461.jpg' }],
  male: [{ id: 8, url: 'https://i.ibb.co/zjJNdJy/JPGE.jpg' }],
  female: [{ id: 0, url: 'https://i.ibb.co/BHq5vffp/IMG-0253.jpg' }],
  child: [{ id: 3, url: 'https://i.ibb.co/xtMs9T8V/IMG-8355.jpg' }],
  wildlife: [{ id: 1, url: 'https://i.ibb.co/hRRpMJrd/IMG-20260302-023048-jpg.jpg' }],
  night: [{ id: 3, url: 'https://i.ibb.co/84zRVm4x/MG-2649.jpg' }],
  walks: [{ id: 1, url: 'https://i.ibb.co/VW6JBBX3/IMG-8456.jpg' }],
  food: [{ id: 1, url: 'https://i.ibb.co/Q3sQxNLk/DSC-0329.jpg' }],
  fruit: [{ id: 1, url: 'https://i.ibb.co/vx3jrzVB/DSC-0158.jpg' }],
  macro: [{ id: 1, url: 'https://i.ibb.co/chVYxT6s/IMG-8572.jpg' }],
  drops: [{ id: 3, url: 'https://i.ibb.co/6RjGzZ3T/MG-9493.jpg' }]
};

const Lightbox = ({ imageUrl, onClose }) => {
  if (!imageUrl) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md" onClick={onClose}>
      <button className="absolute top-6 right-6 text-white" onClick={onClose}><XIcon /></button>
      <img src={imageUrl} alt="Preview" className="max-h-[90vh] max-w-[95vw] object-contain rounded-lg" />
    </div>
  );
};

const Logo = () => (
  <div className="flex items-center gap-3">
    <img src="https://i.ibb.co/KcnNh2zG/DD.jpg" alt="Logo" className="w-10 h-10 rounded-full border border-yellow-500" />
    <span className="text-white font-serif text-lg">Shoot with Anand</span>
  </div>
);

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [activeCategory, setActiveCategory] = useState(null);
  const [selectedImg, setSelectedImg] = useState(null);

  const navigateTo = (page, cat = null) => {
    setCurrentPage(page);
    setActiveCategory(cat);
    window.scrollTo(0, 0);
  };

  return (
    <div className="bg-neutral-950 min-h-screen text-neutral-200">
      <nav className="fixed top-0 w-full z-50 bg-neutral-950/80 backdrop-blur-md py-4 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div onClick={() => navigateTo('home')} className="cursor-pointer"><Logo /></div>
          <div className="flex gap-6 text-xs uppercase tracking-widest">
            {['home', 'about', 'contact'].map(p => (
              <button key={p} onClick={() => navigateTo(p)} className={currentPage === p ? 'text-yellow-500' : 'text-neutral-400'}>{p}</button>
            ))}
          </div>
        </div>
      </nav>

      <main className="pt-24">
        {currentPage === 'home' && (
          <div className="px-4 max-w-7xl mx-auto">
            <h1 className="text-5xl font-serif text-center mb-12">Portfolio</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {categories.map(cat => (
                <div key={cat.id} onClick={() => navigateTo('gallery', cat.id)} className="cursor-pointer group relative rounded-xl overflow-hidden aspect-[4/5]">
                  <img src={cat.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <div className="absolute inset-0 bg-black/40 flex items-end p-6">
                    <h3 className="text-xl font-serif">{cat.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentPage === 'gallery' && (
          <div className="px-4 max-w-7xl mx-auto">
            <button onClick={() => navigateTo('home')} className="mb-6 text-neutral-400 flex items-center"><ChevronLeftIcon /> Back</button>
            <h2 className="text-4xl font-serif mb-8">{categories.find(c => c.id === activeCategory)?.title}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {galleryImagesData[activeCategory]?.map((img, i) => (
                <img key={i} src={img.url} className="rounded-lg cursor-pointer" onClick={() => setSelectedImg(img.url)} />
              ))}
            </div>
          </div>
        )}

        {currentPage === 'about' && (
          <div className="max-w-4xl mx-auto px-4 text-center">
            <img src="https://i.ibb.co/zjJNdJy/JPGE.jpg" className="w-48 h-48 rounded-full mx-auto mb-8 object-cover border-2 border-yellow-500" />
            <h2 className="text-4xl font-serif mb-4 text-white">Deepanshu Anand</h2>
            <p className="text-neutral-400 leading-relaxed text-lg">Visual storyteller capturing emotions through every frame. Specializing in portrait and lifestyle photography.</p>
          </div>
        )}

        {currentPage === 'contact' && (
          <div className="text-center px-4">
            <h2 className="text-4xl font-serif mb-4">Let's Connect</h2>
            <p className="mb-8 text-neutral-400">Email me for bookings or collaborations</p>
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-2xl text-yellow-500 underline">{CONTACT_EMAIL}</a>
          </div>
        )}
      </main>

      <footer className="mt-20 py-10 text-center border-t border-white/5 text-[10px] uppercase tracking-widest text-neutral-600">
        © {new Date().getFullYear()} Shoot with Anand
      </footer>
      <Lightbox imageUrl={selectedImg} onClose={() => setSelectedImg(null)} />
    </div>
  );
}

// Render logic for Vercel
if (typeof document !== 'undefined') {
  const container = document.getElementById('root');
  if (container) {
    const root = createRoot(container);
    root.render(<App />);
  }
}