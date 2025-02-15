import Agasthyakoodam from './Agasthyakoodam.jpg'
import Beaskund from './Beaskund.jpg'
import Chembra from './Chembrapeak.jpg'
import Harkidun from './Harkidun.jpg'
import Himptapass from './Himptapass.jpg'
import Horsleyhills from './Horsleyhills.jpg'
import Kudermukh from './Kudremukh.jpg'
import Meesapulimala from './Meesapulimala.jpg'
import Nandihill from './Nandihills.jpg'
import pangarchulla from './pangarchulla.jpg'
import roopkund from './Roopkund.jpg'
import tarsarmarsar from './tarsarmarsar.jpg'
import Tripund from './Tripund.jpg'
import Valley from './Valley.jpg'
import Yelagirihills from './Yelagirihills.jpg'
export const treks = {
  "Pangarchulla trek": {
    id: "Pangarchulla trek",
    name:"Pangarchulla trek",
    location:"Uttarakhand",
    image:pangarchulla,

    description: "Experience the majesty of the world's highest peak",
    duration: "14 days",
    difficulty: "Challenging",
    groupSize: "10-12",
    price: 250000,
    altitude: "5,364 m (17,598 ft)",
    bestSeason: "March-May, September-November",
    trendingStartDate: "2023-01-01",
    packingList: [
      "Warm, layered clothing",
      "Sturdy hiking boots",
      "Sleeping bag (rated for low temperatures)",
      "Daypack",
      "Water purification system",
      "Sunglasses and sunscreen",
      "Trekking poles",
      "First-aid kit",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Kathmandu",
        description: "Welcome to Nepal! Transfer to your hotel and attend trek briefing.",
      },
      {
        day: 2,
        title: "Fly to Lukla and Trek to Phakding",
        description: "Scenic flight to Lukla (2,800m) and trek to Phakding (2,652m).",
      },
      {
        day: 3,
        title: "Trek to Namche Bazaar",
        description: "Hike through pine forests to reach Namche Bazaar (3,440m).",
      },
      // Add more days as needed
    ],
  },
  
  
  "Triund Trek": {
    id: "Triund Trek",
    name:"Triund Trek",
          location: "Himachal Pradesh",
          image:Tripund,
                description: "Journey through the ancient Inca civilization",
    duration: "4 days",
    difficulty: "Moderate",
    groupSize: "8-16",
    price: 180000,
    altitude: "4,215 m (13,828 ft)",
    bestSeason: "May-September",
    trendingStartDate: "2023-01-11",
    packingList: [
      "Comfortable hiking shoes",
      "Rain gear",
      "Warm layers",
      "Insect repellent",
      "Sun protection",
      "Reusable water bottle",
      "Snacks",
      "Camera",
    ],
    itinerary: [
      {
        day: 1,
        title: "Cusco to Wayllabamba",
        description: "Begin the trek from Km 82 to Wayllabamba camp (3,000m).",
      },
      {
        day: 2,
        title: "Wayllabamba to Pacaymayo",
        description: "Challenging ascent to Dead Woman's Pass (4,215m) and descent to Pacaymayo camp.",
      },
      {
        day: 3,
        title: "Pacaymayo to Wiñay Wayna",
        description: "Visit ruins of Runkurakay, Sayacmarca, and arrive at Wiñay Wayna camp.",
      },
      {
        day: 4,
        title: "Wiñay Wayna to Machu Picchu",
        description: "Early start to reach Sun Gate and explore Machu Picchu.",
      },
    ],
  },
  "Hampta Pass Trek": {
    id: "Hampta Pass Trek",
    name: "Hampta Pass Trek",
    location: "Himachal Pradesh",
    image:Himptapass,     
     description: "Conquer Africa's highest peak",
    duration: "7 days",
    difficulty: "Challenging",
    groupSize: "8-10",
    price: 300000,
    altitude: "5,895 m (19,341 ft)",
    bestSeason: "January-March, June-October",
    trendingStartDate: "2023-01-21",
    packingList: [
      "Thermal underwear",
      "Fleece jacket",
      "Waterproof outer layers",
      "Hiking boots",
      "Sleeping bag",
      "Headlamp",
      "Gloves and warm hat",
      "Altitude sickness medication",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival at Kilimanjaro Airport",
        description: "Transfer to your hotel in Moshi for trek briefing and equipment check.",
      },
      {
        day: 2,
        title: "Machame Gate to Machame Camp",
        description: "Begin the ascent through the lush rainforest to Machame Camp (3,010m).",
      },
      {
        day: 3,
        title: "Machame Camp to Shira Camp",
        description: "Trek across the Shira Plateau with views of Kibo Peak (3,840m).",
      },
      // Add more days as needed
    ],
  },
  "Valley of Flowers Trek": {
    id: "Valley of Flowers Trek",
    name: "Valley of Flowers Trek",
    location: "Uttarakhand",
    image:Valley,
          description: "Journey through the ancient Inca civilization",
    duration: "4 days",
    difficulty: "Moderate",
    groupSize: "8-16",
    price: 180000,
    altitude: "4,215 m (13,828 ft)",
    bestSeason: "May-September",
    trendingStartDate: "2023-01-11",
    packingList: [
      "Comfortable hiking shoes",
      "Rain gear",
      "Warm layers",
      "Insect repellent",
      "Sun protection",
      "Reusable water bottle",
      "Snacks",
      "Camera",
    ],
    itinerary: [
      {
        day: 1,
        title: "Cusco to Wayllabamba",
        description: "Begin the trek from Km 82 to Wayllabamba camp (3,000m).",
      },
      {
        day: 2,
        title: "Wayllabamba to Pacaymayo",
        description: "Challenging ascent to Dead Woman's Pass (4,215m) and descent to Pacaymayo camp.",
      },
      {
        day: 3,
        title: "Pacaymayo to Wiñay Wayna",
        description: "Visit ruins of Runkurakay, Sayacmarca, and arrive at Wiñay Wayna camp.",
      },
      {
        day: 4,
        title: "Wiñay Wayna to Machu Picchu",
        description: "Early start to reach Sun Gate and explore Machu Picchu.",
      },
    ],
  },
  "Beas Kund Trek": {
    id: "Beas Kund Trek",
    name: "Beas Kund Trek",
    location: "Uttarakhand",
    image:Beaskund,
          description: "Conquer Africa's highest peak",
    duration: "7 days",
    difficulty: "Challenging",
    groupSize: "8-10",
    price: 300000,
    altitude: "5,895 m (19,341 ft)",
    bestSeason: "January-March, June-October",
    trendingStartDate: "2023-01-21",
    packingList: [
      "Thermal underwear",
      "Fleece jacket",
      "Waterproof outer layers",
      "Hiking boots",
      "Sleeping bag",
      "Headlamp",
      "Gloves and warm hat",
      "Altitude sickness medication",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival at Kilimanjaro Airport",
        description: "Transfer to your hotel in Moshi for trek briefing and equipment check.",
      },
      {
        day: 2,
        title: "Machame Gate to Machame Camp",
        description: "Begin the ascent through the lush rainforest to Machame Camp (3,010m).",
      },
      {
        day: 3,
        title: "Machame Camp to Shira Camp",
        description: "Trek across the Shira Plateau with views of Kibo Peak (3,840m).",
      },
      // Add more days as needed
    ],
  },
  "Roopkund Trek": {
    id: "Roopkund Trek",
    name: "Roopkund Trek",
    location: "Uttarakhand",
    image:roopkund,      description: "Journey through the ancient Inca civilization",
    duration: "4 days",
    difficulty: "Moderate",
    groupSize: "8-16",
    price: 180000,
    altitude: "4,215 m (13,828 ft)",
    bestSeason: "May-September",
    trendingStartDate: "2023-01-11",
    packingList: [
      "Comfortable hiking shoes",
      "Rain gear",
      "Warm layers",
      "Insect repellent",
      "Sun protection",
      "Reusable water bottle",
      "Snacks",
      "Camera",
    ],
    itinerary: [
      {
        day: 1,
        title: "Cusco to Wayllabamba",
        description: "Begin the trek from Km 82 to Wayllabamba camp (3,000m).",
      },
      {
        day: 2,
        title: "Wayllabamba to Pacaymayo",
        description: "Challenging ascent to Dead Woman's Pass (4,215m) and descent to Pacaymayo camp.",
      },
      {
        day: 3,
        title: "Pacaymayo to Wiñay Wayna",
        description: "Visit ruins of Runkurakay, Sayacmarca, and arrive at Wiñay Wayna camp.",
      },
      {
        day: 4,
        title: "Wiñay Wayna to Machu Picchu",
        description: "Early start to reach Sun Gate and explore Machu Picchu.",
      },
    ],
  },
  "Har Ki Dun Trek": {
    id: "Har Ki Dun Trek",
    name: "Har Ki Dun Trek",
    location:"Uttarakhand",
    image:Harkidun,
    description: "Conquer Africa's highest peak",
    duration: "7 days",
    difficulty: "Challenging",
    groupSize: "8-10",
    price: 300000,
    altitude: "5,895 m (19,341 ft)",
    bestSeason: "January-March, June-October",
    trendingStartDate: "2023-01-21",
    packingList: [
      "Thermal underwear",
      "Fleece jacket",
      "Waterproof outer layers",
      "Hiking boots",
      "Sleeping bag",
      "Headlamp",
      "Gloves and warm hat",
      "Altitude sickness medication",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival at Kilimanjaro Airport",
        description: "Transfer to your hotel in Moshi for trek briefing and equipment check.",
      },
      {
        day: 2,
        title: "Machame Gate to Machame Camp",
        description: "Begin the ascent through the lush rainforest to Machame Camp (3,010m).",
      },
      {
        day: 3,
        title: "Machame Camp to Shira Camp",
        description: "Trek across the Shira Plateau with views of Kibo Peak (3,840m).",
      },
      // Add more days as needed
    ],
  },
  "Tarsar Marsar Trek": {
    id: "Tarsar Marsar Trek",
    name: "Tarsar Marsar Trek",
    location: "Uttarakhand",
    image:tarsarmarsar,
          description: "Journey through the ancient Inca civilization",
    duration: "4 days",
    difficulty: "Moderate",
    groupSize: "8-16",
    price: 180000,
    altitude: "4,215 m (13,828 ft)",
    bestSeason: "May-September",
    trendingStartDate: "2023-01-11",
    packingList: [
      "Comfortable hiking shoes",
      "Rain gear",
      "Warm layers",
      "Insect repellent",
      "Sun protection",
      "Reusable water bottle",
      "Snacks",
      "Camera",
    ],
    itinerary: [
      {
        day: 1,
        title: "Cusco to Wayllabamba",
        description: "Begin the trek from Km 82 to Wayllabamba camp (3,000m).",
      },
      {
        day: 2,
        title: "Wayllabamba to Pacaymayo",
        description: "Challenging ascent to Dead Woman's Pass (4,215m) and descent to Pacaymayo camp.",
      },
      {
        day: 3,
        title: "Pacaymayo to Wiñay Wayna",
        description: "Visit ruins of Runkurakay, Sayacmarca, and arrive at Wiñay Wayna camp.",
      },
      {
        day: 4,
        title: "Wiñay Wayna to Machu Picchu",
        description: "Early start to reach Sun Gate and explore Machu Picchu.",
      },
    ],
  },
  "Kudermukh Trek": {
    id: "Kudermukh Trek",
    name: "Kudermukh Trek",
    location: "Karnataka",
    image:Kudermukh,
    description: "Conquer Africa's highest peak",
    duration: "7 days",
    difficulty: "Challenging",
    groupSize: "8-10",
    price: 300000,
    altitude: "5,895 m (19,341 ft)",
    bestSeason: "January-March, June-October",
    trendingStartDate: "2023-01-21",
    packingList: [
      "Thermal underwear",
      "Fleece jacket",
      "Waterproof outer layers",
      "Hiking boots",
      "Sleeping bag",
      "Headlamp",
      "Gloves and warm hat",
      "Altitude sickness medication",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival at Kilimanjaro Airport",
        description: "Transfer to your hotel in Moshi for trek briefing and equipment check.",
      },
      {
        day: 2,
        title: "Machame Gate to Machame Camp",
        description: "Begin the ascent through the lush rainforest to Machame Camp (3,010m).",
      },
      {
        day: 3,
        title: "Machame Camp to Shira Camp",
        description: "Trek across the Shira Plateau with views of Kibo Peak (3,840m).",
      },
      // Add more days as needed
    ],
  },
  "Nandi Hills Trek": {
    id: "Nandi Hills Trek",
    name: "Nandi Hills Trek",
    location: "Karnataka",
    image:Nandihill,
    description: "Trek through diverse landscapes in the Himalayas",
    duration: "18 days",
    difficulty: "Challenging",
    groupSize: "8-14",
    price: 280000,
    altitude: "5,416 m (17,769 ft)",
    bestSeason: "March-May, September-November",
    trendingStartDate: "2023-01-31",
    packingList: [
      "Layered clothing",
      "Trekking boots",
      "Sleeping bag",
      "Water purification tablets",
      "Trekking poles",
      "Sun protection",
      "First-aid kit",
      "Camera",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Kathmandu",
        description: "Welcome to Nepal! Transfer to your hotel and attend trek briefing.",
      },
      {
        day: 2,
        title: "Drive to Besisahar and Trek to Bhulbhule",
        description: "Begin the trek along the Marsyangdi River to Bhulbhule (840m).",
      },
      {
        day: 3,
        title: "Trek to Jagat",
        description: "Hike through rice terraces and waterfalls to reach Jagat (1,300m).",
      },
      // Add more days as needed
    ],
  },
  "Chembra Peak Trek": {
    id: "Chembra Peak Trek",
    name: "Chembra Peak Trek",
    location: "Kerala",
    image:Chembra,
          description: "Explore the stunning landscapes of Patagonia",
    duration: "5 days",
    difficulty: "Moderate",
    groupSize: "6-12",
    price: 200000,
    altitude: "1,100 m (3,609 ft)",
    bestSeason: "December-February",
    trendingStartDate: "2023-02-10",
    packingList: [
      "Waterproof jacket and pants",
      "Hiking boots",
      "Warm layers",
      "Gloves and hat",
      "Sunglasses",
      "Camping gear",
      "Water bottle",
      "Camera",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival and Trek to Refugio Las Torres",
        description: "Begin the W Trek with a hike to the base of the Torres del Paine.",
      },
      {
        day: 2,
        title: "Trek to Los Cuernos",
        description: "Hike along Lake Nordenskjöld with views of the Cuernos del Paine.",
      },
      {
        day: 3,
        title: "French Valley Exploration",
        description: "Explore the dramatic French Valley and its hanging glaciers.",
      },
      // Add more days as needed
    ],
  },
  "Agasthyakoodam Trek": {
    id: "Agasthyakoodam Trek",
    name: "Agasthyakoodam Trek",
    location: "Kerala",
    image:Agasthyakoodam,
                description: "Explore the stunning landscapes of Patagonia",
    duration: "5 days",
    difficulty: "Moderate",
    groupSize: "6-12",
    price: 200000,
    altitude: "1,100 m (3,609 ft)",
    bestSeason: "December-February",
    trendingStartDate: "2023-02-10",
    packingList: [
      "Waterproof jacket and pants",
      "Hiking boots",
      "Warm layers",
      "Gloves and hat",
      "Sunglasses",
      "Camping gear",
      "Water bottle",
      "Camera",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival and Trek to Refugio Las Torres",
        description: "Begin the W Trek with a hike to the base of the Torres del Paine.",
      },
      {
        day: 2,
        title: "Trek to Los Cuernos",
        description: "Hike along Lake Nordenskjöld with views of the Cuernos del Paine.",
      },
      {
        day: 3,
        title: "French Valley Exploration",
        description: "Explore the dramatic French Valley and its hanging glaciers.",
      },
      // Add more days as needed
    ],
  },
  "Meesapulimala Trek": {
    id: "Meesapulimala Trek",
    name: "Meesapulimala Trek",
    location: "Tamil Nadu",
    image:Meesapulimala,
              description: "Explore the stunning landscapes of Patagonia",
    duration: "5 days",
    difficulty: "Moderate",
    groupSize: "6-12",
    price: 200000,
    altitude: "1,100 m (3,609 ft)",
    bestSeason: "December-February",
    trendingStartDate: "2023-02-10",
    packingList: [
      "Waterproof jacket and pants",
      "Hiking boots",
      "Warm layers",
      "Gloves and hat",
      "Sunglasses",
      "Camping gear",
      "Water bottle",
      "Camera",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival and Trek to Refugio Las Torres",
        description: "Begin the W Trek with a hike to the base of the Torres del Paine.",
      },
      {
        day: 2,
        title: "Trek to Los Cuernos",
        description: "Hike along Lake Nordenskjöld with views of the Cuernos del Paine.",
      },
      {
        day: 3,
        title: "French Valley Exploration",
        description: "Explore the dramatic French Valley and its hanging glaciers.",
      },
      // Add more days as needed
    ],
  },
  "Yelagiri Hills Trek": {
    id: "Yelagiri Hills Trek",
    name: "Yelagiri Hills Trek",
    location: "Tamil Nadu",
    image:Yelagirihills,
          description: "Explore the stunning landscapes of Patagonia",
    duration: "5 days",
    difficulty: "Moderate",
    groupSize: "6-12",
    price: 200000,
    altitude: "1,100 m (3,609 ft)",
    bestSeason: "December-February",
    trendingStartDate: "2023-02-10",
    packingList: [
      "Waterproof jacket and pants",
      "Hiking boots",
      "Warm layers",
      "Gloves and hat",
      "Sunglasses",
      "Camping gear",
      "Water bottle",
      "Camera",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival and Trek to Refugio Las Torres",
        description: "Begin the W Trek with a hike to the base of the Torres del Paine.",
      },
      {
        day: 2,
        title: "Trek to Los Cuernos",
        description: "Hike along Lake Nordenskjöld with views of the Cuernos del Paine.",
      },
      {
        day: 3,
        title: "French Valley Exploration",
        description: "Explore the dramatic French Valley and its hanging glaciers.",
      },
      // Add more days as needed
    ],
  },
  "Horsley Hills Trek": {
    id: "Horsley Hills Trek",
    name: "Horsley Hills Trek",
    location: "Tamil Nadu",
    image:Horsleyhills,            description: "Explore the stunning landscapes of Patagonia",
    duration: "5 days",
    difficulty: "Moderate",
    groupSize: "6-12",
    price: 200000,
    altitude: "1,100 m (3,609 ft)",
    bestSeason: "December-February",
    trendingStartDate: "2023-02-10",
    packingList: [
      "Waterproof jacket and pants",
      "Hiking boots",
      "Warm layers",
      "Gloves and hat",
      "Sunglasses",
      "Camping gear",
      "Water bottle",
      "Camera",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival and Trek to Refugio Las Torres",
        description: "Begin the W Trek with a hike to the base of the Torres del Paine.",
      },
      {
        day: 2,
        title: "Trek to Los Cuernos",
        description: "Hike along Lake Nordenskjöld with views of the Cuernos del Paine.",
      },
      {
        day: 3,
        title: "French Valley Exploration",
        description: "Explore the dramatic French Valley and its hanging glaciers.",
      },
      // Add more days as needed
    ],
  },
}

export const getRecentTreks = () => {
  return Object.values(treks).slice(0, 3)
}

export const getTrendingTreks = () => {
  return Object.values(treks).slice(0, 6)
}

export const getAllTreks = () => {
  return Object.values(treks)
}

export const getTrekById = (id) => {
  return treks[id] || null
}

