import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import Column from '../components/projects/Column';
import ProjectsContainer from '../components/projects/ProjectsContainer';

import { COLUMN_NAMES } from '../utils/constants';
// comment
import { useSelector } from 'react-redux';
import AddProjectModal from '../components/projects/AddProjectModal';
import ProjectCard from '../components/projects/ProjectCard';
import Error from '../components/ui/Error';
import { useGetProjectQuery } from '../features/projects/projectsApi';
const Projects = () => {
  const [items, setItems] = useState();
  const { user } = useSelector((state) => state.auth);
  const { data, isSuccess, isError, error, isLoading } =
    useGetProjectQuery(user?.email) || {};
  let content = null;
  let projectData = [];
  if (isLoading) {
    content = <li className="m-2 text-center">Loading...</li>;
  } else if (!isLoading && isError) {
    content = (
      <li className="m-2 text-center">
        <Error message={error?.data} />
      </li>
    );
  } else if (!isLoading && !isError && data?.length === 0) {
    content = (
      <p className="m-2 text-center text-red-500">
        No Projects found! Please Add{' '}
      </p>
    );
  } else if (!isLoading && !isError && isSuccess && data?.length > 0) {
    projectData = data;
  }

  const isMobile = window.innerWidth < 600;
  //move card in same column
  const moveCardHandler = (dragIndex, hoverIndex) => {
    const dragItem = items[dragIndex];

    if (dragItem) {
      setItems((prevState) => {
        const coppiedStateArray = [...prevState];
        const prevItem = coppiedStateArray.splice(hoverIndex, 1, dragItem);
        coppiedStateArray.splice(dragIndex, 1, prevItem[0]);
        return coppiedStateArray;
      });
    }
  };

  const returnItemsForColumn = (columnName) => {
    return projectData
      .filter((item) => item.column === columnName)
      .map((item, index) => (
        <ProjectCard
          key={item.id}
          item={item}
          setItems={setItems}
          index={index}
          moveCardHandler={moveCardHandler}
        />
      ));
  };

  // const [memberEmail, setMemberEmail] = useState("");
  const [control, setControl] = useState(false);

  return (
    <>
      <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
        <ProjectsContainer content={content}>
          {Object.entries(COLUMN_NAMES).map(([key, column], index) => (
            <Column
              key={index}
              title={column}
              length={returnItemsForColumn(column).length}
              setControl={setControl}
            >
              {returnItemsForColumn(column)}
            </Column>
          ))}
          {control && (
            <AddProjectModal setControl={setControl} control={control} />
          )}
        </ProjectsContainer>
      </DndProvider>
    </>
  );
};
export default Projects;
