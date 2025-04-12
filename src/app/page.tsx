'use client';

import React, { useState } from 'react';

import chickens from '../data/chickens.json';
import Image from 'next/image';

type Chicken = {
  id: string,
  name: string,
  breed: string,
  dob: string,
  coloring: string,
  images: string[],
}

export default function Home() {
  const [activeChick, setActiveChick] = useState<Chicken>();

  return (
    <>
      <div className="showcase-wrapper">
        <ul className="showcase-items">
          {chickens.sort((a, b) => {
            return a.name < b.name ? -1 : 1
          }).map((chick: Chicken, index) => {
            console.log({chick})
            return (
              <li key={index} className="showcase-item">
                <button popoverTarget="showcase" popoverTargetAction="show" onClick={() => setActiveChick(chick)}>
                  <Image src={`/assets/images/${chick?.id}/${chick?.images?.[0]}.jpg`} width="200" height="200" alt={`Image of ${chick?.name}`} />
                  <span>{chick.name}</span>
                </button>  
              </li>
            )
          })}
        </ul>
      </div>
      <hr />
      <div id="showcase" popover='auto' className="showcase-stage">
        <div className="showcase-head">
          <h2>{activeChick?.name}</h2>
          <div>
            <button type="button" onClick={() => {
              console.log('closing?')
              document.getElementById("showcase")?.hidePopover();
            }}>X</button>
          </div>
        </div>
        <div className="showcase-body">
          <Image src={`/assets/images/${activeChick?.id}/${activeChick?.images?.[0]}.jpg`} width="200" height="200" alt={`Image of ${activeChick?.name}`} />
        </div>
        <div>
          <dl>
            {activeChick?.breed && 
            <>
              <dt>Breed</dt>
              <dd>{activeChick?.breed}</dd>
            </>}
            
            {activeChick?.dob && (
              <>
                <dt>Birthday (<em>approx.</em>)</dt>
                <dd>
                  {new Date(activeChick?.dob).toLocaleDateString( undefined, {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </dd>
              </>
            )}
            
            {activeChick?.coloring && (
              <>
                <dt>Coloring</dt>
                <dd>{activeChick?.coloring}</dd>
              </>
            )}
            
          </dl>
        </div>
        <div>
          <h3> Additional Photos</h3>
          {activeChick?.images?.slice(1).map((img, index) => {
            return <Image key={index} src={`/assets/images/${activeChick?.id}/${img}.jpg`} width="200" height="200" alt={`Image of ${activeChick?.name}`} />
          })}
        </div>
      </div>
    </>
  );
}
