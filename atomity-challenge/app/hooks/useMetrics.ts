"use client";

import { useQuery } from "@tanstack/react-query";

export interface MetricItem {
  id: number;
  label: string;
  value: number;
  percentage: number;
}

interface Product {
  id: number;
  title: string;
  price: number;
  rating: number;
}

interface ProductsResponse {
  products: Product[];
}

async function fetchMetrics(): Promise<MetricItem[]> {
  const res = await fetch("https://dummyjson.com/products?limit=6");

  if (!res.ok) {
    throw new Error("Failed to fetch metrics");
  }

  const data: ProductsResponse = await res.json();

  return data.products.map((product) => ({
    id: product.id,
    label: product.title.split(" ")[0],
    value: Math.round(product.price),
    percentage: Math.round(product.rating * 20),
  }));
}

export function useMetrics() {
  return useQuery({
    queryKey: ["metrics"],
    queryFn: fetchMetrics,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
}
