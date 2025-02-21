import fs from 'fs';
import { Resume } from 'types';
import { Education, Project, Skill, WorkExperience } from 'types';

export function readLatexFile(filePath: string): string {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return content;
  } catch (error) {
    throw new Error(`Error reading LaTeX file: ${error.message}`);
  }
}

function extractSections(latex: string): Record<string, string> {
  const sectionRegex = /\\section\{(.*?)\}([\s\S]*?)(?=(\\section\{|\\end\{document\}))/g;
  const sections: Record<string, string> = {};

  let match;
  while ((match = sectionRegex.exec(latex)) !== null) {
    const sectionName = match[1].trim(); // Extract section name
    let content = match[2].trim(); // Extract section content

    // Clean up content: Remove custom macros and redundant commands
    content = content
      .replace(/\\resumeSubHeadingList(Start|End)/g, '') // Remove list start/end markers
      .replace(/\\resumeItemList(Start|End)/g, '') // Remove item list start/end markers
      // .replace(/\\[a-zA-Z]+(\[.*?\])?(\{.*?\})?/g, '') // Remove other LaTeX commands
      .replace(/%.*$/gm, '') // Remove comments
      .trim();

    sections[sectionName] = content;
  }
  return sections;
}

function parseEducation(content: string): Education[] {
  const educationRegex = /\{(.*?)\}\s*\{(.*?)\}\s*\{(.*?)\}/g;
  const education: Education[] = [];

  let match: RegExpExecArray | null;
  while ((match = educationRegex.exec(content)) !== null) {
    education.push({
      id: crypto.randomUUID(),
      institution: match[1].trim(),
      degree: match[3].trim(),
      startDate: "", // Not provided in the input
      graduationDate: match[2].replace(/\\textbf\{(.*?)\}/, '$1').trim(),
      honors: [],
    });
  }

  return education;
}

export function parseExperience(content: string): WorkExperience[] {
  const subheadingRegex = /\\resumeSubheading\s*\{(.*?)\}\s*\{(.*?)\}\s*\{(.*?)\}\s*\{(.*?)\}/g;
  const itemRegex = /\\resumeItem\s*{([^}]+)}/g;

  const experience: WorkExperience[] = [];

  // Pre-process content just to handle line continuations
  const preprocessedContent = content
    .replace(/\\\s*\n\s*/g, ' ') // Replace line continuations with space
    .replace(/\n+/g, '\n');      // Normalize newlines

  // Get all subheading matches
  const matches: RegExpExecArray[] = [];
  let subheadingMatch: RegExpExecArray | null;
  while ((subheadingMatch = subheadingRegex.exec(preprocessedContent)) !== null) {
    matches.push(subheadingMatch);
  }

  for (let i = 0; i < matches.length; i++) {
    const match = matches[i];
    const companyName = match[3].trim();

    // Extract block content
    const blockStart = match.index + match[0].length;
    const blockEnd = i < matches.length - 1 ? matches[i + 1].index : preprocessedContent.length;
    const blockContent = preprocessedContent.substring(blockStart, blockEnd).trim();

    // First: Get raw descriptions
    const rawDescriptions: string[] = [];
    let itemMatch: RegExpExecArray | null;
    const itemRegexInstance = new RegExp(itemRegex);
    
    while ((itemMatch = itemRegexInstance.exec(blockContent)) !== null) {
      rawDescriptions.push(itemMatch[0]);
    }

    // Now clean them
    const cleanedDescriptions = rawDescriptions.map(desc => {
      return desc
        .replace(/\\resumeItem\s*{/, '')     // Remove resumeItem opening
        .replace(/\\textbf\{([^}]+)\}/g, '$1')  // Clean textbf
        .replace(/\\textit\{([^}]+)\}/g, '$1')  // Clean textit
        .replace(/\\\\/g, '')                // Remove double backslashes
        .replace(/\\%/g, '%')                // Fix percentage signs
        .replace(/(\d+)\\%/g, '$1%')         // Fix percentage numbers
        .trim();
    });

    experience.push({
      id: crypto.randomUUID(),
      companyName: companyName.replace(/\\textbf\{([^}]+)\}/g, '$1').trim(),
      jobTitle: match[1].replace(/\\textbf\{([^}]+)\}/g, '$1').trim(),
      location: match[2].replace(/\\textbf\{([^}]+)\}/g, '$1').trim(),
      startDate: match[4].includes("--") ? match[4].split("--")[0].trim() : match[4].trim(),
      endDate: match[4].includes("--") ? match[4].split("--")[1].trim() : undefined,
      description: cleanedDescriptions
    });
  }

  return experience;
}

function parseProjects(content: string): Project[] {
  const projectRegex = /\{(.*?)\}\{(.*?)\}\{(.*?)\}/g;
  const descriptionRegex = /\\resumeItem\{(.*?)\}/g;
  const projects: Project[] = [];

  let match;
  while ((match = projectRegex.exec(content)) !== null) {
    const descriptions: string[] = [];
    let descMatch;

    // Extract descriptions for the current project
    while ((descMatch = descriptionRegex.exec(content)) !== null) {
      descriptions.push(descMatch[1].trim());
    }

    projects.push({
      id: crypto.randomUUID(),
      name: match[1].trim(),
      description: descriptions.join(' '),
      technologies: match[3].split(',').map((tech) => tech.trim()),
      url: match[2]?.trim(),
      completedDate: '', // Not provided
    });
  }

  return projects;
}

function parseSkills(content: string): Skill[] {
  const skillRegex = /: (.*?)\\\\/g;
  const skills: Skill[] = [];

  let match;
  while ((match = skillRegex.exec(content)) !== null) {
    const skillList = match[1].split(',').map((skill) => skill.trim());
    skillList.forEach((skill) => {
      skills.push({
        id: crypto.randomUUID(),
        skillName: skill.replace(/\\./g, match => match[1] || ''),
      });
    });
  }

  return skills;
}

export function parseLatexResume(filePath: string): Resume {
  const latexContent = readLatexFile(filePath);
  const sections = extractSections(latexContent);

  return {
    education: parseEducation(sections['Education'] || ''),
    experience: parseExperience(sections['Experience'] || ''),
    projects: parseProjects(sections['Projects'] || ''),
    skills: parseSkills(sections['Skills'] || ''),
  };
}
