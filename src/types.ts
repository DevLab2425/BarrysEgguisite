export type Chicken = {
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