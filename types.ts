import type React from 'react';

// Shared type for call-to-action buttons
export interface ActionButton {
  text: string;
  link: string;
  type: 'primary' | 'secondary';
}

// --- Service Subsection Types ---
export interface FeatureListItem {
  id: number;
  text: string;
}

export interface FeaturesSubsection {
  type: 'features';
  id: number;
  title: string;
  items: FeatureListItem[];
}

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

export interface FaqSubsection {
  type: 'faq';
  id: number;
  title: string;
  items: FaqItem[];
}

export interface PricingTier {
  id: number;
  name: string;
  price: string;
  features: string[];
}

export interface PricingSubsection {
  type: 'pricing';
  id: number;
  title: string;
  tiers: PricingTier[];
}

export type ServiceSubsection = FeaturesSubsection | FaqSubsection | PricingSubsection;

// Main Service type for Admin Panel and Frontend
export interface Service {
  id: number;
  title:string;
  description: string;
  category: string;
  status: 'Active' | 'Inactive';
  sortOrder: number;
  buttons: ActionButton[];
  subsections: ServiceSubsection[];
  icon?: React.ReactElement; // Kept for potential frontend use
}

// Updated Portfolio Item for Admin Panel and Frontend
export interface PortfolioItem {
  id: number;
  image: string;
  gallery?: string[];
  category: string;
  title: string;
  description?: string;
  status: 'Active' | 'Inactive';
  buttons: ActionButton[];
}

// New Page type for Admin Panel
export interface Page {
  id: number;
  title: string;
  content: string;
  status: 'Published' | 'Draft';
  lastModified: string;
}

// New User type for Admin Panel
export interface User {
  id: number;
  name: string;
  email: string;
  role: 'Administrator' | 'Editor' | 'User';
  status: 'Active' | 'Blocked';
  lastLogin: string;
}

// New types for Payments & Plans
export interface SubscriptionPlan {
  id: number;
  name: string;
  priceMonthly: number;
  priceYearly: number;
  features: string[];
  status: 'Active' | 'Inactive';
}

export interface Transaction {
  id: string;
  customerName: string;
  planName: string;
  amount: number;
  date: string;
  status: 'Completed' | 'Pending' | 'Failed';
}


export interface Testimonial {
  quote: string;
  author: string;
  company: string;
  avatar: string;
}

export type Theme = 'dmiRed';

export interface ThemeColors {
  primary: string;
  primaryHover: string;
  accent: string;
  text: string;
  border: string;
  ring: string;
}