import { parseLatexResume } from 'app/about/utils';
import path from 'path';

export default async function ResumeSection() {
  const resumePath = path.join(process.cwd(), 'public', 'resume', 'resume.tex');
  const resumeData = await parseLatexResume(resumePath);

  if (!resumeData) return <div>Loading...</div>;

  return (
    <div className="">
      {/* Education */}
      <div className="shadow-sm rounded-lg">
        <h2 className="text-xl font-bold mb-3">Education 🎓</h2>
        {resumeData.education.map((edu, index) => (
          <div key={index} className="mb-3">
            <h3 className="font-bold">{edu.degree}</h3>
            <p>{edu.institution}, {edu.graduationDate}</p>
          </div>
        ))}
      </div>

      <br/>

      {/* Experience */}
      <div className="shadow-sm rounded-lg">
        <h2 className="text-xl font-bold mb-3">Experience 💼</h2>
        {resumeData.experience.map((exp, index) => (
          <div key={index} className="mb-3">
            <h3 className="font-bold">{exp.jobTitle}</h3>
            <p>{exp.companyName}, {exp.startDate} - {exp.endDate || 'Present'}</p>
          </div>
        ))}
      </div>

      <br/>

      {/* Projects */}
      <div className="shadow-sm rounded-lg">
        <h2 className="text-xl font-bold mb-3">Projects 🚀</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
          {resumeData.projects.map((project, index) => (
            <a key={index} href={project.url} target="_blank" rel="noopener noreferrer" className="mb-3 block">
              <div>
                <h3 className="font-bold hover:underline">{project.name}</h3>
                <p>Technologies: {project.technologies.join(', ')}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      <br/>

      {/* Skills - Moved to the top */}
      <div className="shadow-sm rounded-lg">
        <h2 className="text-xl font-bold mb-3">Skills 🔧</h2>
        <div className="flex flex-wrap gap-2">
          {resumeData.skills.map((skill, index) => (
            <span key={index} className="text-xs px-2 py-1 border border-gray-700 rounded-full">{skill.skillName}</span>
          ))}
        </div>
      </div>

    </div>
  );
}