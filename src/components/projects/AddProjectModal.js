import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import closeImg from '../../assets/images/close-icon.png';
import { useAddProjectsMutation } from '../../features/projects/projectsApi';
import Button from '../ui/Button';
import RoundedButton from '../ui/RoundedButton';
const AddProjectModal = ({ setControl }) => {
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTeam, setSelectedTeam] = useState(undefined);
  const [addProjects, {}] = useAddProjectsMutation();
  const { user } = useSelector((state) => state.auth);
  const { teams } = useSelector((state) => state.teams) || {};

  const handleAddProject = () => {
    if (!selectedTeam && !description && !projectName) {
      alert('Fill up the form !');
    } else if (!selectedTeam) {
      alert('Select A Team!');
    } else if (!description) {
      alert('Add a description');
    } else if (!projectName) {
      alert('Add a project name');
    } else {
      addProjects({
        projectName,
        description,
        column: 'Backlog',
        creator: user,
        date: new Date().getTime(),
        teamname: selectedTeam?.title,
        color: selectedTeam?.color,
        teammembers: selectedTeam?.members,
      });
      setControl('');
      setSelectedTeam('');
      setDescription('');
      setSelectedTeam('');
    }
  };
  return (
    <div
      id="close"
      onClick={(e) => {
        if (e.target.id === 'close') {
          setControl(false);
        }
      }}
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center z-50 w-full h-full"
      style={{ marginLeft: 0 }}
    >
      <div className="rounded  w-[400px] lg:w-[600px] space-y-8 bg-white p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
        <img
          src={closeImg}
          className="w-5"
          onClick={() => setControl(false)}
          alt="alt"
        />

        <h1 className="text-center text-3xl text-gray-700 mb-5">
          Add a Project
        </h1>

        <div className="flex flex-col  space-y-3">
          <input
            type="text"
            placeholder="Enter a Project Name"
            onChange={(e) => setProjectName(e.target.value)}
            value={projectName}
          />
          <textarea
            type="text"
            placeholder="Enter a Line About Project"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
          <div>Select A Team To Your Project:</div>
          <div className="flex my-1">
            {teams?.teams?.map((team) => (
              <RoundedButton
                selectedTeam={selectedTeam}
                text={team.title}
                onClick={() => setSelectedTeam(team)}
                key={team.id}
              />
            ))}
          </div>
        </div>
        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
          <Button
            className="bg-slate-400 text-white active:bg-indigo-300 "
            onClick={handleAddProject}
          >
            Add A Project
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddProjectModal;
