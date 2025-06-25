'use client';

import React, { useState } from 'react';

import chickens from '../data/chickens.json';
import Image from 'next/image';

const IMAGE_PATH_BASE = 'BarrysEgguisite/assets/images';

type Chicken = {
  id: string,
  name: string,
  breed: string,
  dob: string,
  coloring: string,
  images: string[],
  influence: string,
  promotionDate: string,
  layingDate: string
} & Record<string,string|string[]>

export default function Home() {
  const [activeChick, setActiveChick] = useState<Chicken>();

  function dateDiffInDays(a: Date, b: Date) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  
    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }

  function normalizeBioData(key: string, chick: Chicken) {
    const value = chick[key];

    const formatDate = (value:string) => new Date(value).toLocaleDateString( undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const capitalize = (value:string) => {
      if (typeof value === 'undefined') return '';
      const [first = '', ...rest] = value.split('');
      return `${first.toUpperCase()}${rest.join('')}`;
    }
      

    let normalizedKey = capitalize(key);
    let normalizedValue = value;

    switch (key) {
      case 'dob':
        normalizedKey = 'Born on';
        normalizedValue = formatDate(value as string);
        break;

      case 'layingDate':
      case 'promotionDate':
        const [dateType] = key.split('Date');
        normalizedKey = `${capitalize(dateType)} Date`

        const { dob, layingDate, promotionDate } = chick;

        const promotionAge = dateDiffInDays(new Date(dob), new Date(promotionDate));
        const layingAge = dateDiffInDays(new Date(dob), new Date(layingDate !== "TBD" ? layingDate : Date.now()));

        const age = key === 'layingDate' ? layingAge : promotionAge;

        normalizedValue =  `${(value === "TBD") ? value : formatDate(value as string)} (${age} days / ${Math.round(age/7)} weeks)`;
        break;

      default:
        break;
    }
    console.log({[normalizedKey]: normalizedValue})

    return {key: normalizedKey, value: normalizedValue }
  }

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
        <div className="showcase-head">
          <div>
            <button type="button" onClick={() => {
              document.getElementById("showcase")?.hidePopover();
            }}>X</button>
          </div>
        </div>
        <div className="showcase-banner">
          <div className="avatar">
            <Image src={`/${IMAGE_PATH_BASE}/${activeChick?.id}/${activeChick?.images?.[0]}.jpg`} width="200" height="200" alt={`Image of ${activeChick?.name}`} />
            <h2>{activeChick?.name}</h2>
          </div>
        </div>
        <div className="showcase-body">
          <dl>
            {activeChick && Object.keys(activeChick)
              .filter((key) => {
                const EXCLUDED_FIELDS = ['id', 'images', 'name'];
                return !EXCLUDED_FIELDS.includes(key);
              })
              .sort()
              .map((key, index) => {
                const {key: label, value } = normalizeBioData(key, activeChick);
                return (
                  <span key={index}>
                    <dt>{label}</dt>  
                    <dd>{value}</dd>
                  </span>
                )
              }
            )}
          </dl>
        </div>
        {activeChick?.images && <div>
          <h3>Additional Photos</h3>
          {activeChick?.images?.slice(1).map((img, index) => {
            return <Image key={index} src={`/${IMAGE_PATH_BASE}/${activeChick?.id}/${img}.jpg`} width="200" height="200" alt={`Image of ${activeChick?.name}`} />
          })}
        </div>}
      </div>
    </>
  );
}
