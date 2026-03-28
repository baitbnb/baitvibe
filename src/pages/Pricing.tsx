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
      <section className="pt-32 pb-24 px-[6vw]">
        <div className="text-center mb-16">
          <p className="font-mono-ibm text-[11px] tracking-[3px] uppercase text-cyan mb-3">
            // Pricing
          </p>
          <h1
            className="font-display font-extrabold leading-tight mb-4"
            style={{ fontSize: "clamp(36px, 5vw, 60px)" }}
          >
            Simple,{" "}
            <span className="bg-gradient-to-r from-gold to-cyan bg-clip-text text-transparent">
              Transparent
            </span>{" "}
            Pricing
          </h1>
          <p className="text-muted-foreground text-base max-w-[500px] mx-auto">
            Choose the plan that fits your tweet game. Upgrade or downgrade
            anytime.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center">
            <div className="animate-pulse text-muted-foreground">Loading plans...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans?.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-2xl border p-6 flex flex-col transition-all ${
                  plan.is_popular
                    ? "border-gold/40 bg-gold/[0.04] shadow-[0_0_40px_hsl(var(--gold)/0.1)]"
                    : "border-border bg-bg-2"
                }`}
              >
                {plan.is_popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-gold to-cyan text-primary-foreground text-[11px] font-bold px-4 py-1 rounded-full">
                    Most Popular
                  </div>
                )}

                <h3 className="font-display text-xl font-bold mb-1">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-5">{plan.description}</p>

                <div className="mb-6">
                  <span className="font-display text-4xl font-extrabold">
                    ${plan.price}
                  </span>
                  {plan.interval !== "one_time" && (
                    <span className="text-muted-foreground text-sm">/{plan.interval}</span>
                  )}
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 rounded-lg font-bold text-sm transition-all ${
                    plan.is_popular
                      ? "bg-gradient-to-br from-gold to-[hsl(30,40%,48%)] text-primary-foreground shadow-[0_0_20px_hsl(var(--gold)/0.3)] hover:-translate-y-0.5"
                      : "border border-border text-foreground hover:border-gold/40 hover:text-gold"
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
