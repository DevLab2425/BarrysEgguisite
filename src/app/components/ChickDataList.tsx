import React from 'react';

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

export const ChickDataList = ({chick}: {chick: Chicken}) => {
  return (
    <dl className="chick-data-list-wrapper">
      {chick && Object.keys(chick)
              .filter((key) => {
                const EXCLUDED_FIELDS = ['id', 'images', 'name'];
                return !EXCLUDED_FIELDS.includes(key);
              })
              .sort()
              .map((key, index) => {
                const {key: label, value } = normalizeBioData(key, chick);
                return (
                  <span key={index}>
                    <dt>{label}</dt>  
                    <dd>{value}</dd>
                  </span>
                )
              }
            )}
    </dl>
  )
}