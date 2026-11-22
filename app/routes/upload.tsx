import React, {type FormEvent, useState} from "react";
import Navbar from "~/components/Navbar";
import FileUploader from "~/components/FileUploader";
import {usePuterStore} from "~/lib/puter";
import {useNavigate} from "react-router";
import {convertPdfToImage} from "~/lib/pdf2image";
import {generateUUID} from "~/lib/utils";
import {prepareInstructions} from "../../constants";

const Upload = () => {

    const {auth, isLoading, fs, ai, kv} = usePuterStore();
  const [isProcessing, setProcessing] = useState(false);
  const navigate = useNavigate();
  const [statusText, setStatusText] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleFileSelect = (file: File | null) => {
      setFile(file);
  }

  const handleAnalyze = async ({companyName, jobTitle, jobDescription, file}: {companyName: string, jobTitle: string, jobDescription: string, file: File}) => {
    setProcessing(true);

    setStatusText("Uploading the file...");
    const uploadedFile = await fs.upload([file]);
    if(!uploadedFile)   return setStatusText("Error: Failed to upload file");

    setStatusText("Converting to image...");
    const imageFile = await convertPdfToImage(file);
    if(!imageFile.file) return setStatusText("Error: Failed to convert pdf to image");

    setStatusText("Uploading the image...");
    const uploadedImage = await fs.upload([imageFile.file]);
    if(!uploadedImage)  return setStatusText("Error: Failed to upload image");

    setStatusText("Preparing data...");

    const uuid = generateUUID();
    const data = {
        id : uuid,
        resumePath: uploadedFile.path,
        imagePath: uploadedImage.path,
        companyName, jobTitle, jobDescription,
        feedback: '',
    }

    await kv.set(`resume${uuid}`, JSON.stringify(data));
    setStatusText("Analyzing...");

    const feedback = await ai.feedback(
        uploadedFile.path,
        prepareInstructions({jobTitle, jobDescription})
    );

    if(!feedback)   return setStatusText("Error: Failed to analyze resume");

    let feedbackText = typeof feedback.message.content === 'string'
      ? feedback.message.content : feedback.message.content[0]?.text;
    if (!feedbackText) return setStatusText("Error: Empty feedback from AI");

    // Strip markdown code block wrappers (```json ... ```) if present
    feedbackText = feedbackText.replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim();
    data.feedback = JSON.parse(feedbackText);
    await kv.set(`resume${uuid}`, JSON.stringify(data));
    setStatusText("Analysis completed, redirecting...");
    navigate(`/resume/${uuid}`);
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.currentTarget.closest('form');
      if(!form)    return;
      const formData = new FormData(form);

      const companyName = formData.get('company-name') as string;
      const jobTitle = formData.get('job-title') as string;
      const jobDescription = formData.get('job-description') as string;

      if(!file) return;

      handleAnalyze({companyName, jobTitle, jobDescription, file});
  }

  return (
      <main className="bg-[#0a0e1a] min-h-screen">
        <Navbar/>
        <section className="max-w-3xl mx-auto px-6 py-20">
          {/* Page heading */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight">
              Upload Your Resume
            </h1>
            <p className="mt-4 text-lg text-[#94A3B8] max-w-xl mx-auto leading-relaxed">
              Upload your resume and let ResumeIQ analyze your strengths and help you improve your next career opportunity.
            </p>
          </div>

          {isProcessing ? (
            <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
              {/* Animated spinner with glow */}
              <div className="relative w-24 h-24 flex items-center justify-center mb-8">
                {/* Outer glow */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/30 to-blue-500/30 blur-2xl" />
                {/* Spinner ring */}
                <div className="relative w-24 h-24">
                  <svg className="w-24 h-24 animate-spin" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#26334D"
                      strokeWidth="6"
                      fill="none"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="url(#spinner-grad)"
                      strokeWidth="6"
                      fill="none"
                      strokeDasharray="251.2"
                      strokeDashoffset="62.8"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="spinner-grad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#8B5CF6" />
                        <stop offset="100%" stopColor="#3B82F6" />
                      </linearGradient>
                    </defs>
                  </svg>
                  {/* Document icon in center */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-8 h-8 text-[#8B5CF6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Heading */}
              <h2 className="text-2xl md:text-3xl font-bold text-[#F8FAFC]">
                Analyzing Your Resume
              </h2>

              {/* Description */}
              <p className="mt-4 text-[#94A3B8] max-w-md leading-relaxed">
                We're reviewing your resume to identify strengths and opportunities for improvement.
              </p>

              {/* Processing status */}
              {statusText && (
                <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#111C32] border border-[#26334D]">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8B5CF6]/60"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8B5CF6]"></span>
                  </span>
                  <span className="text-sm text-[#94A3B8]">{statusText}</span>
                </div>
              )}
            </div>
          ) : (
            <form id="upload-form" onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="form-div">
                <label htmlFor="company-name">Company Name</label>
                <input type="text" name="company-name" placeholder="Company Name" id="company-name"/>
              </div>
              <div className="form-div">
                <label htmlFor="job-title">Job Title</label>
                <input type="text" name="job-title" placeholder="Job Title" id="job-title"/>
              </div>
              <div className="form-div">
                <label htmlFor="job-description">Job Description</label>
                <textarea rows={5} name="job-description" placeholder="Job Description" id="job-description"/>
              </div>
              <div className="form-div">
                <label htmlFor="uploader">Upload Resume</label>
                <FileUploader onFileSelect={handleFileSelect}/>
              </div>
              <button className="primary-button" type="submit">
                Analyze Resume
              </button>
            </form>
          )}
        </section>
      </main>
  );
};

export default Upload;