"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  ADD_ON_OPTIONS,
  ALL_IN_ONE_ADD_ON_AMOUNT,
  BASE_DIGITAL_CARD_PLANS,
  DEFAULT_BASE_PLAN_ID,
} from "./planOptions";

const DigitalCardPlanContext = createContext(null);

const buildCheckoutPlan = (basePlan, selectedAddOns) => {
  if (!basePlan) return null;

  const hasSmart = !!selectedAddOns.smart;
  const hasStand = !!selectedAddOns.stand;

  let planCode = basePlan.plan;
  let extraAmount = 0;
  let addOnLabelParts = [];

  if (hasSmart && hasStand) {
    planCode = "all_in_one";
    extraAmount = ALL_IN_ONE_ADD_ON_AMOUNT;
    addOnLabelParts = ["Smart Visiting Card", "QR NFC Stand"];
  } else if (hasSmart) {
    planCode = "smart_visiting_card";
    extraAmount = 499;
    addOnLabelParts = ["Smart Visiting Card"];
  } else if (hasStand) {
    planCode = "qr_nfc_stand";
    extraAmount = 999;
    addOnLabelParts = ["QR NFC Stand"];
  }

  const amount = basePlan.amount + extraAmount;
  const moneyBack = basePlan.money_back_guarantee;
  let planType = basePlan.type;

  if (planCode === "smart_visiting_card" && basePlan.type === "gold") {
    planType = "gold";
  } else if (planCode === "qr_nfc_stand" && basePlan.type === "gold") {
    planType = "gold";
  } else if (planCode === "all_in_one") {
    planType = basePlan.type;
  }
  const addOnLabel = addOnLabelParts.join(" + ");
  const displayLabel = addOnLabel
    ? `${basePlan.label} + ${addOnLabel}`
    : basePlan.label;

  return {
    basePlan,
    addOnLabel,
    addOnLabelParts,
    hasSmart,
    hasStand,
    totalAmount: amount,
    planCode,
    payload: {
      plan: planCode,
      duration: String(basePlan.duration),
      money_back_guarantee: moneyBack,
      type: planType,
      amount,
    },
    displayLabel,
  };
};

export const DigitalCardPlanProvider = ({ children }) => {
  const [basePlanId, setBasePlanId] = useState(DEFAULT_BASE_PLAN_ID);
  const [selectedAddOns, setSelectedAddOns] = useState({
    smart: false,
    stand: false,
  });
  const [isPlanModalOpen, setPlanModalOpen] = useState(false);
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [lastCheckout, setLastCheckout] = useState(null);

  const toggleAddOn = useCallback((id) => {
    setSelectedAddOns((prev) => ({
      ...prev,
      [id]: !prev?.[id],
    }));
  }, []);

  const normaliseBasePlanId = useCallback((candidateId) => {
    const match = BASE_DIGITAL_CARD_PLANS.find((plan) => plan.id === candidateId);
    return match ? match.id : DEFAULT_BASE_PLAN_ID;
  }, []);

  const resetPlanSelections = useCallback(
    (config = {}) => {
      setBasePlanId(normaliseBasePlanId(config?.basePlanId));
      setSelectedAddOns({
        smart: !!config?.addOns?.smart,
        stand: !!config?.addOns?.stand,
      });
    },
    [normaliseBasePlanId]
  );

  const openPlanModal = useCallback(() => {
    setProfileModalOpen(false);
    setPlanModalOpen(true);
  }, []);

  const closePlanModal = useCallback(() => {
    setPlanModalOpen(false);
  }, []);

  const openProfileModal = useCallback(() => {
    setPlanModalOpen(false);
    setProfileModalOpen(true);
  }, []);

  const closeProfileModal = useCallback(() => {
    setProfileModalOpen(false);
  }, []);

  const startProfileFlow = useCallback(
    (config) => {
      resetPlanSelections(config);
      openProfileModal();
    },
    [resetPlanSelections, openProfileModal]
  );

  const basePlan = useMemo(() => {
    return (
      BASE_DIGITAL_CARD_PLANS.find((plan) => plan.id === basePlanId) ??
      BASE_DIGITAL_CARD_PLANS[0]
    );
  }, [basePlanId]);

  const checkoutPlan = useMemo(() => {
    return buildCheckoutPlan(basePlan, selectedAddOns);
  }, [basePlan, selectedAddOns]);

  useEffect(() => {
    if (checkoutPlan) {
      setLastCheckout(checkoutPlan);
    }
  }, [checkoutPlan]);

  const value = useMemo(
    () => ({
      basePlans: BASE_DIGITAL_CARD_PLANS,
      addOnOptions: ADD_ON_OPTIONS,
      basePlanId,
      setBasePlanId,
      selectedAddOns,
      toggleAddOn,
      resetPlanSelections,
      basePlan,
      checkoutPlan,
      lastCheckout,
      isPlanModalOpen,
      openPlanModal,
      closePlanModal,
      isProfileModalOpen,
      openProfileModal,
      closeProfileModal,
      startProfileFlow,
    }),
    [
      basePlanId,
      selectedAddOns,
      toggleAddOn,
      resetPlanSelections,
      basePlan,
      checkoutPlan,
      lastCheckout,
      isPlanModalOpen,
      openPlanModal,
      closePlanModal,
      isProfileModalOpen,
      openProfileModal,
      closeProfileModal,
      startProfileFlow,
    ]
  );

  return (
    <DigitalCardPlanContext.Provider value={value}>
      {children}
    </DigitalCardPlanContext.Provider>
  );
};

export const useDigitalCardPlan = () => {
  const context = useContext(DigitalCardPlanContext);

  if (!context) {
    throw new Error(
      "useDigitalCardPlan must be used within a DigitalCardPlanProvider"
    );
  }

  return context;
};

