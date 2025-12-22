"use client";
import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const INDICATORS = [
  { id: "rsi", name: "RSI", fullName: "Relative Strength Index", description: "A momentum oscillator that measures the speed and change of price movements to identify overbought or oversold conditions.", currentBuyWindow: 14, currentSellWindow:14, currentBuyThreshold: 70, currentSellThreshold: 30, currentWeight: 25 },
  { id: "sma", name: "SMA", fullName: "Simple Moving Average", description: "A trend-following indicator that calculates the average of a selected range of prices, smoothing out price fluctuations to identify the underlying trend.", currentBuyWindow: 20, currentSellWindow:20, currentBuyThreshold: 0, currentSellThreshold: 0, currentWeight: 25 },
  { id: "ema", name: "EMA", fullName: "Exponential Moving Average", description: "A moving average that places greater weight on recent prices to respond more quickly to new information compared to a simple moving average.", currentBuyWindow: 12, currentSellWindow:12, currentBuyThreshold: 0, currentSellThreshold: 0, currentWeight: 25 },
  { id: "macd", name: "MACD", fullName: "Moving Average Convergence Divergence", description: "A trend-following momentum indicator that shows the relationship between two moving averages of a security’s price to indicate bullish or bearish momentum.", currentBuyWindow: 26, currentSellWindow:26, currentBuyThreshold: 0, currentSellThreshold: 0, currentWeight: 25 },
  { id: "bollinger", name: "Bollinger Bands", fullName: "Bollinger Bands", description: "A volatility indicator that plots bands above and below a moving average to indicate overbought or oversold levels based on price deviations.", currentBuyWindow: 20, currentSellWindow:20, currentBuyThreshold: 2, currentSellThreshold: 2, currentWeight: 25 },
  { id: "stoch", name: "Stochastic Oscillator", fullName: "Stochastic Oscillator", description: "A momentum indicator comparing a particular closing price to a range of prices over a period to identify potential trend reversals.", currentBuyWindow: 14, currentSellWindow:14, currentBuyThreshold: 80, currentSellThreshold: 20, currentWeight: 25 },
  { id: "adx", name: "ADX", fullName: "Average Directional Index", description: "A trend strength indicator that quantifies the strength of a trend without indicating its direction, useful for identifying strong trends.", currentBuyWindow: 14, currentSellWindow:14, currentBuyThreshold: 25, currentSellThreshold: 0, currentWeight: 25 },
  { id: "obv", name: "OBV", fullName: "On-Balance Volume", description: "A cumulative volume-based indicator that relates volume flow to price changes, helping to predict potential bullish or bearish moves.", currentBuyWindow: 0, currentSellWindow:0, currentBuyThreshold: 0, currentSellThreshold: 0, currentWeight: 25 },
  { id: "cci", name: "CCI", fullName: "Commodity Channel Index", description: "A versatile indicator that measures the deviation of the price from its statistical mean to detect cyclical trends and overbought/oversold conditions.", currentBuyWindow: 20, currentSellWindow:20, currentBuyThreshold: 100, currentSellThreshold: -100, currentWeight: 25 },
  { id: "atr", name: "ATR", fullName: "Average True Range", description: "A volatility indicator that measures the degree of price movement for a given period, helping to identify market volatility and potential stop-loss levels.", currentBuyWindow: 14, currentSellWindow:14, currentBuyThreshold: 0, currentSellThreshold: 0, currentWeight: 25 },
];


export default function BacktestingPage() {
  const [selected, setSelected] = useState<any>(null);
  const [selectedStock, setSelectedStock] = useState<any>(null);
  const [basket, setBasket] = useState<any[]>([]);
  const [activeBasketItem, setActiveBasketItem] = useState<any>(null);

  const [timeFrameYears, setTimeFrameYears] = useState<number>(2);
  const [candleInterval, setCandleInterval] = useState<string>("60");
  const [startingEquity, setStartingEquity] = useState<number>(100);
  const [stockNumber, setStockNumber] = useState<number>(10);

  const [stockBasket, setStockBasket] = useState<any[]>([]);
  const [newStock, setNewStock] = useState("");
  const [assetType, setAssetType] = useState<"stock" | "etf">("stock");
  const pieData = basket.map((item) => ({name: item.name,value: item.currentWeight}));
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28FFF', '#FF6699', '#33CC99', '#FF9933'];
  const totalWeight = basket.reduce((sum, item) => sum + (Number(item.currentWeight) || 0),0);
  

  // Test downlaod for JSON//
  const downloadSimulationPayload = () => {
  const payload = buildSimulationPayload();

  const json = JSON.stringify(payload, null, 2); // pretty-print
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "simulation-payload.json";
  a.click();

  URL.revokeObjectURL(url);
};
  //Building json for backend this is the block of info in one variable//
  const buildSimulationPayload = () => {return {
    assetType,
    assets: stockBasket.map((s) => s.id),
    simulation: {
      timeFrameYears,
      candleInterval,
      startingEquity,
    },

    indicators: basket.map((indicator) => ({
      id: indicator.id,
      window: indicator.currentWindow,
      highThreshold: indicator.currentHighThreshold,
      lowThreshold: indicator.currentLowThreshold,
      weight: indicator.currentWeight,})),};};
  


  //Run simulation function (This function sends the info to the backend when clicking the run button)//
  const runSimulation = async () => {
  const payload = buildSimulationPayload();

  console.log("Sending simulation payload:", payload);
  try {
    const res = await fetch("/api/run-simulation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error("Simulation request failed");
    }

    const data = await res.json();
    console.log("Simulation result:", data);
  } catch (err) {
    console.error(err);
  }
};


  // Handle stock upload constant is A.I.
  const handleStockUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];if (!file) return;const reader = new FileReader();reader.onload = (event) => {const text = event.target.result?.toString();
    if (!text) return;
    // Split by newlines or commas
    const symbols = text.replace(/\r/g, "").split(/[\n,]+/).map((s) => s.trim().toUpperCase()).filter(Boolean);
    // Add to stockBasket (avoid duplicates)
      setStockBasket((prev) => {const existing = new Set(prev.map((s) => s.id));const newStocks = symbols.filter((s) => !existing.has(s)).map((s) => ({
          id: s,name: s,description: "Uploaded stock",}));return [...prev, ...newStocks];});};reader.readAsText(file);};

  return (

  <div className="bg-gray-700 min-h-800 p-10 justify-center items-start text-center">
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
      




  
         {/* Settings + Pie */}
        <div className="flex justify-center gap-12 mt-8 items-center mb-10">
      
        {/* LEFT: Indicator Settings */}
          <div className=" w-200   rounded-xl p-6  py-6 justify-center">
        {/* Header with the indicator name */}
            <h2 className="text-white text-2xl font-bold text-center mb-4">{activeBasketItem.name}  Buy Settings</h2>


            <div className="flex gap-4">

            {/* Window For Buying*/}
            <div className="border-4 border-cyan-800 rounded-4xl p-4 w-60 text-center bg-cyan-700">
              <p className="font-bold text-white">Window</p>
              <input type="number" className="border-gray-100/60 mt-2 w-full border-3 px-2 py-1 text-white rounded-xl text-center focus:outline-none focus:ring-0 focus:border-cyan-500" value={activeBasketItem?.currentBuyWindow ?? ''}onChange={(e) => {const newValue = Number(e.target.value);
            setActiveBasketItem({ ...activeBasketItem,currentBuyWindow: newValue, });
      
            // Also update it in the basket array
            setBasket((prev) =>
              prev.map((item) =>
                item.id === activeBasketItem.id
                  ? { ...item, currentWindow: newValue }
                  : item));}}
              />
            </div>
            {/* Threshold For Buying*/}
              <div className="border-4 border-cyan-800 rounded-4xl p-4 w-60 text-center bg-cyan-700">
                <p className="font-bold text-white">Buying Threshold</p>
                <input type="number" placeholder="50" className="border-gray-100/60 mt-2 w-full border-3 px-2 py-1 text-white rounded-xl text-center focus:outline-none focus:ring-0 focus:border-cyan-500" value={activeBasketItem?.currentBuyThreshold ?? ''}onChange={(e) => {const newValue = Number(e.target.value);
            setActiveBasketItem({ ...activeBasketItem,currentBuyThreshold: newValue, });
      
            // Also update it in the basket array
            setBasket((prev) =>
              prev.map((item) =>
                item.id === activeBasketItem.id
                  ? { ...item, currentBuyThreshold: newValue }
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
            
            {/* INDICATOR SELLING SETTINGS */}
            <div className="">
              <h2 className="mt-5 text-white text-2xl font-bold text-center mb-4">{activeBasketItem.name} Sell Settings</h2>
              <div className="flex gap-4 justify-center">
              {/* Window For Sell*/}
            <div className="border-4 border-cyan-800 rounded-4xl p-4 w-60 text-center bg-cyan-700">
              <p className="font-bold text-white">Window</p>
              <input type="number" className="border-gray-100/60 mt-2 w-full border-3 px-2 py-1 text-white rounded-xl text-center focus:outline-none focus:ring-0 focus:border-cyan-500" value={activeBasketItem?.currentSellWindow ?? ''}onChange={(e) => {const newValue = Number(e.target.value);
            setActiveBasketItem({ ...activeBasketItem,currentSellWindow: newValue, });
      
            // Also update it in the basket array
            setBasket((prev) =>
              prev.map((item) =>
                item.id === activeBasketItem.id
                  ? { ...item, currentSellWindow: newValue }
                  : item));}}
              />
            </div>
            {/* Threshold For Sell*/}
              <div className="border-4 border-cyan-800 rounded-4xl p-4 w-60 text-center bg-cyan-700">
                <p className="font-bold text-white">Selling Threshold</p>
                <input type="number" placeholder="50" className="border-gray-100/60 mt-2 w-full border-3 px-2 py-1 text-white rounded-xl text-center focus:outline-none focus:ring-0 focus:border-cyan-500" value={activeBasketItem?.currentSellThreshold ?? ''}onChange={(e) => {const newValue = Number(e.target.value);
            setActiveBasketItem({ ...activeBasketItem,currentSellThreshold: newValue, });
      
            // Also update it in the basket array
            setBasket((prev) =>
              prev.map((item) =>
                item.id === activeBasketItem.id
                  ? { ...item, currentSellThreshold: newValue }
                  : item));}}
              />
                
              </div>
            </div>

          </div>

        </div>

          {/* RIGHT: Weight Pie Chart */}
            {basket.length > 0 && (
    <div className="bg-white border-6 border-cyan-700 rounded-xl p-6 w-96 h-[320px] flex flex-col items-center">
      <h3
        className="text-center text-lg mb-3 text-gray-800"
        style={{ fontFamily: "Ethnocentric, sans-serif" }}
      >
        Weight Distribution
      </h3>

      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            innerRadius={55}
            outerRadius={95}
            paddingAngle={3}
            onClick={(data) => {
              const clicked = basket.find(i => i.name === data.name);
              setActiveBasketItem(clicked);
            }}
          >
            {pieData.map((_, index) => (
              <Cell
                key={index}
                fill={[
                  "#06b6d4",
                  "#22c55e",
                  "#a855f7",
                  "#f59e0b",
                  "#ef4444",
                  "#3b82f6",
                ][index % 6]}
              />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
        
        
      </ResponsiveContainer>
      <h4 className={` max-w-80 mt-4 font-bold ${totalWeight === 100 ? "text-green-400" : "text-red-400"}`}>Total Basket Weight: {totalWeight}%</h4>
      
            </div>)}
          </div>
        </div>
      
    
)}

      {/* ADD INDICATORS / New Box Underneath */}
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
                (<><h3 className="py-2 font-bold">{selected.name} - {selected.fullName}</h3><p>{selected.description}</p></>): 
                ("Select an indicator to see details")}
              </div>

              <div className = "py-17 text-center">
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
    {stockBasket.length === 0 ? 
    (<p className="text-gray-400 italic p-3">{assetType==="stock"?"No Stocks Added": "No ETF Added"}</p>) : 
    (stockBasket.map((item) => (
    <div
      key={item.id}
      onClick={() => setSelectedStock(item)}
      className={`flex items-center justify-between p-3 border-b border-gray-200 cursor-pointer
        ${selectedStock?.id === item.id ? "bg-gray-200 font-bold" : "text-gray-800"}`}>
      {/* Stock name */}
      <span>{item.name}</span>

      {/* Remove button (only when selected) */}
      {selectedStock?.id === item.id && 
      (<button onClick={(e) => {e.stopPropagation();
            setStockBasket((prev) =>prev.filter((s) => s.id !== item.id));setSelectedStock(null);}}
          className="ml-4 px-2 py-1 text-sm font-bold text-white bg-red-500 rounded hover:bg-red-600">✕</button>)}
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
              "bg-purple-400 border-purple-500 text-black scale-105"
              
            : "bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
        }`}
    >
      📈 STOCK
    </button>

    {/* ETF */}
    <button
      onClick={() => setAssetType("etf")}
      className={`px-6 py-3 rounded-xl border-4 font-bold transition-all ${assetType === "etf"? 
              "bg-cyan-400 border-cyan-600 text-black scale-105"
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
      className={`text-white font-bold text-l border-3 px-4 py-1 rounded-md hover:bg-green-500 transition inline-block hover:border-green-600 
      ${assetType != "stock"?  "bg-cyan-400 border-cyan-700":"bg-purple-400 border-purple-400"   }`}>Add To Basket
      </button>


      </div>
        <div className="mt-5">
          
          {assetType === "stock" ? ( 
            <>
            <input
            type="file"
            accept=".txt,.csv"
            onChange={(e) => handleStockUpload(e)}
            className="hidden"
            id="stockUpload"/><label
                                htmlFor="stockUpload"
                                className="cursor-pointer text-white font-bold bg-purple-400 px-4 py-2 rounded-md hover:bg-purple-500 transition"
                                >📂 Upload Stock List</label></>):(null)}

        </div>
    </div>
    
    <div>
      <h3 className="text-center text-white mt-10 text-xl mb-7"style={{fontFamily: "Ethnocentric, sans-serif"}}>Simulation Settings</h3>
    </div>

    <div className="border-7 w-200 h-85 border-cyan-700 bg-white rounded-4xl">
      <div
        className="grid grid-cols-[220px_1fr] gap-x-19 gap-y-6 py-7 px-12 text-xl items-center"
        style={{ fontFamily: "Ethnocentric, sans-serif" }}>
    {/*Time frame*/}
        <h4 className="text-black flex flex-wrap items-baseline whitespace-nowrap">Time Frame
  <span className="ml-1 text-xs text-gray-400 whitespace-nowrap">
    In Years | Select 0-10
  </span>
</h4>
    <input
      type="number"
      value={timeFrameYears}
      onChange={(e) => setTimeFrameYears(Number(e.target.value))}
      className="border-gray-400/60 w-full border-3 py-1 text-black rounded-xl text-center focus:outline-none focus:ring-0 focus:border-gray-200"
      placeholder="Enter 1-10"/>

    {/* Candle Interval */}
    <h4 className="text-black flex flex-wrap items-baseline whitespace-nowrap">Candle Interval
  <span className="ml-1 text-xs text-gray-400 whitespace-nowrap">
    Select From Dropdown
  </span>
</h4>
<select
  value={candleInterval}
  onChange={(e) => setCandleInterval(e.target.value)}
  className="border-gray-400/60 w-full border-3 py-1 text-black rounded-xl text-center bg-white
             focus:outline-none focus:ring-0 focus:border-gray-200"
>
  <option value="60m">1 Hour</option>
  <option value="30m">30 Minutes</option>
  <option value="300m">5 Hours</option>
  <option value="1440m">Daily</option>
</select>

    {/* Starting equity */}
    <h4 className="text-black flex flex-wrap items-baseline whitespace-nowrap">Starting Equity
  <span className="ml-1 text-xs text-gray-400 whitespace-nowrap">
    In Thousands | 0-999
  </span>
</h4>
  
    <input
      type="number"
      value={startingEquity}
      onChange={(e) => setStartingEquity(Number(e.target.value))}
      className="border-gray-400/60 w-full border-3 py-1 text-black rounded-xl text-center focus:outline-none focus:ring-0 focus:border-gray-200"
      placeholder="10000"/>
 


{/* Number of stocks to hold */}
        <h4 className="text-black flex flex-wrap items-baseline whitespace-nowrap">Number Of Stocks
  <span className="ml-1 text-xs text-gray-400 whitespace-nowrap">
    Enter 1-100
  </span>
</h4>
  
    <input
      type="number"
      value={stockNumber}
      onChange={(e) => setStockNumber(Number(e.target.value))}
      className="border-gray-400/60 w-full border-3 py-1 text-black rounded-xl text-center focus:outline-none focus:ring-0 focus:border-gray-200"
      placeholder="10000"/>
  </div>

  <div>
    <button 
    onClick={runSimulation}
    className="text-l py-3 px-8 border-6 border-cyan-700 bg-cyan-500 rounded-2xl text-white font-bold 
    hover:bg-green-400 transition hover:border-green-600"style={{ fontFamily: "Ethnocentric, sans-serif" }}> Run Simulation
    
    </button>
  </div>




    </div>
  </div>
</div>
  );
}