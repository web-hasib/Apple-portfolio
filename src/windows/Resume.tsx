// import { Download } from "lucide-react";
// import WindowControls from "../components/WindowControls";
// import WindowWrapper from "../hoc/WindowWraper";
// import { Document, Page, pdfjs } from "react-pdf";
// import "react-pdf/dist/Page/AnnotationLayer.css";
// import "react-pdf/dist/Page/TextLayer.css";

// pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worder.min.mjs",
//     import.meta.url,

// ).toString();


// const Resume = () => {
//   return (
//     <>
//       <div id="window-header">
//         <WindowControls target="resume" />
//         <h2>Resume.pdf</h2>
//         <a
//           href="../../public/files/resume.pdf"
//           download={true}
//           className="cursor-pointer"
//           title="Download resume"
//         >
//           <Download size={20} className="icon" />
//         </a>
//       </div>

//       <Document file="files/resume.pdf">
//         <Page pageNumber={1} renderTextLayer renderAnnotationLayer />
//         </Document>

//     </>
//   );
// };
// const ReusmeWindow = WindowWrapper(Resume, "resume");
// export default ReusmeWindow;





"use client";

import { Download } from "lucide-react";
import WindowControls from "../components/WindowControls";
import WindowWrapper from "../hoc/WindowWraper";

import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// MUST BE CORRECT
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const Resume = () => {
  return (
    <>
      {/* Window Header */}
      <div id="window-header">
        <WindowControls target="resume" />
        <h2>Resume.pdf</h2>

        {/* Download Button */}
        <a
          href="/files/resume.pdf"
          download
          className="cursor-pointer"
          title="Download resume"
        >
          <Download size={20} className="icon" />
        </a>
      </div>

      {/* PDF Viewer Container */}
      <div
        style={{
        //   height: "calc(100vh - 80px)",
          overflow: "auto",
          padding: "10px",
        }}
      >
        <Document 
          file="/files/resume.pdf"
          loading={<p className="text-center">Loading PDF…</p>}
          error={<p className="text-red-500 text-center">Failed to load PDF</p>}
        >
          <Page
            pageNumber={1}
            renderTextLayer={true}
            renderAnnotationLayer={true}
            width={600} // you can adjust this
          />
        </Document>
      </div>
    </>
  );
};

const ResumeWindow = WindowWrapper(Resume, "resume");
export default ResumeWindow;
