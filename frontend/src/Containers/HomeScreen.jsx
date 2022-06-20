import Header from "../Components/Header";
import ClientsScreen from "./ClientsScreen";
import ProjectsScreen from "./ProjectsScreen";

const HomeScreen = () => {
  return (
    <>
      <Header />
      <div className="container">
        <ProjectsScreen />
        <ClientsScreen />
      </div>
    </>
  );
};

export default HomeScreen;
