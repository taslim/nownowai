import { Github } from "lucide-react";
import { projects } from "~/lib/projects";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white px-8 py-16 text-gray-800 dark:bg-gray-800 dark:text-gray-100">
      <section className="mx-auto max-w-2xl">
        <h2 className="mb-8 text-xl">Projects</h2>
        <div className="space-y-8">
          {projects.map((project) => (
            <div key={project.title} className="group">
              <div className="mb-1 flex items-center gap-3">
                <a
                  href={
                    project.slug ? `/${project.slug}` : (project.live ?? "#")
                  }
                  className="text-lg text-rose-700 transition-colors hover:underline dark:text-rose-400"
                >
                  {project.title}
                </a>
                {project.github && (
                  <a
                    href={project.github}
                    className="text-gray-400 transition-colors hover:text-rose-700 dark:hover:text-rose-400"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github size={18} />
                  </a>
                )}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {project.description}
              </p>
            </div>
          ))}
        </div>
      </section>
      <footer className="mx-auto mt-16 max-w-2xl pt-8 text-sm text-gray-400 dark:text-gray-500">
        <a href="https://taslim.xyz" className="hover:underline">
          taslim.xyz
        </a>
      </footer>
    </div>
  );
}
