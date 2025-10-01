export async function GET(request, { params }) {
  try {
    // params async hai, isliye await karein
    const resolvedParams = await params;
    const slug = resolvedParams.slug.join("/");

    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();

    const apiUrl = `${process.env.NEXT_PUBLIC_LEAFYMANGO_API_URL}/${slug}${
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
    console.error("GET API error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal Server Error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function POST(request, { params }) {
  try {
    const resolvedParams = await params;
    const slug = resolvedParams.slug.join("/");

    const body = await request.json();
    const incomingAuthHeader = request.headers.get("authorization");
    const apiUrl = `${process.env.NEXT_PUBLIC_LEAFYMANGO_API_URL}/${slug}`;

    const fetchOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
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
    console.error("POST API error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal Server Error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const resolvedParams = await params;
    const slug = resolvedParams.slug.join("/");

    const body = await request.json();
    const incomingAuthHeader = request.headers.get("authorization");
    const apiUrl = `${process.env.NEXT_PUBLIC_LEAFYMANGO_API_URL}/${slug}`;

    const fetchOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
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
    console.error("PUT API error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal Server Error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const resolvedParams = await params;
    const slug = resolvedParams.slug.join("/");
    const incomingAuthHeader = request.headers.get("authorization");
    const apiUrl = `${process.env.NEXT_PUBLIC_LEAFYMANGO_API_URL}/${slug}`;

    const fetchOptions = {
      method: "DELETE",
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

    let data = null;
    try {
      data = await response.json();
    } catch {
      data = null;
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("DELETE API error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal Server Error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

