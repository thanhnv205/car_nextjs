import { CarProps, FilterProps } from "@/types";

export async function fetchCars(filters: FilterProps) {
  const { search, year, model, limit, fuel } = filters;
  const headers = {
    "X-RapidAPI-Key": '220328480fmshf122cfb422d6622p1d0dcdjsne91414a6a9b9',
    "X-RapidAPI-Host": 'cars-by-api-ninjas.p.rapidapi.com'
  };

  const response = await fetch(
    `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${search}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`, { headers }
  );

  // Parse the response as JSON
  const result = await response.json();

  return result;
}


export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50;  // giá thuê xe mỗi ngày
  const mileageFactor = 0.1;   // tỉ lệ bổ sung mỗi km
  const ageFactor = 0.05;      // tỉ lệ bổ sung mỗi năm

  // tỉ lệ bổ sung dựa trên km && năm sử dụng
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor

  // tổng giá thuê xe mỗi ngày
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate

  return rentalRatePerDay.toFixed(0);
}

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
  const url = new URL('https://cdn.imagin.studio/getimage')

  const { make, year, model } = car

  url.searchParams.append('customer', 'hrjavascript-mastery')
  url.searchParams.append('make', make);
  url.searchParams.append('modelFamily', model.split(' ')[0]);
  url.searchParams.append('zoomType', 'fullscreen');
  url.searchParams.append('modelYear', `${year}`);
  url.searchParams.append('angle', `${angle}`);

  return `${url}`
}


export const updateSearchParams = (type: string, value: string) => {
  const searchParams = new URLSearchParams(window.location.search)
  searchParams.set(type, value)
  const newPathname = `${window.location.pathname}?${searchParams.toString()}`

  return newPathname
}