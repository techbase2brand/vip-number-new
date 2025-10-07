"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchByPrice from "../search-results/SearchByPrice/SearchByPrice";
import CardLoder from "../CardLoder/CardLoder";
import DealBanner from "./DealBanner";

const ProductDeal = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadmore, setLoadmore] = useState(false);
  const [nextPage, setNextPage] = useState(null);
  
  // Deal page specific states
  const [dealSortOrder, setDealSortOrder] = useState(""); // Default to High to Low
  const [dealComingSoon, setDealComingSoon] = useState("yes"); // Default to Coming Soon
  const [isInitialLoad, setIsInitialLoad] = useState(true); // Track initial load
  const [isFilterChange, setIsFilterChange] = useState(false); // Track filter changes

  // Build API URL with current parameters for deal page
  const buildDealApiUrl = (customSort = null, customComingSoon = null) => {
    const currentSort = customSort || dealSortOrder;
    const currentComingSoon = customComingSoon || dealComingSoon;
    
    const params = new URLSearchParams({
      min_price: "2300",
      max_price: "4000",
      comingsoon: currentComingSoon,
      star_status: "true",
      paginate: "60",
      seller: "PREMIUM",
      id: "3462198"
    });
    
    if (currentSort) {
      params.append("sort", currentSort);
    }
    
    return `/api/web/price/search?${params.toString()}`;
  };

  // API call function
  const fetchDealData = async (url = null, customSort = null, customComingSoon = null, isFilterUpdate = false) => {
    try {
      // Set loading states based on whether it's initial load, load more, or filter change
      if (url) {
        // Load more - only set loadmore, not loading
        setLoadmore(true);
      } else if (isFilterUpdate) {
        // Filter change - set loading and filter change states
        setLoading(true);
        setLoadmore(true);
        setIsFilterChange(true);
      } else {
        // Initial load - set both loading states
        setLoading(true);
        setLoadmore(true);
      }

      const apiUrl = url || buildDealApiUrl(customSort, customComingSoon);
      const response = await axios.get(apiUrl);

      if (response.data && response.data.status === "success") {
        const newData = response.data.data || [];

        if (url) {
          // Load more data - append to existing results
          setSearchResults((prev) => [...prev, ...newData]);
        } else {
          // Initial load or filter change - replace results
          setSearchResults(newData);
          setIsInitialLoad(false); // Mark initial load as complete
          setIsFilterChange(false); // Reset filter change state
        }

        // Set next page URL if available
        setNextPage(response.data.nextURL || null);
      }
    } catch (error) {
      console.error("API Error:", error);
      // Handle error gracefully
    } finally {
      setLoading(false);
      setLoadmore(false);
    }
  };

  // Deal page specific handlers
  const handleDealSortChange = (newSortOrder) => {
    setDealSortOrder(newSortOrder);
    fetchDealData(null, newSortOrder, dealComingSoon, true);
  };

  const handleDealComingSoonChange = (newComingSoon) => {
    setDealComingSoon(newComingSoon);
    fetchDealData(null, dealSortOrder, newComingSoon, true);
  };

  // Load more function
  const handleLoadMore = () => {
    if (nextPage && !loading) {
      fetchDealData(nextPage);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchDealData();
  }, []);

  return (
    <>
    <DealBanner/>
    <div>
      {loading && (isInitialLoad || isFilterChange) ? (
        <CardLoder columns={5} gridItems={20} />
      ) : (
        <SearchByPrice
          results={searchResults}
          page={"seracPrice"}
          nextPage={handleLoadMore}
          searchNextUrl={nextPage}
          loadmore={loadmore}
          isDealPage={true}
          dealSortOrder={dealSortOrder}
          dealComingSoon={dealComingSoon}
          onDealSortChange={handleDealSortChange}
          onDealComingSoonChange={handleDealComingSoonChange}
        />
      )}
    </div>
    </>
  );
};

export default ProductDeal;
