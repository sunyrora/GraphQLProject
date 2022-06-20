import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import Project from "../Components/Project";
import Spinner from "../Components/Spinner";
import { GET_PROJECTS } from "../queries/projectQueries";

const ProjectsScreen = () => {
  const {
    loading: projectsLoading,
    error,
    data: projectsDdata,
  } = useQuery(GET_PROJECTS);
  const [loading, setLoading] = useState(projectsLoading);
  useEffect(() => {
    setLoading(projectsLoading);
  }, [projectsLoading]);

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : error ? (
        <h2>{`Error Projects Screen: ${error.message}`}</h2>
      ) : (
        <div className="row mb-3">
          {projectsDdata.projects.map((project) => (
            <Project key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsScreen;
