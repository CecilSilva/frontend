
import Image from "next/image";
import Link from "next/link";

export default function Home(){
  return(
    <>
      
    


      <main className="flex flex-col items-center justify-center text-center py-10 bg-gray-800 dark:bg-gray-900">
        
        {/* Graphic */}
        <Image
          src="/images/stock-image-cartoon.png"
          alt="Trading Graphic"
          width={1400}  // adjust size
          height={300} // adjust size
          className="mb-7 transition-transform duration-300 hover:scale-110 hover:opacity-70"
        />
        <h1 className="text-5xl font-bold mb-6 text-white dark:text-white">Welcome To The Haven Project</h1>
        <p className = "text-lg text-white dark:text-gray-300 max-w-xxl mb-8">Your all-in-one platform for trading | backtesting and AI-powered strategies.</p>
        <a href = "/backtesting" className = "px-6 py-3 bg-cyan-500 text-white font-bold rounded-lg hover:bg-green-400 transition-colors duration-200">Backtest Today </a>
      </main>


        <section className="bg-gray-900 text-white py-20 px-24 grid grid-cols-2 gap-0 items-start">
          <div className = "flex flex-col items-center text-center">
            <h2 className="text-3xl text-white font-bold mb-9  ">BackTest With Haven Today</h2>
            <p className="text-xl text-white font-bold max-w-[650px]" >
              Backtesting allows you to evaluate your trading ideas using real historical market data—before 
              risking any money. HAVEN’s backtester gives you clear performance metrics, visual trade analysis, 
              and customizable strategy settings, so you can refine your approach with confidence. Whether you're experimenting with 
              simple indicators or testing advanced algorithmic systems, our tools help you understand how your strategy would have performed 
              in real market conditions.</p>
          </div>

          <div className = "flex flex-col items-center text-center"> 
          {/* Graphic */}
          <Image
            src="/images/clock-cartoon.png"
            alt="Clock"
            width={300}  // adjust size
            height={300} // adjust size
            className="mb-5 transition-transform duration-300 hover:scale-110 hover:opacity-70"
            />
          </div>

        </section>


        <section className="bg-gray-800 text-white py-12 px-24 grid grid-cols-2 gap-0 items-start mb-0">
          <div className = "flex flex-col items-center text-center">
           <Image
            src="/images/ai-cartoon.png"
            alt="Robot"
            width={350}  // adjust size
            height={300} // adjust size
            className="mb-7  transition-transform duration-300 hover:scale-110 hover:opacity-70"
            />

            
          </div>
         <div className = "flex flex-col items-center text-center py-15">
           <h3 className="text-3xl text-white font-bold mb-9  ">Change Your Strategy With A.I.</h3>
           <p className = "text-xl text-white font-bold max-w-[650px] ">
            Harness the power of AI to refine, optimize, and adapt your trading strategy in real time. HAVEN’s intelligent tools analyze market 
            behavior, detect patterns, and generate data-driven insights—helping you trade smarter, faster, and with confidence.</p>
         </div>
    
        </section>
      
        <section className="bg-gray-900 text-white py-15 px-24 grid grid-cols-2 gap-10">
          <div className = "flex flex-col items-center text-center">
            <h4 className=" text-3xl text-white font-bold mb-9 self-">Testing Indicators</h4>
            <p className="text-xl text-white font-bold max-w-[550px]" >
              Analyze how individual indicators perform before adding them to your strategy. HAVEN lets you test moving averages, 
              RSI, MACD, volume signals, and more using real historical data. See how each indicator reacts to different market conditions, 
              understand its strengths and limitations, and build smarter strategies backed by data—not guesses.</p>
          </div>

          <div className = "flex flex-col items-center text-center">
          {/* Graphic */}
          <Image
            src="/images/indicator-cartoon.png"
            alt="Clock"
            width={300}  // adjust size
            height={300} // adjust size
            className="mb-5 transition-transform duration-300 hover:scale-110 hover:opacity-70"
            />
          </div>

        </section>


        <section className="bg-gray-800 text-white py-12 px-24 items-start mb-0">
            

          <div className = "flex flex-col items-center text-center py-0 ">
            <Image
              src="/images/contact-cartoon.png"
              alt="Phone"
              width={100}  // adjust size
              height={300} // adjust size
              className="  transition-transform duration-300 hover:scale-110 hover:opacity-70 mb-9"
              />
          </div>

          <div className = "flex flex-col items-center text-center">
            <h3 className="text-3xl text-white font-bold mb-9  ">Get In Touch With A Haven Representative Today!</h3>
            <p className = "text-xl text-white font-bold max-w-[650px] mb-12">
              Have questions or need help getting started? Our Haven team is here to guide you. Whether you're exploring backtesting, 
              AI-powered strategies, or platform features, a dedicated representative will provide clear, personalized support to help 
              you make the most of your trading journey.</p>
            <a href = "/backtesting" className = "px-4 text-2xl text-white font-bold bg-cyan-400 border-white rounded-xl hover:bg-cyan-600 transition-all duration-250">Contact Us</a>
          </div>
          </section>






      <footer className="w-full bg-gray-900 text-white py-8 mt-0">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h4 className="text-xl font-bold ml-12">HAVEN</h4>
            <p className="text-gray-400 text-sm">Your trusted trading toolkit.</p>
          </div>

          <div className="flex space-x-6 text-gray-300 text-sm mr-0">
            <a href="#" className="hover:text-cyan-400">About</a>
            <a href="#" className="hover:text-cyan-400">Contact</a>
            <a href="#" className="hover:text-cyan-400">Privacy</a>
            <a href="#" className="hover:text-cyan-400">Terms</a>
          </div>
          </div>

       
      </footer>
    </>




  );
}