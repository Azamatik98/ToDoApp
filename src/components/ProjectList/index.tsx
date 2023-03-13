import React from "react";
import { Droppable, DragDropContext, DropResult } from "react-beautiful-dnd";
import style from "./TaskList.module.scss";
import ProjectListItem from "./ProjectListItem";
import ProjectCreate from "./ProjectCreate";
import { TProject } from "../../types/project";
import { getLocalProjects, updateLocalProjects } from "../../localStorage";

interface TaskListProps {}

const TaskList: React.FC<TaskListProps> = () => {
  const [projects, setProjects] = React.useState<TProject[]>(
    getLocalProjects() || []
  );

  React.useEffect(() => {
    updateLocalProjects(projects);
  }, [projects]);

  const addProject = (item: TProject) => {
    setProjects((prevState) => [...prevState, item]);
  };

  const deleteTask = (id: string) => {
    if (window.confirm("Delete task?")) {
      setProjects((prevState) => prevState.filter((item) => item.id !== id));
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.index === destination.index) return;
    let list = [...projects];
    [list[source.index], list[destination.index]] = [
      list[destination.index],
      list[source.index],
    ];
    setProjects(list);
  };

  return (
    <div className={style.wrapper}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="TaskList">
          {(provided) => (
            <div
              className={style.list}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {projects.map((project, i) => (
                <ProjectListItem
                  key={project.id}
                  deleteTask={deleteTask}
                  {...project}
                  index={i}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <ProjectCreate addProject={addProject} />
    </div>
  );
};

export default TaskList;
