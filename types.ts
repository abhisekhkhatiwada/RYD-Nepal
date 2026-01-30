
export interface ServicePlan {
  id: string;
  name: string;
  price: string;
  period: string;
  features: string[];
  isPopular?: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BenefitItem {
  title: string;
  description: string;
  icon: string;
}
