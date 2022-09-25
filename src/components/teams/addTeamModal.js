import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useAddTeamMutation } from '../../features/teams/teamsApi';

import Error from '../ui/Error';

export default function Modal({ open, control }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('');

  const { user: loggedInUser } = useSelector((state) => state.auth) || {};
  const { email: myEmail } = loggedInUser || {};
  const dispatch = useDispatch();
  const [responseError, setResponseError] = useState('');
  const [conversation, setConversation] = useState(undefined);

  const [addTeam, { isSuccess: isAddTeamSuccess }] = useAddTeamMutation();

  // listen conversation add success
  useEffect(() => {
    if (isAddTeamSuccess) {
      control();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAddTeamSuccess]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // add  team
    addTeam({
      members: loggedInUser.email,
      creator: loggedInUser,
      creatorEmail: loggedInUser.email,
      title,
      description,
      color,
      timestamp: new Date(),
    });
    resetForm();
  };
  const resetForm = () => {
    setTitle('');
    setDescription('');
    setColor('');
  };
  return (
    open && (
      <>
        <div
          onClick={control}
          className="fixed w-full h-full inset-0 z-10 bg-black/50 cursor-pointer"
        ></div>
        <div className="rounded w-[400px] lg:w-[600px] space-y-8 bg-white p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Add Team
          </h2>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="to" className="sr-only">
                  To
                </label>
                <input
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                  placeholder="Team Name"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <input
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                  placeholder="Any Color Name or HashCode"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                />
              </div>
              <div>
                <textarea
                  id="description"
                  name="description"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
              >
                Add Team
              </button>
            </div>

            {responseError && <Error message={responseError} />}
          </form>
        </div>
      </>
    )
  );
}
