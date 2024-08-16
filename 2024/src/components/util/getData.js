const URL =
  "https://raw.githubusercontent.com/YZRay1119/2024-Mopcon/main/data.json";

export const getData = async () => {
  try {
    const res = await fetch(URL);

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();

    return data;
  } catch (err) {
    throw new Error(err);
  }
};
