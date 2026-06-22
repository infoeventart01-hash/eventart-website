-- Run this in the Supabase SQL editor before using the EventArt admin dashboard.
create extension if not exists "pgcrypto";

create table if not exists public.portfolio_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null check (
    category in ('Weddings', 'Birthdays', 'Baby Showers', 'Corporate Events', 'Luxury Decor')
  ),
  image_path text not null,
  display_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.portfolio_items enable row level security;

drop policy if exists "Public portfolio items are readable" on public.portfolio_items;
drop policy if exists "Authenticated admins can create portfolio items" on public.portfolio_items;
drop policy if exists "Authenticated admins can update portfolio items" on public.portfolio_items;
drop policy if exists "Authenticated admins can delete portfolio items" on public.portfolio_items;

create policy "Public portfolio items are readable"
  on public.portfolio_items
  for select
  using (true);

create policy "Authenticated admins can create portfolio items"
  on public.portfolio_items
  for insert
  to authenticated
  with check (true);

create policy "Authenticated admins can update portfolio items"
  on public.portfolio_items
  for update
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated admins can delete portfolio items"
  on public.portfolio_items
  for delete
  to authenticated
  using (true);

insert into storage.buckets (id, name, public)
values ('eventart-portfolio', 'eventart-portfolio', true)
on conflict (id) do update set public = true;

drop policy if exists "Public portfolio photos are readable" on storage.objects;
drop policy if exists "Authenticated admins can upload portfolio photos" on storage.objects;
drop policy if exists "Authenticated admins can update portfolio photos" on storage.objects;
drop policy if exists "Authenticated admins can delete portfolio photos" on storage.objects;

create policy "Public portfolio photos are readable"
  on storage.objects
  for select
  using (bucket_id = 'eventart-portfolio');

create policy "Authenticated admins can upload portfolio photos"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'eventart-portfolio');

create policy "Authenticated admins can update portfolio photos"
  on storage.objects
  for update
  to authenticated
  using (bucket_id = 'eventart-portfolio')
  with check (bucket_id = 'eventart-portfolio');

create policy "Authenticated admins can delete portfolio photos"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'eventart-portfolio');
