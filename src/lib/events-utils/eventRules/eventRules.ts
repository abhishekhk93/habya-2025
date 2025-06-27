import { EventRule, AgeLimit } from "./types";
import { TOURNAMENT_DAY1, TOURNAMENT_DAY2 } from "../ageUtils";

const below16OnDay2: AgeLimit = { value: 16, onDate: TOURNAMENT_DAY2 };
const atLeast35OnDay1: AgeLimit = { value: 35, onDate: TOURNAMENT_DAY1 };
const atLeast40OnDay1: AgeLimit = { value: 40, onDate: TOURNAMENT_DAY1 };
const atLeast50OnDay1: AgeLimit = { value: 50, onDate: TOURNAMENT_DAY1 };
const atLeast60OnDay1: AgeLimit = { value: 60, onDate: TOURNAMENT_DAY1 };

const SINGLES_PRICE = parseInt(process.env.NEXT_PUBLIC_SINGLES_PRICE || "500");
const DOUBLES_PRICE = parseInt(process.env.NEXT_PUBLIC_DOUBLES_PRICE || "1000");

export const eventRules: EventRule[] = [
  // Under 16 kids - Boys singles
  {
    id: 1,
    name: "Under 16 Boys Singles",
    type: "singles",
    allowedGenders: ["male"],
    maxAge: below16OnDay2,
    price: SINGLES_PRICE,
    entryLimit: 30,
  },
  // Under 16 kids - Girls singles
  {
    id: 2,
    name: "Under 16 Girls Singles",
    type: "singles",
    allowedGenders: ["female"],
    maxAge: below16OnDay2,
    price: SINGLES_PRICE,
    entryLimit: 30,
  },
  // Under 16 kids - Mixed Doubles
  {
    id: 3,
    name: "Under 16 Mixed Doubles",
    type: "mixed_doubles",
    allowedGenders: ["male", "female"],
    maxAge: below16OnDay2,
    partnerRule: {
      requireOneFemale: true,
    },
    price: DOUBLES_PRICE,
    entryLimit: 30,
  },
  // Open Men's singles
  {
    id: 4,
    name: "Open Men's Singles",
    type: "singles",
    allowedGenders: ["male"],
    price: SINGLES_PRICE,
    entryLimit: 45,
  },
  // Open Women's singles
  {
    id: 5,
    name: "Open Women's Singles",
    type: "singles",
    allowedGenders: ["female"],
    price: SINGLES_PRICE,
    entryLimit: 30,
  },
  // Open Men's doubles
  {
    id: 6,
    name: "Open Men's Doubles",
    type: "doubles",
    allowedGenders: ["male", "male"],
    price: DOUBLES_PRICE,
    entryLimit: 60,
  },
  // Open Women's doubles
  {
    id: 7,
    name: "Open Women's Doubles",
    type: "doubles",
    allowedGenders: ["female", "female"],
    price: DOUBLES_PRICE,
    entryLimit: 30,
  },
  // 35+ Men's singles
  {
    id: 8,
    name: "35+ Men's Singles",
    type: "singles",
    allowedGenders: ["male"],
    minAge: atLeast35OnDay1,
    price: SINGLES_PRICE,
    entryLimit: 30,
  },
  // 35+ Women's singles
  {
    id: 9,
    name: "35+ Women's Singles",
    type: "singles",
    allowedGenders: ["female"],
    minAge: atLeast35OnDay1,
    price: SINGLES_PRICE,
    entryLimit: 30,
  },
  // 35+ Men's doubles
  {
    id: 10,
    name: "35+ Men's Doubles",
    type: "doubles",
    allowedGenders: ["male", "male"],
    minAge: atLeast35OnDay1,
    price: DOUBLES_PRICE,
    entryLimit: 30,
  },
  // 35+ Women's doubles
  {
    id: 11,
    name: "35+ Women's Doubles",
    type: "doubles",
    allowedGenders: ["female", "female"],
    minAge: atLeast35OnDay1,
    price: DOUBLES_PRICE,
    entryLimit: 30,
  },
  // 50+ Men's singles
  {
    id: 12,
    name: "50+ Men's Singles",
    type: "singles",
    allowedGenders: ["male"],
    minAge: atLeast50OnDay1,
    price: SINGLES_PRICE,
    entryLimit: 30,
  },
  // 50+ Women's singles
  {
    id: 13,
    name: "50+ Women's Singles",
    type: "singles",
    allowedGenders: ["female"],
    minAge: atLeast50OnDay1,
    price: SINGLES_PRICE,
    entryLimit: 30,
  },
  // 50+ Men's doubles
  {
    id: 14,
    name: "50+ Men's Doubles",
    type: "doubles",
    allowedGenders: ["male", "male"],
    minAge: atLeast50OnDay1,
    price: DOUBLES_PRICE,
    entryLimit: 30,
  },
  // 50+ Women's doubles
  {
    id: 15,
    name: "50+ Women's Doubles",
    type: "doubles",
    allowedGenders: ["female", "female"],
    minAge: atLeast50OnDay1,
    price: DOUBLES_PRICE,
    entryLimit: 30,
  },
  // 60+ Men's singles
  {
    id: 16,
    name: "60+ Men's Singles",
    type: "singles",
    allowedGenders: ["male"],
    minAge: atLeast60OnDay1,
    price: SINGLES_PRICE,
    entryLimit: 30,
  },
  // 60+ Women's singles
  {
    id: 17,
    name: "60+ Women's Singles",
    type: "singles",
    allowedGenders: ["female"],
    minAge: atLeast60OnDay1,
    price: SINGLES_PRICE,
    entryLimit: 30,
  },
  // 60+ Men's doubles
  {
    id: 18,
    name: "60+ Men's Doubles",
    type: "doubles",
    allowedGenders: ["male", "male"],
    minAge: atLeast60OnDay1,
    price: DOUBLES_PRICE,
    entryLimit: 30,
  },
  // 60+ Women's doubles
  {
    id: 19,
    name: "60+ Women's Doubles",
    type: "doubles",
    allowedGenders: ["female", "female"],
    minAge: atLeast60OnDay1,
    price: DOUBLES_PRICE,
    entryLimit: 30,
  },
  // Mixed Age Men's doubles (at least one player 40+)
  {
    id: 20,
    name: "Mixed Age Men's Doubles",
    type: "doubles",
    allowedGenders: ["male", "male"],
    partnerRule: {
      requireOneAboveAge: atLeast40OnDay1,
    },
    price: DOUBLES_PRICE,
    entryLimit: 40,
  },
  // Mixed Age Mixed doubles (at least one player 40+)
  {
    id: 21,
    name: "Mixed Age Mixed Doubles",
    type: "mixed_doubles",
    allowedGenders: ["male", "female"],
    partnerRule: {
      requireOneFemale: true,
      requireOneAboveAge: atLeast40OnDay1,
    },
    price: DOUBLES_PRICE,
    entryLimit: 25,
  },
];

export const eventIdToName = Object.fromEntries(
  eventRules.map((event) => [event.id, event.name])
);

