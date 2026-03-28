import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Check } from "lucide-react";

interface PricingPlan {
  id: string;
  name: string;
  description: string | null;
  price: number;
  currency: string;
  interval: string;
  features: string[];
  is_popular: boolean;
  sort_order: number;
}

const Pricing = () => {
  const { data: plans, isLoading } = useQuery({
    queryKey: ["pricing-plans"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("pricing_plans")
        .select("*")
        .eq("is_active", true)
        .order("sort_order");
      if (error) throw error;
      return data as PricingPlan[];
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-28 pb-20 px-6 lg:px-10">
        <div className="text-center mb-14">
          <p className="font-mono-ibm text-[11px] tracking-[3px] uppercase text-primary mb-2">// Pricing</p>
          <h1 className="font-display font-black text-3xl md:text-5xl leading-tight mb-3">
            Simple, <span className="text-primary">Transparent</span> Pricing
          </h1>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            Choose the plan that fits your tweet game. Upgrade anytime.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center">
            <div className="animate-pulse text-muted-foreground text-sm">Loading plans...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border rounded overflow-hidden max-w-4xl mx-auto">
            {plans?.map((plan) => (
              <div
                key={plan.id}
                className={`relative p-6 flex flex-col ${
                  plan.is_popular ? 'bg-primary/[0.03]' : 'bg-card'
                }`}
              >
                {plan.is_popular && (
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-primary" />
                )}

                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-display text-lg font-bold">{plan.name}</h3>
                  {plan.is_popular && (
                    <span className="text-[9px] font-mono-ibm uppercase tracking-wider bg-primary text-primary-foreground px-2 py-0.5 rounded">Popular</span>
                  )}
                </div>
                <p className="text-muted-foreground text-[13px] mb-5">{plan.description}</p>

                <div className="mb-5">
                  <span className="font-display text-3xl font-black">${plan.price}</span>
                  {plan.interval !== "one_time" && (
                    <span className="text-muted-foreground text-sm">/{plan.interval}</span>
                  )}
                </div>

                <ul className="space-y-2.5 mb-6 flex-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-[13px]">
                      <Check className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-2.5 rounded text-[13px] font-bold transition-all ${
                    plan.is_popular
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'border border-border text-foreground hover:border-primary hover:text-primary'
                  }`}
                >
                  {plan.price === 0 ? "Get Started Free" : "Subscribe"}
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
};

export default Pricing;
