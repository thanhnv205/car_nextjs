'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import SearchList from "./SearchList";


const SearchButton = ({ otherClasses }: { otherClasses: string }) => (
  <button type="submit" className={`-ml-3 z-10 ${otherClasses}`}>
    <Image
      src='/magnifying-glass.svg'
      alt='maginfyting'
      width={40}
      height={40}
      className="object-contain"
    />
  </button>
)

const SearchBar = ({ setSearch, setModel }) => {
  const [searchs, setSearchs] = useState('');
  const [models, setModels] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchs === '' && models === '') {
      return alert('Please fill in the search bar')
    }
    setModel(models);
    setSearch(searchs)
  }

  return (
    <form className="searchbar" onSubmit={handleSearch}>
      <div className="searchbar__item">
        <SearchList
          selected={searchs}
          setSelected={setSearchs}
        />

        <SearchButton otherClasses="sm:hidden" />
      </div>

      <div className="searchbar__item">
        <Image
          src='/model-icon.png'
          width={25}
          height={25}
          className="absolute w-[20px] h-[20px] ml-4"
          alt="model icon"
        />
        <input
          type="text"
          name="model"
          value={models}
          onChange={({ target: { value } }) => setModels(value)}
          placeholder="Search Model..."
          className="searchbar__input"
        />
        <SearchButton otherClasses="sm:hidden" />
      </div>
      <SearchButton otherClasses="max-sm:hidden" />
    </form>
  )
}

export default SearchBar