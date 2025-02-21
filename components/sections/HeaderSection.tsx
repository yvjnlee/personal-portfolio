function ArrowIcon() {
    return (
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
          fill="currentColor"
        />
      </svg>
    );
  }
  
  export default async function HeaderSection() {
    return (
      <>
        <h1 className="text-3xl font-semibold tracking-tighter">
          eugene lee
        </h1>
  
        <ul className="font-sm mb-2 flex flex-col space-x-0 space-y-2 text-neutral-600 md:flex-row md:space-x-4 md:space-y-0 dark:text-neutral-300">
          <li>
            <a
              className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
              href="mailto:e33lee@uwaterloo.ca"
            >
              <ArrowIcon />
              <p className="ml-2 h-7">email</p>
            </a>
          </li>
          <li>
            <a
              className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
              rel="noopener noreferrer"
              target="_blank"
              href="https://www.linkedin.com/in/ygnlee"
            >
              <ArrowIcon />
              <p className="ml-2 h-7">linkedin</p>
            </a>
          </li>
          <li>
            <a
              className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
              rel="noopener noreferrer"
              target="_blank"
              href="https://github.com/yvjnlee"
            >
              <ArrowIcon />
              <p className="ml-2 h-7">github</p>
            </a>
          </li>
          <li>
            <a
              className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
              rel="noopener noreferrer"
              target="_blank"
              href="https://leetcode.com/u/yvjnlee/"
            >
              <ArrowIcon />
              <p className="ml-2 h-7">leetcode</p>
            </a>
          </li>
          <li>
            <a
              className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
              href="/resume/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              type="application/pdf"
            >
              <ArrowIcon />
              <p className="ml-2 h-7">resume</p>
            </a>
          </li>
        </ul>
  
        <p className="mb-8">
          hi there! i'm a 3A studying computer engineering student at the university of waterloo. 
          my current interests include ai, quantum computing, quantitative finance, and crypto. 
        </p>
      </>
    );
  }