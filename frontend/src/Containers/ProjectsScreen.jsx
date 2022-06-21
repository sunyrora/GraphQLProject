import { gql, useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import AddProjectModal from "../Components/AddProjectModal";
import Project from "../Components/Project";
import Spinner from "../Components/Spinner";
import { ADD_PROJECT, DELETE_PROJECT } from "../mutations/projectMutations";
import { GET_PROJECTS } from "../queries/projectQueries";

const ProjectsScreen = () => {
  const {
    loading: projectsLoading,
    error: projectsError,
    data: projectsDdata,
  } = useQuery(GET_PROJECTS);
  const [loading, setLoading] = useState(projectsLoading);
  const [error, setError] = useState("");

  const [addProject, { loading: addLoading, error: addError }] = useMutation(
    ADD_PROJECT,
    {
      update(cache, { data: { addProject } }) {
        cache.modify({
          fields: {
            projects(existing = []) {
              const newProject = cache.writeFragment({
                data: addProject,
                fragment: gql`
                  fragment newProject on Project {
                    id
                    name
                    description
                    status
                    client {
                      id
                    }
                  }
                `,
              });
              return [...existing, newProject];
            },
          },
        });
      },
    }
  );

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    update: (cache, { data: { deleteProject } }) => {
      const normalizedId = cache.identify({
        id: deleteProject.id,
        __typename: "Project",
      });
      cache.evict({ id: normalizedId });
      cache.gc();
    },
  });

  useEffect(() => {
    setLoading(projectsLoading);
  }, [projectsLoading]);

  const addProjectHandler = async (e, project) => {
    e.preventDefault();

    try {
      await addProject({ variables: { ...project } });
    } catch (error) {
      console.error("addProject Error: ", error.message);
      setError(error.message);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  const deletHandler = (e, projectId) => {
    e.preventDefault();
    deleteProject({ variables: { id: projectId } });
  };

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : projectsError ? (
        <h2>{`Error Projects Screen: ${projectsError.message}`}</h2>
      ) : (
        <div>
          <div className="row">
            <div className="col">
              <AddProjectModal handleSubmit={addProjectHandler} />
            </div>
          </div>
          <div className="row mb-3">
            {projectsDdata.projects.map((project) => (
              <Project
                key={project.id}
                project={project}
                deletHandler={deletHandler}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsScreen;
