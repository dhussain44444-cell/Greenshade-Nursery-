/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryGrid } from './components/CategoryGrid';
import { PlantCatalog } from './components/PlantCatalog';
import { GardeningTips } from './components/GardeningTips';
import { LandscapingServices } from './components/LandscapingServices';
import { AIPlantDoctor } from './components/AIPlantDoctor';
import { PlantMatchQuiz } from './components/PlantMatchQuiz';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationAndContact } from './components/LocationAndContact';
import { Footer } from './components/Footer';
import { PlantDetailModal } from './components/PlantDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { BackToTop } from './components/BackToTop';
import { Plant, CartItem } from './types';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');

  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Wishlist State
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);

  // Selected Plant Modal State
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);

  // Selected Category filter state
  const [selectedCategoryName, setSelectedCategoryName] = useState<string | null>(null);

  // AI Plant Doctor Pre-fill State
  const [doctorPlantContext, setDoctorPlantContext] = useState<string | undefined>(undefined);

  const handleAddToCart = (plant: Plant, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.plant.id === plant.id);
      if (existing) {
        return prev.map((i) =>
          i.plant.id === plant.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { plant, quantity }];
    });
  };

  const handleUpdateCartQuantity = (plantId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveCartItem(plantId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.plant.id === plantId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveCartItem = (plantId: string) => {
    setCartItems((prev) => prev.filter((item) => item.plant.id !== plantId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleToggleWishlist = (plant: Plant) => {
    setWishlistIds((prev) =>
      prev.includes(plant.id) ? prev.filter((id) => id !== plant.id) : [...prev, plant.id]
    );
  };

  const handleAskDoctorAboutPlant = (plantName: string) => {
    setDoctorPlantContext(plantName);
    setActiveSection('plant-doctor');
    const elem = document.getElementById('plant-doctor');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectCategory = (categoryName: string) => {
    setSelectedCategoryName(categoryName);
    setActiveSection('catalog');
    const elem = document.getElementById('catalog');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  const totalCartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <div className="min-h-screen bg-[#f7faf5] text-slate-900 flex flex-col font-sans selection:bg-emerald-300 selection:text-emerald-950">
      {/* Top Header */}
      <Header
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => {
          setActiveSection('catalog');
          const elem = document.getElementById('catalog');
          if (elem) elem.scrollIntoView({ behavior: 'smooth' });
        }}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onCategorySelect={handleSelectCategory}
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        <Hero
          onExploreCatalog={() => {
            setActiveSection('catalog');
            document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
          }}
          onBookServices={() => {
            setActiveSection('services');
            document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
          }}
          onConsultDoctor={() => {
            setActiveSection('plant-doctor');
            document.getElementById('plant-doctor')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        <CategoryGrid
          onSelectCategory={handleSelectCategory}
          onViewAllCategories={() => {
            setSelectedCategoryName(null);
            setActiveSection('catalog');
            document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        <PlantCatalog
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlistIds}
          onSelectPlant={setSelectedPlant}
          onAskDoctorAboutPlant={handleAskDoctorAboutPlant}
          selectedCategoryName={selectedCategoryName}
        />

        <GardeningTips onAskDoctor={handleAskDoctorAboutPlant} />

        <LandscapingServices />

        <AIPlantDoctor initialPlantName={doctorPlantContext} />

        <PlantMatchQuiz
          onSelectPlant={setSelectedPlant}
          onAddToCart={handleAddToCart}
        />

        <ReviewsSection />

        <LocationAndContact />
      </main>

      {/* Footer */}
      <Footer setActiveSection={setActiveSection} />

      {/* Floating Back To Top Button matching Screenshots */}
      <BackToTop />

      {/* Modals & Drawers */}
      <PlantDetailModal
        plant={selectedPlant}
        onClose={() => setSelectedPlant(null)}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={selectedPlant ? wishlistIds.includes(selectedPlant.id) : false}
        onAskDoctor={handleAskDoctorAboutPlant}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
