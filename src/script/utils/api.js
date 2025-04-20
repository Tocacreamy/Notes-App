const BASE_URL = "https://notes-api.dicoding.dev/v2";

export const createNote = async (params) => {
  try {
    const response = await fetch(`${BASE_URL}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

export const getNotes = async () => {
  try {
    const response = await fetch(`${BASE_URL}/notes`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    return { data: [] };
  }
};

export const getArchivedNotes = async () => {
  try {
    const response = await fetch(`${BASE_URL}/notes/archived`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    return { data: [] };
  }
};

export const getSingleNote = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/notes/${id}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    return { data: [] };
  }
};

export const archiveNote = async (params) => {
  try {
    const response = await fetch(`${BASE_URL}/notes/${params.id}/archive`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        archived: params.archived,
      }),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

export const unarchiveNote = async (params) => {
  try {
    const response = await fetch(`${BASE_URL}/notes/${params.id}/unarchive`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        archived: params.archived,
      }),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

export const deleteNote = async (params) => {
  try {
    const response = await fetch(`${BASE_URL}/notes/${params.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
  }
};
