import React, { useEffect, useState } from "react";
import { getASingleSubmisiion } from "../apis/problems.api";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowBigRight, ArrowLeft, CheckCircle, XCircle } from "lucide-react";

const AsingleSubmissionPage = () => {
  const { submissionId } = useParams();
  const navigate = useNavigate();
  const [submission, setSubmission] = useState(null);

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    const token = auth?.token;
    if (!token) return;

    const fetchSubmission = async () => {
      try {
        const data = await getASingleSubmisiion(token, submissionId);
        setSubmission(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSubmission();
  }, [submissionId]);

  if (!submission) {
    return (
      <div className="min-h-screen bg-black text-gray-400 flex items-center justify-center">
        Loading submission...
      </div>
    );
  }

  const isAccepted = submission.status === "AC";

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-gray-200 px-6 py-10">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* ===== Header ===== */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-white">
              Submission Details
            </h1>
            <p className="text-gray-400 text-sm">ID: {submission._id}</p>
          </div>

          <button
            onClick={() => {
              navigate(
                `/problem/${submission.problemId._id}?${submission.problemId.slug}`,
              );
            }}
            className="flex text-black items-center gap-2 text-sm bg-white border border-[#1f2937] px-4 py-2 rounded-lg hover:bg-amber-500"
          >
            <ArrowBigRight size={16} />
            Solve again
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <InfoCard title="Problem">
            <p className="text-lg font-semibold text-blue-400">
              {submission.problemId.title}
            </p>
            <p className="text-sm text-gray-400">
              Slug: {submission.problemId.slug}
            </p>
          </InfoCard>

          <InfoCard title="Result">
            <div className="flex items-center gap-2">
              {isAccepted ? (
                <CheckCircle className="text-green-400" />
              ) : (
                <XCircle className="text-red-400" />
              )}
              <span
                className={`font-semibold ${
                  isAccepted ? "text-green-400" : "text-red-400"
                }`}
              >
                {submission.status}
              </span>
            </div>

            <div className="text-sm text-gray-400 mt-2 space-y-1">
              <p>Language: {submission.language}</p>
              <p>Total Time: {submission.totalTime} ms</p>
              <p>
                Submitted: {new Date(submission.createdAt).toLocaleString()}
              </p>
            </div>
          </InfoCard>
        </div>

        <Section title="Source Code">
          <pre className="bg-[#020617] border border-[#1f2937] rounded-lg p-4 overflow-x-auto text-sm text-gray-200">
            {submission.sourceCode}
          </pre>
        </Section>

        {submission.testResults?.length > 0 && (
          <Section title="Testcase Results">
            <div className="max-h-64 overflow-y-auto space-y-3 pr-2">
              {submission.testResults.map((tc, i) => (
                <div
                  key={i}
                  className="flex justify-between bg-[#111] border border-[#1f2937] rounded-lg p-3"
                >
                  <span className="text-gray-400">Testcase #{i + 1}</span>
                  <span
                    className={
                      tc.status === "AC" ? "text-green-400" : "text-red-400"
                    }
                  >
                    {tc.status}
                  </span>
                </div>
              ))}
            </div>
          </Section>
        )}
      </div>
    </div>
  );
};

export default AsingleSubmissionPage;

function InfoCard({ title, children }) {
  return (
    <div className="bg-[#111] border border-[#1f2937] rounded-xl p-6">
      <h2 className="text-sm text-gray-400 mb-2">{title}</h2>
      {children}
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="bg-[#111] border border-[#1f2937] rounded-xl p-6">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
}
