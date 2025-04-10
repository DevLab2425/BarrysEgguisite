
import chickens from '../../data/chickens.json';

function findChickByName(name) {
  return chickens.find((chick) => chick.name.toLowerCase() === name.toLowerCase());
}

export default async function ChickDetails({params}) {
  const {chick} = await params;
  const {name, coloring, dob, breed} = findChickByName(chick);
  console.log({name, coloring, dob, breed});
  
  return (
    <>
      <h2>
        {name}
      </h2>
      <dl>
        {breed && 
        <>
          <dt>Breed</dt>
          <dd>{breed}</dd>
        </>}
        
        {dob && (
          <>
            <dt>Birthday (<em>approx.</em>)</dt>
            <dd>
              {new Date(dob).toLocaleDateString( undefined, {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </dd>
          </>
        )}
        
        {coloring && (
          <>
            <dt>Coloring</dt>
            <dd>{coloring}</dd>
          </>
        )}
        
      </dl>
    </>
  );
}
