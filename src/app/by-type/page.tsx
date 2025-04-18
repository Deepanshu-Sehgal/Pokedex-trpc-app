"use client";
import { useState } from "react";
import FilterablePokedexTable from "@/components/FilterablePokedexTable";

export default function ByType() {
  const [selectedType, setSelectedType] = useState<string | undefined>(
    undefined
  );
  return (
    <FilterablePokedexTable
      selectedType={selectedType ?? undefined}
      selectType={setSelectedType}
    />
  );
}
