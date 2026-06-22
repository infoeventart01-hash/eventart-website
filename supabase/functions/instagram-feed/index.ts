const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const token = Deno.env.get("INSTAGRAM_ACCESS_TOKEN");

  if (!token) {
    return new Response(JSON.stringify({ posts: [] }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  }

  const fields = "id,caption,media_type,media_url,permalink,thumbnail_url,timestamp";
  const url = `https://graph.instagram.com/me/media?fields=${fields}&limit=6&access_token=${token}`;
  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    return new Response(JSON.stringify({ error: data.error?.message || "Instagram request failed" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: response.status,
    });
  }

  return new Response(JSON.stringify({ posts: data.data || [] }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
    status: 200,
  });
});
