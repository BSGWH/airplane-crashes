'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { FlightCrash } from '@/data/crashes';

type Props = {
  crash: FlightCrash;
  isOpen: boolean;
};

export default function CrashPanel({ crash, isOpen }: Props) {
  const yearsSince = new Date().getFullYear() - new Date(crash.date).getFullYear();
  const images = crash.details.images ?? [];
  const [imageIndex, setImageIndex] = useState(0);

  return (
    <div
      className={`absolute top-0 right-0 h-full w-80 bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out z-10 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      {/* Image carousel */}
      <div className="relative w-full h-44 bg-gray-100 shrink-0">
        {images.length > 0 ? (
          <>
            <Image
              key={imageIndex}
              src={images[imageIndex]}
              alt={`${crash.details.aircraft} ${crash.details.registration} — ${imageIndex + 1}`}
              fill
              className="object-cover"
            />
            {images.length > 1 && (
              <>
                <button
                  onClick={() => setImageIndex((i) => (i - 1 + images.length) % images.length)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors text-sm"
                >
                  ‹
                </button>
                <button
                  onClick={() => setImageIndex((i) => (i + 1) % images.length)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors text-sm"
                >
                  ›
                </button>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setImageIndex(i)}
                      className={`w-1.5 h-1.5 rounded-full transition-colors ${i === imageIndex ? 'bg-white' : 'bg-white/40'}`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs tracking-wide uppercase">
            No image
          </div>
        )}
      </div>

      {/* Header */}
      <div className="px-6 pt-5 pb-4 border-b border-gray-100">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-1">
          {crash.airline}
        </p>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
          Flight {crash.flight}
        </h2>
        <div className="flex items-center gap-2 mt-1">
          <p className="text-sm text-gray-400">
            {new Date(crash.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          <span className="text-gray-200">·</span>
          <p className="text-sm text-gray-400">{yearsSince} years ago</p>
        </div>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-px bg-gray-100 border-b border-gray-100">
          <div className="bg-white px-4 py-3">
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">Reg.</p>
            <p className="text-sm font-semibold text-gray-800 font-mono">{crash.details.registration}</p>
          </div>
          <div className="bg-white px-4 py-3">
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">Aircraft age</p>
            <p className="text-sm font-semibold text-gray-800">{crash.details.aircraftAge} yrs</p>
          </div>
          <div className="bg-white px-4 py-3 col-span-2">
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">Aircraft</p>
            <p className="text-sm font-semibold text-gray-800">{crash.details.aircraft}</p>
          </div>
          <div className="bg-white px-4 py-3">
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">Occupants</p>
            <p className="text-sm font-semibold text-gray-800">{crash.details.passengers + crash.details.crew}</p>
          </div>
          <div className="bg-white px-4 py-3">
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">Fatalities</p>
            <p className="text-sm font-semibold text-red-600">{crash.details.fatalities}</p>
          </div>
          <div className="bg-white px-4 py-3">
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">Passengers</p>
            <p className="text-sm font-semibold text-gray-800">{crash.details.passengers}</p>
          </div>
          <div className="bg-white px-4 py-3">
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">Crew</p>
            <p className="text-sm font-semibold text-gray-800">{crash.details.crew}</p>
          </div>
        </div>

        {/* Text */}
        <div className="px-6 py-5 flex flex-col gap-5">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
              Summary
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">{crash.details.summary}</p>
          </div>

          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
              Cause
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">{crash.details.cause}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
