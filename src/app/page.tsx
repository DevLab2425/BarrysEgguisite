'use client';

import React, { useState } from 'react';
import Image from 'next/image';

import chickens from '../data/chickens.json';
import type { Chicken } from '@/types';

import { ChickShowcase } from './components/ChickShowcase';

const IMAGE_PATH_BASE = 'BarrysEgguisite/assets/images';

export default function Home() {
  const [activeChick, setActiveChick] = useState<Chicken>();

  return (
    <>
      <div className="showcase-wrapper">
        <ul className="showcase-items">
          {chickens.sort((a, b) => {
            return a.name < b.name ? -1 : 1
          }).map((chick: Chicken, index) => {
            return (
              <li key={index} className="showcase-item">
                <button popoverTarget="showcase" popoverTargetAction="show" onClick={() => setActiveChick(chick)} className='modal-trigger'>
                  <div className="profile-image">  
                    <Image src={`/${IMAGE_PATH_BASE}/${chick?.id}/${chick?.images?.[0]}.jpg`} width="200" height="200" alt={`Image of ${chick?.name}`} />
                    <span>{chick.name}</span>
                  </div>
                </button>  
              </li>
            )
          })}
        </ul>
      </div>
      <hr />
      <div id="showcase" popover='auto' className="showcase-stage">
        <ChickShowcase chick={activeChick}/>
        
        {activeChick?.images && <div>
          <h3>Additional Photos</h3>
          {activeChick?.images?.slice(1).map((img, index) => {
            return <Image  key={index} src={`/${IMAGE_PATH_BASE}/${activeChick?.id}/${img}.jpg`} width="200" height="200" alt={`Image of ${activeChick?.name}`} />
          })}
        </div>}
      </div>
    </>
  );
}
