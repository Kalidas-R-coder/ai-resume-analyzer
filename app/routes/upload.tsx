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
            <div className="flex flex-col items-center justify-center py-10">
              <h2 className="text-xl font-semibold text-[#F8FAFC] mb-6">{statusText}</h2>
              <img src='/images/resume-scan.gif' className='w-full max-w-md' alt='processing image'/>
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