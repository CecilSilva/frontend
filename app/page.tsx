

import Image from "next/image";
import Link from "next/link";

export default function Home(){
  return(
    <>
      <header className="w-full p-6 bg-gray-900 text-white flex items-center">
        
        {/*Logo*/}
        <Link href="/">
          <Image
            src="/images/Haven-Logo.png"  // path to your PNG in public/images
            alt="Haven Logo"
            width={250}             // adjust width as needed
            height={0}             // adjust height as needed
            
          />
        </Link>

        <nav className="space-x-25 ml-70 font-sans text-l">
          
          <a href="URL" className="text-white font-bold px-3 py-1 hover:border-b-2 hover:border-cyan-400">Backtesting</a>
          <a href="URL" className="text-white font-bold px-3 py-1 hover:border-b-2 hover:border-cyan-400">About Us</a>
          <a href="URL" className="text-white font-bold px-3 py-1 hover:border-b-2 hover:border-cyan-400">Trading Hub</a>
          <a href="URL" className="text-white font-bold px-3 py-1 hover:border-b-2 hover:border-cyan-400">Strategies</a>
          <a href="URL" className="text-white font-bold px-3 py-1 hover:border-b-2 hover:border-cyan-400">Contact</a>
          <a href="URL" className="text-white font-bold px-3 py-1 hover:border-b-2 hover:border-cyan-400">A.I. In Trading</a>
        </nav>
      </header>
    


      <main className="flex flex-col items-center justify-center text-center py-10 bg-gray-700 dark:bg-gray-900">
        
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
        <a href = "/backtesting" className = "px-6 py-3 bg-cyan-500 text-white font-bold rounded-lg hover:bg-cyan-600 transition-colors duration-200">Learn More </a>
      </main>


        <section className="bg-gray-900 text-white py-20 px-24 grid grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-3xl text-white font-bold mb-9 self-start ml-68">BackTest With Haven Today</h2>
            <p className="text-xl text-white font-bold self-start max-w-[550px] ml-50 text-center" >
              Backtesting allows you to evaluate your trading ideas using real historical market data—before 
              risking any money. HAVEN’s backtester gives you clear performance metrics, visual trade analysis, 
              and customizable strategy settings, so you can refine your approach with confidence. Whether you're experimenting with 
              simple indicators or testing advanced algorithmic systems, our tools help you understand how your strategy would have performed 
              in real market conditions.</p>
          </div>

          <div className="flex justify-center"> 
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


        <section className="bg-gray-800 text-white py-12 px-24 grid grid-cols-2 gap-10 items-start mb-0">
          <div>
           <Image
            src="/images/ai-cartoon.png"
            alt="Robot"
            width={350}  // adjust size
            height={300} // adjust size
            className="mb-7 ml-75 transition-transform duration-300 hover:scale-110 hover:opacity-70"
            />

            
          </div>
         <div className = "py-10">
           <h3 className="text-3xl text-white font-bold mb-9 self-start ml-45">Change Your Strategy With A.I.</h3>
           <p className = "text-xl text-white font-bold max-w-[550px] ml-30 text-center">
            Harness the power of AI to refine, optimize, and adapt your trading strategy in real time. HAVEN’s intelligent tools analyze market 
            behavior, detect patterns, and generate data-driven insights—helping you trade smarter, faster, and with confidence.</p>
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