"use client";

import { useState, type ChangeEvent } from "react";
import { DollarSign } from "lucide-react";

interface Results {
  fromSubtotal: {
    tip: string;
    total: string;
    additionalCharges: string;
  };
  fromTotal: {
    tip: string;
    finalTotal: string;
  };
}

type InputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => void;

export default function TipCalculatorPage() {
  const [subtotal, setSubtotal] = useState<string>("");
  const [total, setTotal] = useState<string>("");
  const [tipPercentage, setTipPercentage] = useState<number>(18);
  const [customTip, setCustomTip] = useState<string>("");
  const [results, setResults] = useState<Results>({
    fromSubtotal: { tip: "0.00", total: "0.00", additionalCharges: "0.00" },
    fromTotal: { tip: "0.00", finalTotal: "0.00" },
  });

  const commonTipPercentages = [15, 18, 20, 25] as const;

  const toCents = (dollarStr: string): number => {
    const value = parseFloat(dollarStr);
    return isNaN(value) ? 0 : Math.round(value * 100);
  };

  const toDollars = (cents: number): string => {
    return (Math.abs(cents) / 100).toFixed(2);
  };

  const handleTipSelection = (percent: number): void => {
    setTipPercentage(percent);
    setCustomTip("");
  };

  const handleCustomTipChange: InputChangeHandler = (e) => {
    const value = e.target.value;
    const numericValue = parseInt(value);

    if (value === "" || (/^\d{1,3}$/.test(value) && numericValue <= 100)) {
      setCustomTip(value);
      setTipPercentage(numericValue || 0);
    }
  };

  const calculateAll = (): void => {
    const subtotalCents = toCents(subtotal);
    const totalCents = toCents(total);
    const tipPercent = tipPercentage / 100;

    const newResults: Results = {
      fromSubtotal: { tip: "0.00", total: "0.00", additionalCharges: "0.00" },
      fromTotal: { tip: "0.00", finalTotal: "0.00" },
    };

    if (subtotalCents > 0) {
      const tipAmount = Math.round(subtotalCents * tipPercent);
      const additionalCharges = totalCents > 0 ? totalCents - subtotalCents : 0;
      const totalBill = subtotalCents + tipAmount + additionalCharges;

      newResults.fromSubtotal = {
        tip: toDollars(tipAmount),
        additionalCharges: toDollars(additionalCharges),
        total: toDollars(totalBill),
      };
    }

    if (totalCents > 0) {
      const tipAmount = Math.round(totalCents * tipPercent);
      const finalTotal = totalCents + tipAmount;

      newResults.fromTotal = {
        tip: toDollars(tipAmount),
        finalTotal: toDollars(finalTotal),
      };
    }

    setResults(newResults);
  };

  const formatInputValue = (value: string): string => {
    if (!value) return "";
    const number = parseFloat(value);
    return isNaN(number) ? "" : number.toFixed(2);
  };

  const handleInputChange =
    (setter: (value: string) => void): InputChangeHandler =>
    (e): void => {
      const value = e.target.value;
      if (value === "" || /^\d*\.?\d{0,2}$/.test(value)) {
        setter(value);
      }
    };

  const hasBothValues = Boolean(subtotal && total);

  return (
    <div className="flex min-h-screen items-center justify-center p-4 dark:bg-[#1a1a1a]">
      <div className="relative w-full max-w-md">
        <div className="sticky top-0 z-10 bg-white shadow-md transition-all duration-200 dark:bg-[#2D3135]">
          <div className="p-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Tip Calculator
            </h2>
          </div>
        </div>

        <div className="mt-2 w-full bg-white shadow-lg dark:bg-[#2D3135]">
          <div className="space-y-6 p-6">
            <div className="space-y-4">
              <div className="relative">
                <label
                  htmlFor="subtotal"
                  className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  Subtotal Amount
                </label>
                <div className="relative">
                  <DollarSign className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-500 dark:text-gray-400" />
                  <input
                    id="subtotal"
                    type="text"
                    value={subtotal}
                    onChange={handleInputChange(setSubtotal)}
                    onBlur={() => setSubtotal(formatInputValue(subtotal))}
                    placeholder="0.00"
                    className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 pl-9 text-sm transition-colors placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 focus-visible:outline-none dark:border-[#404040] dark:bg-[#343A3E] dark:text-white dark:placeholder-gray-400"
                    inputMode="decimal"
                  />
                </div>
              </div>
              <div className="relative">
                <label
                  htmlFor="total"
                  className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  Total Amount
                </label>
                <div className="relative">
                  <DollarSign className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-500 dark:text-gray-400" />
                  <input
                    id="total"
                    type="text"
                    value={total}
                    onChange={handleInputChange(setTotal)}
                    onBlur={() => setTotal(formatInputValue(total))}
                    placeholder="0.00"
                    className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 pl-9 text-sm transition-colors placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 focus-visible:outline-none dark:border-[#404040] dark:bg-[#343A3E] dark:text-white dark:placeholder-gray-400"
                    inputMode="decimal"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Tip Percentage
              </label>
              <div className="grid grid-cols-4 gap-2">
                {commonTipPercentages.map((percent) => (
                  <button
                    key={percent}
                    onClick={() => handleTipSelection(percent)}
                    className={`h-10 rounded-md text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 focus-visible:outline-none ${
                      tipPercentage === percent && customTip === ""
                        ? "bg-black text-white hover:bg-black/90 dark:border dark:border-white dark:bg-white dark:text-black dark:hover:bg-gray-100"
                        : "border border-gray-300 bg-white hover:bg-gray-100 dark:border-white dark:bg-transparent dark:text-white dark:hover:bg-white dark:hover:text-black"
                    }`}
                  >
                    {percent}%
                  </button>
                ))}
              </div>
              <div className="relative">
                <input
                  id="customTip"
                  type="text"
                  value={customTip}
                  onChange={handleCustomTipChange}
                  placeholder="Custom tip %"
                  className="mt-2 h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm transition-colors placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 focus-visible:outline-none dark:border-[#404040] dark:bg-[#343A3E] dark:text-white dark:placeholder-gray-400"
                  inputMode="numeric"
                />
              </div>
            </div>

            <button
              onClick={calculateAll}
              className="w-full rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700"
            >
              Calculate
            </button>
          </div>

          <div className="flex flex-col space-y-4 border-t border-gray-200 bg-gray-50 p-6 dark:border-[#404040] dark:bg-[#343A3E]">
            {subtotal && (
              <div className="w-full space-y-2">
                {hasBothValues && (
                  <h3 className="border-b pb-1 font-semibold text-gray-700 dark:border-[#404040] dark:text-gray-200">
                    Based on Subtotal:
                  </h3>
                )}
                <div className="space-y-1">
                  <p className="flex justify-between text-lg text-gray-700 dark:text-gray-200">
                    <span>Tip Amount:</span>
                    <span className="font-medium">
                      ${results.fromSubtotal.tip}
                    </span>
                  </p>
                  {hasBothValues && (
                    <p className="flex justify-between text-lg text-gray-700 dark:text-gray-200">
                      <span>Additional Charges:</span>
                      <span className="font-medium">
                        ${results.fromSubtotal.additionalCharges}
                      </span>
                    </p>
                  )}
                  <p className="flex justify-between text-lg font-bold text-gray-700 dark:text-white">
                    <span>Total Bill:</span>
                    <span>${results.fromSubtotal.total}</span>
                  </p>
                </div>
              </div>
            )}

            {hasBothValues && (
              <div className="h-[1px] w-full bg-gray-200 dark:bg-[#404040]" />
            )}

            {hasBothValues && (
              <div className="w-full space-y-2">
                <h3 className="border-b pb-1 font-semibold text-gray-700 dark:border-[#404040] dark:text-gray-200">
                  Based on Total:
                </h3>
                <div className="space-y-1">
                  <p className="flex justify-between text-lg text-gray-700 dark:text-gray-200">
                    <span>Tip Amount:</span>
                    <span className="font-medium">
                      ${results.fromTotal.tip}
                    </span>
                  </p>
                  <p className="flex justify-between text-lg font-bold text-gray-700 dark:text-white">
                    <span>Total Bill:</span>
                    <span>${results.fromTotal.finalTotal}</span>
                  </p>
                </div>
              </div>
            )}

            {total && !subtotal && (
              <div className="w-full space-y-1">
                <p className="flex justify-between text-lg text-gray-700 dark:text-gray-200">
                  <span>Tip Amount:</span>
                  <span className="font-medium">${results.fromTotal.tip}</span>
                </p>
                <p className="flex justify-between text-lg font-bold text-gray-700 dark:text-white">
                  <span>Total Bill:</span>
                  <span>${results.fromTotal.finalTotal}</span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
