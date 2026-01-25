export const runCodeAPI = async ({ code, language, input }) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        output: "[0,1]",
        runtime: "3 ms",
        memory: "6.4 MB",
      });
    }, 900);
  });
};

export const submitCodeAPI = async ({ code, language }) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        verdict: "Accepted",
        runtime: "3 ms",
        memory: "6.4 MB",
      });
    }, 1200);
  });
};
