import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Navigation />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/rooms" element={<div className="min-h-screen pt-16 flex items-center justify-center"><h1 className="text-4xl">Rooms & Apartments - Coming Soon</h1></div>} />
              <Route path="/gallery" element={<div className="min-h-screen pt-16 flex items-center justify-center"><h1 className="text-4xl">Gallery - Coming Soon</h1></div>} />
              <Route path="/services" element={<div className="min-h-screen pt-16 flex items-center justify-center"><h1 className="text-4xl">Services - Coming Soon</h1></div>} />
              <Route path="/contact" element={<div className="min-h-screen pt-16 flex items-center justify-center"><h1 className="text-4xl">Contact - Coming Soon</h1></div>} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
