import React from 'react';

const RoundedButton = ({
  text,
  onClick,
  color = 'text-gray-500',
  bg = 'bg-gray-200',
  selectedTeam,
}) => {
  return (
    <button
      className={`flex items-center justify-center h-6 px-3 mx-2 text-xs font-semibold ${bg} ${color} ${
        selectedTeam?.teamname === text && 'text-emerald-800 bg-emerald-200'
      } rounded-full`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default RoundedButton;
