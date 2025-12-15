"use client";
import { useState } from "react";




const INDICATORS = [
  { id: "rsi", name: "RSI", description: "Relative Strength Index", currentWindow: 14, currentHighThreshold: 70, currentLowThreshold: 30, currentWeight: 25 },
  { id: "sma", name: "SMA", description: "Simple Moving Average", currentWindow: 20, currentHighThreshold: 0, currentLowThreshold: 0, currentWeight: 25 },
  { id: "ema", name: "EMA", description: "Exponential Moving Average", currentWindow: 12, currentHighThreshold: 0, currentLowThreshold: 0, currentWeight: 25 },
  { id: "macd", name: "MACD", description: "Moving Average Convergence Divergence", currentWindow: 26, currentHighThreshold: 0, currentLowThreshold: 0, currentWeight: 25 },
  { id: "bollinger", name: "Bollinger Bands", description: "Volatility Bands", currentWindow: 20, currentHighThreshold: 2, currentLowThreshold: 2, currentWeight: 25 },
  { id: "stoch", name: "Stochastic Oscillator", description: "Momentum Indicator", currentWindow: 14, currentHighThreshold: 80, currentLowThreshold: 20, currentWeight: 25 },
  { id: "adx", name: "ADX", description: "Average Directional Index", currentWindow: 14, currentHighThreshold: 25, currentLowThreshold: 0, currentWeight: 25 },
  { id: "obv", name: "OBV", description: "On-Balance Volume", currentWindow: 0, currentHighThreshold: 0, currentLowThreshold: 0, currentWeight: 25 },
  { id: "cci", name: "CCI", description: "Commodity Channel Index", currentWindow: 20, currentHighThreshold: 100, currentLowThreshold: -100, currentWeight: 25 },
  { id: "atr", name: "ATR", description: "Average True Range", currentWindow: 14, currentHighThreshold: 0, currentLowThreshold: 0, currentWeight: 25 },
];


export default function BacktestingPage() {
  const [selected, setSelected] = useState<any>(null);
  const [selectedStock, setSelectedStock] = useState<any>(null);
  const [basket, setBasket] = useState<any[]>([]);
  const [activeBasketItem, setActiveBasketItem] = useState<any>(null);
  const [stockBasket, setStockBasket] = useState<any[]>([]);
  const [newStock, setNewStock] = useState("");
  const [assetType, setAssetType] = useState<"stock" | "etf">("stock");

  return (

    <div className="bg-gray-700 min-h-screen p-10">
      <h1 className="text-white mb-5 text-3xl py-6 text-center"style={{ fontFamily: "Ethnocentric, sans-serif" }}>Backtesting</h1>
      <p className = "text-white text-center mb-5 text-l"style={{ fontFamily: "Ethnocentric, sans-serif" }}>CURRENT INDICATORS</p>
   
      {/* Current Indicators Box */}
    <div className="flex flex-col items-center">
      <div className="bg-white border-8 border-cyan-700 rounded-xl p-10 w-full max-w-7xl mb-6">
        {basket.length === 0 ? 
        (<p className="text-gray-400 italic">No indicators selected</p>
        ) : (
        <ul className="space-y-3">{basket.map((item) => (<li key={item.id} onClick={() => setActiveBasketItem(item)}className={`flex justify-between items-center border-b pb-2 cursor-pointer ${activeBasketItem?.id === item.id ? "bg-gray-200 font-bold" : ""}`}>
        <span className="font-semibold">{item.name}</span>
        <span className="text-sm text-gray-500">
          {item.description}
        </span>
        
      </li>))}
      <div className="text-center py-6">
      <button   onClick={() => {if (!activeBasketItem) return;setBasket((prev) =>prev.filter((item) => item.id !== activeBasketItem.id));setActiveBasketItem(null);}}
      className="text-white font-bold text-l border bg-red-500 px-4 py-2 hover:bg-red-600">Remove from list</button>
    </div>
  </ul>)}
  </div>
  </div>

  {activeBasketItem && (
    <div className="mt-6">
      <div className="flex justify-center gap-10 mb-7">
      {/* Window */}
      <div className="border-6 rounded-2xl p-4 w-60 text-center bg-cyan-700 border-cyan-900 hover:bg-cyan-800">
        <h6 className="font-bold text-white mb-2">Current Window</h6>
        <p className="text-white">{activeBasketItem.currentWindow || 0}</p>
      </div>

      {/* Thresholds */}
      <div className="border-6 rounded-2xl p-4 w-60 text-center bg-cyan-700 border-cyan-900 hover:bg-cyan-800">
        <h6 className="font-bold text-white mb-2">Current Threshold(s)</h6>
        <p className="text-white">
          High: {activeBasketItem.currentHighThreshold || 0} <br />
          Low: {activeBasketItem.currentLowThreshold || 0}
        </p>
      </div>

      {/* Weight */}
      <div className="border-6 rounded-2xl p-4 w-60 text-center bg-cyan-700 border-cyan-900 hover:bg-cyan-800">
        <h6 className="font-bold text-white mb-2">Current Weight in Basket</h6>
        <p className="text-white">{activeBasketItem.currentWeight || 50}</p>
      </div>



      </div>
      {/* Header with the indicator name */}
      <h2 className="text-white text-2xl font-bold text-center mb-4">
        {activeBasketItem.name} Settings
      </h2>



      {/* Settings boxes */}
      <div className="flex justify-center gap-4 mb-10">
        <div className=" border-cyan-700 rounded-xl p-6 flex gap-4">

          {/* Window */}
          <div className="border-4 border-cyan-800 rounded-4xl p-4 w-60 text-center bg-cyan-700">
            <p className="font-bold text-white">Window</p>
            <input type="number" className="border-gray-100/60 mt-2 w-full border-3 px-2 py-1 text-white rounded-xl text-center focus:outline-none focus:ring-0 focus:border-cyan-500" value={activeBasketItem?.currentWindow ?? ''}onChange={(e) => {const newValue = Number(e.target.value);
          setActiveBasketItem({ ...activeBasketItem,currentWindow: newValue, });
    
          // Also update it in the basket array
          setBasket((prev) =>
            prev.map((item) =>
              item.id === activeBasketItem.id
                ? { ...item, currentWindow: newValue }
                : item));}}
            />
          </div>
          {/* Threshold */}
            <div className="border-4 border-cyan-800 rounded-4xl p-4 w-60 text-center bg-cyan-700">
              <p className="font-bold text-white">Threshold</p>
              <input type="number" placeholder="50" className="border-gray-100/60 mt-2 w-full border-3 px-2 py-1 text-white rounded-xl text-center focus:outline-none focus:ring-0 focus:border-cyan-500" value={activeBasketItem?.currentHighThreshold ?? ''}onChange={(e) => {const newValue = Number(e.target.value);
          setActiveBasketItem({ ...activeBasketItem,currentHighThreshold: newValue, });
    
          // Also update it in the basket array
          setBasket((prev) =>
            prev.map((item) =>
              item.id === activeBasketItem.id
                ? { ...item, currentHighThreshold: newValue }
                : item));}}
            />
              <input type="number" placeholder="30" className="border-gray-100/60 mt-2 w-full border-3 px-2 py-1 text-white rounded-xl text-center focus:outline-none focus:ring-0 focus:border-cyan-500" value={activeBasketItem?.currentLowThreshold ?? ''}onChange={(e) => {const newValue = Number(e.target.value);
          setActiveBasketItem({ ...activeBasketItem,currentLowThreshold: newValue, });
    
          // Also update it in the basket array
          setBasket((prev) =>
            prev.map((item) =>
              item.id === activeBasketItem.id
                ? { ...item, currentLowThreshold: newValue }
                : item));}}
            />
            </div>

            {/* Weight */}
            <div className="border-4 border-cyan-800 rounded-4xl p-4 w-60 text-center bg-cyan-700">
              <p className="font-bold text-white">Weight %</p>
              <input type="number" placeholder="30" className="border-gray-100/60 mt-2 w-full border-3 px-2 py-1 text-white rounded-xl text-center focus:outline-none focus:ring-0 focus:border-cyan-500" value={activeBasketItem?.currentWeight ?? ''}onChange={(e) => {const newValue = Number(e.target.value);
          setActiveBasketItem({ ...activeBasketItem,currentWeight: newValue, });
    
          // Also update it in the basket array
          setBasket((prev) =>
            prev.map((item) =>
              item.id === activeBasketItem.id
                ? { ...item, currentWeight: newValue }
                : item));}}
            />
            </div>
        </div>
      </div>
    </div>
)}

      {/* New Box Underneath */}
      <div className="flex justify-center">
        <div className="bg-white border-8 border-cyan-700 rounded-xl p-10 w-full max-w-7xl">
          <div className="flex gap-8">
            {/* Left: Scrollable list */}
            <div className="w-1/3 h-60 overflow-y-auto border-6 border-gray-100 rounded-xl">
              {INDICATORS.map((indicator) => (
                <div
                  key={indicator.id}
                  className={`rounded-2xl p-3 text-gray-800 cursor-pointer ${selected?.id === indicator.id ? "bg-cyan-300 font-bold border-cyan-400 border-4 border-black" : ""}`} 
                  onClick={() => setSelected(indicator)}>
                
                  {indicator.name}
                </div>
              ))}
            </div>

            {/* Right: Info box */}
            <div className="w-2/3 h-60 border-6 border-gray-100 rounded-xl p-4 text-gray-800 text-center">
              <div>
                {selected ? 
                (<><h3 className="py-2 font-bold">{selected.name}</h3><p>{selected.description}</p></>): 
                ("Select an indicator to see details")}
              </div>

              <div className = "py-10 text-center">
                <button
                onClick={() => {if (!selected) return; setBasket((prev) => {const alreadyAdded = prev.some((item) => item.id === selected.id);
                  if (alreadyAdded) return prev;
                  return [...prev, selected]
                  ;});}}
                  className="text-white font-bold border-cyan-400 bg-cyan-300 inline-block text-l border-4  px-4 py-2 rounded-xl hover:bg-cyan-500 transition">Add To Basket
                </button>


              </div>
            </div>

          </div>
        </div>
      </div>

    
     {/* Stocks Box Title */}
<div className="mt-8 flex flex-col items-center">
  <p className="text-white text-center mb-5 text-l" style={{ fontFamily: "Ethnocentric, sans-serif" }}>
    {assetType==="stock"? "Current Stocks": "Current ETF"}
  </p>
      {/* Scrollable List */}
  <div className="bg-white w-320 max-h-80 overflow-y-auto border-7 border-cyan-700 rounded-md mb-8">
    {stockBasket.length === 0 ? (
      <p className="text-gray-400 italic p-3">{assetType==="stock"?"No Stocks Added": "No ETF Added"}</p>
    ) : (
      stockBasket.map((item) => (
        <div
          key={item.id}
          className={`p-3 border-b border-gray-200 text-gray-800 cursor-pointer ${
            selectedStock?.id === item.id ? "bg-gray-200 font-bold" : ""
          }`}
          onClick={() => setSelectedStock(item)}
        >
          {item.name}
        </div>
      ))
    )}
  </div>

    {/* Asset Type Selector */}
<div className="text-center mb-6">
  <h3 className="text-white font-bold mb-3">
    Choose Asset Type</h3>

  <div className="flex justify-center gap-6">
    {/* STOCK */}
    <button
      onClick={() => setAssetType("stock")}
      className={`px-6 py-3 rounded-xl border-4 font-bold transition-all
        ${
          assetType === "stock"? 
              "bg-cyan-400 border-cyan-600 text-black scale-105"
            : "bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
        }`}
    >
      📈 STOCK
    </button>

    {/* ETF */}
    <button
      onClick={() => setAssetType("etf")}
      className={`px-6 py-3 rounded-xl border-4 font-bold transition-all ${assetType === "etf"? 
              "bg-purple-400 border-purple-500 text-black scale-105"
            : "bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
        }`}>🧺 ETF
    </button>
  </div>
</div>

    

    {/* ADD STOCKS SECTION */}
    <div>
      
      <h2 className="text-white text-center transition-all"style={{fontFamily: "Ethnocentric, sans-serif"}}>{assetType==="stock"?"ADD STOCKS": "ADD ETF"}</h2>

      <div className="text-center">
      <input type="text"placeholder={assetType==="stock"?"AAPL": "SPY"}value={newStock}onChange={(e) => setNewStock(e.target.value)}className="text-center bg-white mt-2 w-60 border px-2 py-1 mb-5"
/>
      <button onClick={() => {if (!newStock) return;

        const alreadyAdded = stockBasket.some((item) => item.id.toLowerCase() === newStock.toLowerCase());
      if (alreadyAdded) return;
        
        const stockItem = {
          id: newStock,
          name: newStock,
          description: "Custom stock",
          
          
        };
        setStockBasket((prev) => [...prev, stockItem]);
        
        setNewStock(""); // clear input
        
        
      }}
      className="text-white font-bold bg-cyan-400 inline-block text-l border-3 border-cyan-700 px-4 py-1 rounded-md hover:bg-green-500 transition hover:border-green-600">Add To Basket
      </button>


      </div>
    </div>
    
    <div>
      <h3 className="text-center text-white mt-10 text-xl mb-7"style={{fontFamily: "Ethnocentric, sans-serif"}}>Simulation Settings</h3>
    </div>

    <div className="border-6 w-160 h-60 border-cyan-700 bg-white rounded-4xl">
  <div
    className="grid grid-cols-[220px_1fr] gap-x-19 gap-y-6 py-7 px-12 text-xl items-center"
    style={{ fontFamily: "Ethnocentric, sans-serif" }}
  >
    {/* Row 1 */}
    <h4 className="text-black text-right whitespace-nowrap">
      Time Frame (YRS)
    </h4>
    <input
      type="number"
      className="border-gray-400/60 w-full border-3 py-1 text-black rounded-xl text-center focus:outline-none focus:ring-0 focus:border-gray-200"
      placeholder="Enter 1-10"/>

    {/* Candle Interval */}
<h4 className="text-black text-right whitespace-nowrap">
  Candle Interval
</h4>
<select
  className="border-gray-400/60 w-full border-3 py-1 text-black rounded-xl text-center bg-white
             focus:outline-none focus:ring-0 focus:border-gray-200"
>
  <option value="60m">1 Hour</option>
  <option value="30m">30 Minutes</option>

  <option value="300m">5 Hours</option>
  <option value="1440m">Daily</option>
</select>

    {/* Row 3 */}
    <h4 className="text-black">
  Starting Equity
  <span className="ml-1 text-xs text-gray-400">(thousands)</span>
</h4>
  
    <input
      type="number"
      className="border-gray-400/60 w-full border-3 py-1 text-black rounded-xl text-center focus:outline-none focus:ring-0 focus:border-gray-200"
      placeholder="10000"/>
  </div>
</div>



  </div>
</div>
  );
}