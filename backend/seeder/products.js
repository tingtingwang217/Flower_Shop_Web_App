const products = [
  {
    name: "Champagne Rose",
    description:
      "Roses on another level. Experience our Premium Rose collection, Designed with garden flowers and exquisite premium garden roses. Available for 5 colors: champagne, red, pink, white and yellow.",
    count: 5,
    price: 80,
    category: "Rose",
    images: [
      { path: "/images/roseCham1.jpeg" },
      { path: "/images/roseCham2.jpeg" },
    ],
    rating: 3,
    reviewsNumber: 5,
    reviews: [],
    attrs: [{ key: "color", value: "champagne" }],
  },
  {
    name: "Red Rose",
    description:
      "Roses on another level. Experience our Premium Rose collection, Designed with garden flowers and exquisite premium garden roses. Available for 5 colors: champagne, red, pink, white and yellow.",
    count: 5,
    price: 90,
    category: "Rose",
    images: [
      { path: "/images/roseRed1.jpeg" },
      { path: "/images/roseRed2.jpeg" },
    ],
    rating: 4,
    reviewsNumber: 5,
    reviews: [],
    attrs: [{ key: "color", value: "red" }],
  },
  {
    name: "Pink Rose",
    description:
      "Roses on another level. Experience our Premium Rose collection, Designed with garden flowers and exquisite premium garden roses. Available for 5 colors: champagne, red, pink, white and yellow.",
    count: 5,
    price: 150,
    category: "Rose",
    images: [
      { path: "/images/rosePink1.jpeg" },
      { path: "/images/rosePink2.jpeg" },
    ],
    rating: 4,
    reviewsNumber: 5,
    reviews: [],
    attrs: [{ key: "color", value: "pink" }],
  },
  {
    name: "White Rose",
    description:
      "Roses on another level. Experience our Premium Rose collection, Designed with garden flowers and exquisite premium garden roses. Available for 5 colors: champagne, red, pink, white and yellow.",
    count: 5,
    price: 180,
    category: "Rose",
    images: [
      { path: "/images/roseWhite1.jpeg" },
      { path: "/images/roseWhite2.jpeg" },
    ],
    rating: 5,
    reviewsNumber: 5,
    reviews: [],
    attrs: [{ key: "color", value: "white" }],
  },
  {
    name: "Yellow Rose",
    description:
      "Roses on another level. Experience our Premium Rose collection, Designed with garden flowers and exquisite premium garden roses. Available for 5 colors: champagne, red, pink, white and yellow.",
    count: 5,
    price: 70,
    category: "Rose",
    images: [
      { path: "/images/roseYellow.jpeg" },
    ],
    rating: 5,
    reviewsNumber: 5,
    reviews: [],
    attrs: [{ key: "color", value: "yellow" }],
  },




  {
    name: "Pink Chrysanthemum",
    description:
      "Crisp, fresh, lively and as easy like Sunday morning, this colourful arrangement celebrates the joy of life. Available in pink and purple.",
    count: 5,
    price: 100,
    category: "Chrysanthemum",
    images: [
      { path: "/images/chryPink.jpg" },
    ],
    rating: 4,
    reviewsNumber: 5,
    reviews: [],
    attrs: [{ key: "color", value: "pink" }],
  },
  {
    name: "Purple Chrysanthemum",
    description:
      "Crisp, fresh, lively and as easy like Sunday morning, this colourful arrangement celebrates the joy of life. Available in pink and purple.",
    count: 5,
    price: 150,
    category: "Chrysanthemum",
    images: [
      { path: "/images/chryPurple1.jpg" },
      { path: "/images/chryPurple2.jpg" },
    ],
    rating: 3,
    reviewsNumber: 5,
    reviews: [],
    attrs: [{ key: "color", value: "purple" }],
  },



  {
    name: "Red Lily",
    description:
      "Include carefully picked flowers and seasonal greens. Brings you with romance and sweetness. Available for red and white.",
    count: 5,
    price: 40,
    category: "Lily",
    images: [
      { path: "/images/lilyRed.jpg" },
     
    ],
    rating: 1,
    reviewsNumber: 5,
    reviews: [],
    attrs: [{ key: "color", value: "red" }],
  },
  {
    name: "White Lily",
    description:
      "Include carefully picked flowers and seasonal greens. Brings you with romance and sweetness. Available for red and white.",
    count: 5,
    price: 140,
    category: "Lily",
    images: [
      { path: "/images/lilyWhite.jpeg" },
    ],
    rating: 2,
    reviewsNumber: 5,
    reviews: [],
    attrs: [{ key: "color", value: "white" }],
  },


  {
    name: "White Orchid",
    description:
      "Hardy Tropical Plants and Decorative elements are Elegant, Long Lasting and Versatile alternative to fresh florals for those seeking a Lasting Memory. Color available for white, purple and purple. ",
    count: 5,
    price: 40,
    category: "Orchid",
    images: [
      { path: "/images/orchidWhite1.jpeg" },
      { path: "/images/orchidWhite2.jpeg" },
      
    ],
    rating: 4,
    reviewsNumber: 5,
    reviews: [],
    attrs: [{ key: "color", value: "white" }],
  },
  {
    name: "Purple Orchid",
    description:
      "Hardy Tropical Plants and Decorative elements are Elegant, Long Lasting and Versatile alternative to fresh florals for those seeking a Lasting Memory. Color available for white, purple and purple.",
    count: 5,
    price: 20,
    category: "Orchid",
    images: [
      { path: "/images/orchidPurple1.jpeg" },
      { path: "/images/orchidPurple2.jpeg" },
      
    ],
    rating: 5,
    reviewsNumber: 5,
    reviews: [],
    attrs: [{ key: "color", value: "purple" }],
  },
  {
    name: "Pink Orchid",
    description:
      "Hardy Tropical Plants and Decorative elements are Elegant, Long Lasting and Versatile alternative to fresh florals for those seeking a Lasting Memory. Color available for white, purple and purple.",
    count: 5,
    price: 110,
    category: "Orchid",
    images: [
      { path: "/images/orchidPink1.jpeg" },
      { path: "/images/orchidPink2.jpeg" },
      
    ],
    rating: 3,
    reviewsNumber: 5,
    reviews: [],
    attrs: [{ key: "color", value: "pink" }],
  },



  {
    name: "White Carnation",
    description:
      "Explosive Burts of Colours, Chic and Modern Carnation. Comes in Pink, purple and white.",
    count: 5,
    price: 190,
    category: "Carnation",
    images: [
      { path: "/images/carnationWhite.jpg" },
      
    ],
    rating: 4,
    reviewsNumber: 5,
    reviews: [],
    attrs: [{ key: "color", value: "white" }],
  },
  {
    name: "Purple Carnation",
    description:
      "Explosive Burts of Colours, Chic and Modern Carnation. Comes in Pink, purple and white.",
    count: 5,
    price: 60,
    category: "Carnation",
    images: [
      { path: "/images/carnationPurple.jpeg" },
      
    ],
    rating: 4,
    reviewsNumber: 5,
    reviews: [],
    attrs: [{ key: "color", value: "purple" }],
  },
  {
    name: "Pink Carnation",
    description:
      "Explosive Burts of Colours, Chic and Modern Carnation. Comes in Pink, purple and white.",
    count: 5,
    price: 105,
    category: "Carnation",
    images: [
      { path: "/images/carnationPink.jpg" },
    ],
    rating: 5,
    reviewsNumber: 5,
    reviews: [],
    attrs: [{ key: "color", value: "pink" }],
  },

]

module.exports = products
