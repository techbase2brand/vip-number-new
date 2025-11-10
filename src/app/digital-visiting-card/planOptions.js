"use client";

export const BASE_DIGITAL_CARD_PLANS = [
  {
    id: "digital-30-silver",
    label: "Digital Visiting Card | 30 Days | Silver",
    plan: "digital_visiting_card",
    duration: 30,
    money_back_guarantee: false,
    type: "silver",
    amount: 199,
  },
  {
    id: "digital-365-silver",
    label: "Digital Visiting Card | 365 Days | Silver",
    plan: "digital_visiting_card",
    duration: 365,
    money_back_guarantee: false,
    type: "silver",
    amount: 699,
  },
  {
    id: "digital-365-gold",
    label: "Digital Visiting Card | 365 Days | Gold (14 Day MBG)",
    plan: "digital_visiting_card",
    duration: 365,
    money_back_guarantee: true,
    type: "gold",
    amount: 999,
  },
];

export const ADD_ON_OPTIONS = [
  {
    id: "smart",
    label: "Add Smart Visiting Card (+₹499)",
    description: "Premium NFC-enabled tap card",
    amount: 499,
  },
  {
    id: "stand",
    label: "Add QR NFC Stand (+₹999)",
    description: "Counter stand with QR & NFC tap",
    amount: 999,
  },
];

export const ALL_IN_ONE_ADD_ON_AMOUNT = 1299;

export const DEFAULT_BASE_PLAN_ID = "digital-365-gold";

