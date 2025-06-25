'use client';

import React from 'react';
import Image from 'next/image';

import type { Chicken } from '@/types';
import { ChickDataList } from './ChickDataList';

const IMAGE_PATH_BASE = 'BarrysEgguisite/assets/images';

export const ChickShowcase = ({chick}: {chick: Chicken | undefined}) => {
  const { id, images, name } = chick || {} ;
  const [headshot] = images || [];

  console.log(`/${IMAGE_PATH_BASE}/${id}/${headshot}.jpg`);
  
  return (
    <div className='chicken-showcase-wrapper'>
      <div className="showcase-head">
          <div>
            <button type="button" onClick={() => {
              document.getElementById("showcase")?.hidePopover();
            }}>X</button>
          </div>
        </div>

        <div className="showcase-banner">
          <div className="avatar">
            <Image src={`/${IMAGE_PATH_BASE}/${id}/${headshot}.jpg`} width="200" height="200" alt={`Image of ${name}`} />
            <h2>{chick?.name}</h2>
          </div>
        </div>

        <div className="showcase-body">
          <ChickDataList chick={chick} />
        </div>
    </div>
  )
}