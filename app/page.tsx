'use client';
import { useEffect, useState } from 'react';
import { CarCard, CustomFilter, Hero, SearchBar, ShowMore } from '@/components'
import Image from 'next/image'
import { fetchCars } from '@/utils'
import { fuels, yearsOfProduction } from '@/constants';

export default function Home() {

  const [allCars, setAllCars] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState('Lamborghini');
  const [model, setModel] = useState('');
  const [fuel, setFuel] = useState('');
  const [year, setYear] = useState(2022);
  const [limit, setLimit] = useState(9);

  const getCars = async () => {
    setLoading(true)
    try {
      const rusult = await fetchCars({
        search: search,
        year: year,
        fuel: fuel,
        limit: limit,
        model: model,
      });

      setAllCars(rusult)
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getCars()
  }, [search, model, fuel, year, limit])

  return (
    <main className="overflow-hidden">
      <Hero />

      <div className="mt-12 padding-x padding-y max-width" id='discover'>
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>

        <div className="home__filters">
          <SearchBar setSearch={setSearch} setModel={setModel} />

          <div className="home__filter-container">
            <CustomFilter
              title='fuel'
              options={fuels}
              setFilter={setFuel}
            />
            <CustomFilter
              title='year'
              options={yearsOfProduction}
              setFilter={setYear}
            />
          </div>
        </div>

        {allCars.length > 0 ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars?.map((car, index) => (
                <CarCard key={index} car={car} />
              ))}
            </div>

            {loading && (
              <div className="mt-6 w-full flex-center">
                <Image
                  src='/logo.svg'
                  alt='Loader'
                  width={50}
                  height={50}
                  className='object-contain'
                />
              </div>
            )}

            <ShowMore
              pageNumber={limit / 9}
              isNext={limit >= allCars.length}
              setLimit={setLimit}
            />
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">Oops, no result</h2>
            {/* <p>{allCars?.massage}</p> */}
          </div>
        )}

      </div>
    </main>
  )
}
