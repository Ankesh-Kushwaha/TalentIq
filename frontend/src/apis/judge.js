const BASE_URL = import.meta.env.VITE_BASE_URL;

export const runCodeAPI = async ({
  userId,
  problemId,
  code,
  language,
  token
}) => {
  try {
   
    if (!token) {
      alert("please first login to run");
      return;
    }

    const res = await fetch(`${BASE_URL}/submission`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // ✅ ADD THIS
      },
      body: JSON.stringify({
        userId,
        problemId,
        language,
        codebody: code,
      }),
    });

    if (!res.ok) {
      throw new Error("Run code failed");
    }

    const data = await res.json();

    return {
      output: data.output ?? "",
      runtime: `${data.runtime ?? 0} ms`,
      memory: `${data.memory ?? 0} MB`,
    };
  } catch (err) {
    console.error("runCodeAPI error:", err);
    return {
      output: "Error running code",
      runtime: "-",
      memory: "-",
    };
  }
};


export const submitCodeAPI = async ({
  userId,
  problemId,
  code,
  language,
  token
}) => {
  try {
   if (!token) {
      alert("please first login to submit");
      return;
    }

    const res = await fetch(`${BASE_URL}/submission`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // ✅ ADD THIS
      },
      body: JSON.stringify({
        userId,
        problemId,
        language,
        codebody: code,
      }),
    });

    if (!res.ok) {
      throw new Error("Submit failed");
    }

    return await res.json();
  } catch (err) {
    console.error("submitCodeAPI error:", err);
    throw err;
  }
};

