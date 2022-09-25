import React from 'react';
import { useDrop } from 'react-dnd';
import PlusImage from '../../assets/images/PlusImage';
import { COLUMN_NAMES } from '../../utils/constants';
import { ItemTypes } from '../../utils/ItemTypes';

const Column = ({ children, title, id, length, setControl }) => {
  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: () => ({ name: title, id: id }),
  });
  return (
    <>
      <div
        ref={drop}
        className="flex flex-col flex-shrink-0"
        style={{ width: 232 }}
      >
        <div className="flex items-center flex-shrink-0 h-10 px-2">
          <span className="block text-sm font-semibold">{title}</span>
          <span className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30">
            {length}
          </span>
          {title === COLUMN_NAMES.BACKLOG && (
            <button
              className="flex items-center justify-center w-6 h-6 ml-auto text-indigo-500 rounded hover:bg-indigo-500 hover:text-indigo-100"
              onClick={() => setControl(true)}
            >
              <PlusImage />
            </button>
          )}
        </div>
        <div className="flex flex-col pb-2 overflow-auto">{children}</div>
      </div>
    </>
  );
};

export default Column;
