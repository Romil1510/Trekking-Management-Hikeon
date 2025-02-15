import allTreks from './allTreks';

let trendingTrekIds = new Set();

export const getTrendingTreks = () => {
  // If no trending treks are set, initialize with 6 random treks
  if (trendingTrekIds.size === 0) {
    const trekIds = Object.keys(allTreks);
    const shuffled = trekIds.sort(() => 0.5 - Math.random());
    shuffled.slice(0, 6).forEach(id => trendingTrekIds.add(id));
  }
  return Array.from(trendingTrekIds).map(id => allTreks[id]);
};

export const getAllTreks = () => {
  return Object.values(allTreks);
};

export const getTrekById = (id) => {
  return allTreks[id] || null;
};

export const addTrek = (trek) => {
  allTreks[trek.id] = trek;
  // Automatically add new trek to trending
  trendingTrekIds.add(trek.id);
};

export const removeTrekFromTrending = (trekId) => {
  trendingTrekIds.delete(trekId);
};

export const addToTrending = (trekId) => {
  trendingTrekIds.add(trekId);
};