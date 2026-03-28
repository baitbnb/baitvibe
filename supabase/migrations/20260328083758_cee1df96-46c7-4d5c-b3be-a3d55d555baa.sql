-- Allow insert and delete for all authenticated or anon users (no auth yet)
CREATE POLICY "Anyone can insert pricing plans" ON public.pricing_plans FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can delete pricing plans" ON public.pricing_plans FOR DELETE USING (true);
CREATE POLICY "Anyone can update pricing plans" ON public.pricing_plans FOR UPDATE USING (true);
-- Also allow selecting inactive plans for admin
DROP POLICY "Anyone can view active pricing plans" ON public.pricing_plans;
CREATE POLICY "Anyone can view pricing plans" ON public.pricing_plans FOR SELECT USING (true);