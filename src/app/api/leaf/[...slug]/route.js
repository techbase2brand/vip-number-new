export async function GET(request, { params }) {
  try {
    const resolvedParams = await params;
    const slug = resolvedParams.slug.join("/");

    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();

    const apiLeafyUrl = process.env.NEXT_PUBLIC_LEAFYMANGO; // yahan aapka prod URL

    const apiUrl = `${apiLeafyUrl}/${slug}${
      queryString ? "?" + queryString : ""
    }`;

    const incomingAuthHeader = request.headers.get("authorization");

    const fetchOptions = {
      method: "GET",
      cache: "no-store",
      headers: {},
    };

    if (incomingAuthHeader) {
      fetchOptions.headers["Authorization"] = incomingAuthHeader;
    }

    const response = await fetch(apiUrl, fetchOptions);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Backend error ${response.status}: ${errorText}`);
    }

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Leafymango GET API error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal Server Error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
