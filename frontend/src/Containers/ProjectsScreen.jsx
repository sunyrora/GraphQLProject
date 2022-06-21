import { gql, useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import AddProjectModal from "../Components/AddProjectModal";
import Project from "../Components/Project";
import Spinner from "../Components/Spinner";
import {
  ADD_PROJECT,
  deletProjectRequest,
} from "../mutations/projectMutations";
import { GET_PROJECTS } from "../queries/projectQueries";

const ProjectsScreen = () => {
  const {
    loading: projectsLoading,
    error: projectsError,
    data: projectsDdata,
  } = useQuery(GET_PROJECTS);
  const [loading, setLoading] = useState(projectsLoading);
  const [error, setError] = useState("");

  const [addProject] = useMutation(ADD_PROJECT, {
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
  });

  // 중복 모듈 빼내기 => deletProjectRequest
  // const [deleteProject] = useMutation(DELETE_PROJECT, {
  //   update: (cache, { data: { deleteProject } }) => {
  //     const normalizedId = cache.identify({
  //       id: deleteProject.id,
  //       __typename: "Project",
  //     });
  //     cache.evict({ id: normalizedId });
  //     cache.gc();
  //   },
  // });

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

  const deleteHandler = (e, projectId) => {
    e.preventDefault();
    deletProjectRequest(projectId);
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
                deleteHandler={deleteHandler}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsScreen;
