import allTreks from "./allTreks"

const recentTrekIds = ["Roopkund Trek", "Har Ki Dun Trek","Tarsar Marsar Trek","Valley of Flowers Trek","Hampta Pass Trek","Triund Trek","Pangarchulla trek","Kudermukh Trek"]

export const getRecentTreks = () => {
  return recentTrekIds.map((id) => allTreks[id])
}

