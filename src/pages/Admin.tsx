import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { Trash2, Plus, Star } from "lucide-react";
import { toast } from "sonner";

interface PricingPlan {
  id: string;
  name: string;
  description: string | null;
  price: number;
  currency: string;
  interval: string;
  features: string[];
  is_popular: boolean;
  is_active: boolean;
  sort_order: number;
}

const Admin = () => {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: 0,
    interval: "month",
    features: "",
    is_popular: false,
    sort_order: 0,
  });

  const { data: plans, isLoading } = useQuery({
    queryKey: ["admin-pricing-plans"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("pricing_plans")
        .select("*")
        .order("sort_order");
      if (error) throw error;
      return data as PricingPlan[];
    },
  });

  const createMutation = useMutation({
    mutationFn: async () => {
      const featuresArray = form.features
        .split("\n")
        .map((f) => f.trim())
        .filter(Boolean);
      const { error } = await supabase.from("pricing_plans").insert({
        name: form.name,
        description: form.description || null,
        price: form.price,
        interval: form.interval,
        features: featuresArray,
        is_popular: form.is_popular,
        sort_order: form.sort_order,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-pricing-plans"] });
      queryClient.invalidateQueries({ queryKey: ["pricing-plans"] });
      setShowForm(false);
      setForm({ name: "", description: "", price: 0, interval: "month", features: "", is_popular: false, sort_order: 0 });
      toast.success("Plan created!");
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("pricing_plans").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-pricing-plans"] });
      queryClient.invalidateQueries({ queryKey: ["pricing-plans"] });
      toast.success("Plan deleted!");
    },
    onError: (err: Error) => toast.error(err.message),
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 pb-24 px-[6vw] max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="font-mono-ibm text-[11px] tracking-[3px] uppercase text-cyan mb-1">// Admin</p>
            <h1 className="font-display text-3xl font-extrabold">Manage Pricing Plans</h1>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-gold/10 border border-gold/40 text-gold text-sm font-semibold px-4 py-2 rounded-lg hover:bg-gold/20 transition-all"
          >
            <Plus className="w-4 h-4" /> Add Plan
          </button>
        </div>

        {showForm && (
          <div className="border border-border rounded-xl bg-bg-2 p-6 mb-8">
            <h3 className="font-display text-lg font-bold mb-4">New Pricing Plan</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Name *</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground"
                  placeholder="Pro"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Price (USD) *</label>
                <input
                  type="number"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                  className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Interval</label>
                <select
                  value={form.interval}
                  onChange={(e) => setForm({ ...form, interval: e.target.value })}
                  className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground"
                >
                  <option value="month">Monthly</option>
                  <option value="year">Yearly</option>
                  <option value="one_time">One-time</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Sort Order</label>
                <input
                  type="number"
                  value={form.sort_order}
                  onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })}
                  className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground"
                />
              </div>
              <div className="col-span-2">
                <label className="text-xs text-muted-foreground mb-1 block">Description</label>
                <input
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground"
                  placeholder="For serious Web3 builders"
                />
              </div>
              <div className="col-span-2">
                <label className="text-xs text-muted-foreground mb-1 block">Features (one per line)</label>
                <textarea
                  value={form.features}
                  onChange={(e) => setForm({ ...form, features: e.target.value })}
                  className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground min-h-[100px]"
                  placeholder={"Unlimited tweets\nAll styles\nAnalytics"}
                />
              </div>
              <div className="col-span-2 flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.is_popular}
                  onChange={(e) => setForm({ ...form, is_popular: e.target.checked })}
                  className="rounded"
                />
                <label className="text-sm text-muted-foreground">Mark as popular</label>
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => createMutation.mutate()}
                disabled={!form.name || createMutation.isPending}
                className="bg-gradient-to-br from-gold to-[hsl(30,40%,48%)] text-primary-foreground font-bold text-sm px-6 py-2.5 rounded-lg disabled:opacity-50"
              >
                {createMutation.isPending ? "Creating..." : "Create Plan"}
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="border border-border text-muted-foreground text-sm px-6 py-2.5 rounded-lg hover:text-foreground transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="text-muted-foreground">Loading...</div>
        ) : (
          <div className="space-y-3">
            {plans?.map((plan) => (
              <div
                key={plan.id}
                className="flex items-center justify-between border border-border rounded-xl bg-bg-2 p-5"
              >
                <div className="flex items-center gap-4">
                  {plan.is_popular && <Star className="w-4 h-4 text-gold fill-gold" />}
                  <div>
                    <div className="font-display font-bold flex items-center gap-2">
                      {plan.name}
                      {!plan.is_active && (
                        <span className="text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded">
                          Inactive
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      ${plan.price}/{plan.interval} · {plan.features.length} features
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (confirm(`Delete "${plan.name}"?`)) {
                      deleteMutation.mutate(plan.id);
                    }
                  }}
                  className="text-destructive hover:bg-destructive/10 p-2 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Admin;
