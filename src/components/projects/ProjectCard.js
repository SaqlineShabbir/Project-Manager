import moment from 'moment';
import React, { useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useSelector } from 'react-redux';
import Calendar from '../../assets/images/Calendar';
import deleteImg from '../../assets/images/delete-icon.jpg';
import {
  useDeleteProjectMutation,
  useUpdateColumnMutation,
} from '../../features/projects/projectsApi';
import { COLUMN_NAMES } from '../../utils/constants';
import { ItemTypes } from '../../utils/ItemTypes';

const ProjectCard = ({ index, moveCardHandler, item }) => {
  const [showButton, setShowButton] = useState(false);
  const {
    id,
    name,
    description,
    projectName,

    assignTeam,
    column,
    date,
    color,
  } = item;
  const [updateColumn, {}] = useUpdateColumnMutation() || {};
  const { user } = useSelector((state) => state.auth) || {};
  const changeItemColumn = (currentItem, columnName) => {
    updateColumn({
      id,
      data: {
        column: columnName,
        userEmail: user.email,
      },
    });
  };
  const [deleteProject] = useDeleteProjectMutation();
  const ref = useRef(null);

  //this is for vartial drop
  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveCardHandler(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  const handleDeleteProject = () => {
    deleteProject(id);
  };

  //make drag able

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: { index, name, id },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (dropResult) {
        const { name } = dropResult;
        const { BACKLOG, READY, DOING, REVIEW, BLOCKED, DONE } = COLUMN_NAMES;
        switch (name) {
          case BACKLOG:
            changeItemColumn(item, BACKLOG);
            break;
          case READY:
            changeItemColumn(item, READY);
            break;
          case DOING:
            changeItemColumn(item, DOING);
            break;
          case REVIEW:
            changeItemColumn(item, REVIEW);
            break;
          case BLOCKED:
            changeItemColumn(item, BLOCKED);
            break;
          case DONE:
            changeItemColumn(item, DONE);
            break;
          default:
            break;
        }
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.4 : 1;

  drag(drop(ref));

  //search://
  const { searchText } = useSelector((state) => state.filters) || {};
  return (
    <>
      <div
        style={{
          border:
            projectName.toLowerCase().includes(searchText.toLowerCase()) &&
            searchText !== ''
              ? '2px solid pink'
              : '0px',
          opacity,
        }}
        className="relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100"
        draggable="true"
        ref={ref}
        onMouseLeave={() => setShowButton(false)}
      >
        {column === COLUMN_NAMES.BACKLOG && (
          <button className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 mt-3 mr-2 text-gray-500 rounded hover:bg-gray-200 hover:text-gray-700 group-hover:flex">
            <svg
              class="w-4 h-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              onClick={() => setShowButton(true)}
            >
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>
        )}
        <div className="flex">
          <span
            style={{ backgroundColor: `${color}` }}
            className={`flex items-center h-6 px-3 text-xs font-semibold text-${assignTeam?.color}-500 bg-${assignTeam?.color}-100 rounded-full`}
          >
            {projectName}
          </span>
          {showButton && (
            <img
              src={deleteImg}
              alt="alt"
              onClick={handleDeleteProject}
              className="  flex items-center h-5 px-3 text-xs font-semibold rounded-full justify-end"
            />
          )}
        </div>
        <h4 className="mt-3 text-sm font-medium">{description}</h4>
        <div className="flex items-center w-full mt-3 text-xs font-medium text-gray-400">
          <div className="flex items-center">
            <Calendar />
            <span className="ml-1 leading-none">
              {moment(Number(date)).format('MMM Do YY')}
            </span>
          </div>

          <img
            className="w-6 h-6 ml-auto rounded-full"
            src={item?.creator?.photoUrl}
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default ProjectCard;
