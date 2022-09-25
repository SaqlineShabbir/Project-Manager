import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import plusImg from '../../assets/images/plus.PNG';
import { useEditTeamMutation } from '../../features/teams/teamsApi';
import { useGetUserQuery } from '../../features/users/usersApi';
import isValidEmail from '../../utils/isValidEmail';
import Error from '../ui/Error';
const Team = ({ team }) => {
  const { title, description, color, timestamp, members, id } = team;

  const [textBox, setTextBox] = useState(false);

  //EveryThing about add member
  const [userCheck, setUserCheck] = useState(false);
  const [to, setTo] = useState('');
  const [responseError, setResponseError] = useState('');
  const { data: participant } = useGetUserQuery(to, {
    skip: !userCheck,
  });

  const { user: loggedInUser } = useSelector((state) => state.auth) || {};
  const { email: myEmail } = loggedInUser || {};
  const [editTeam, { isSuccess: isEditTeamSuccess }] = useEditTeamMutation();

  const debounceHandler = (fn, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };

  const doSearch = (value) => {
    if (isValidEmail(value)) {
      // check user API
      setUserCheck(true);
      setTo(value);
    }
  };
  const handleSearch = debounceHandler(doSearch, 500);

  const handleSubmit = (e) => {
    if (e.key === 'Enter') {
      if (participant?.length > 0 && myEmail === to) {
        setResponseError('You already in the Team');
      } else if (members.includes(to)) {
        setResponseError('already exist');
      } else {
        editTeam({
          id: id,
          data: { members: members + '-' + to },
        });
      }
    }
  };
  const handelReset = () => {
    setTextBox(false);
    setResponseError('');
  };
  //EveryThing about add member
  return (
    <div
      class="relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100"
      draggable="true"
    >
      <button class="absolute top-0 right-0 flex items-center justify-center hidden w-5 h-5 mt-3 mr-2 text-gray-500 rounded hover:bg-gray-200 hover:text-gray-700 group-hover:flex">
        <svg
          class="w-4 h-4 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          onClick={() => setTextBox(true)}
        >
          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
        </svg>
      </button>
      <div className="flex justify-end">
        <span
          style={{ backgroundColor: `${color}` }}
          class={`flex items-center h-6 px-3 text-xs font-semibold  rounded-full`}
        >
          {title}
        </span>
        {textBox && (
          <input
            id="to"
            name="to"
            type="email"
            required
            placeholder="Add Team Member"
            className="h-7  mx-5"
            onBlur={handelReset}
            onChange={(e) => handleSearch(e.target.value)}
            onKeyDown={handleSubmit}
          />
        )}
      </div>
      {textBox && (
        <span className="ml-[90px]">
          {participant?.length === 0 && (
            <Error message="This user does not exist!" />
          )}

          {participant?.length > 0 && participant[0].email === myEmail && (
            <Error message="You can not add yourself!" />
          )}
          {responseError && <Error message={responseError} />}
        </span>
      )}
      <h4 class="mt-3 text-sm font-medium">{description}</h4>
      <div class="flex items-center w-full mt-3 text-xs font-medium text-gray-400">
        <div class="flex items-center ">
          <svg
            class="w-4 h-4 text-gray-300 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clip-rule="evenodd"
            />
          </svg>
          <span class="ml-1 leading-none">{timestamp.slice(0, 10)}</span>
        </div>

        <img
          class="w-6 h-6 ml-auto rounded-full"
          src={team?.creator?.photoUrl}
          alt=""
        />
        {team?.members?.length > 23 && (
          <img class="w-6 h-6  pr-[5px] rounded-full" src={plusImg} alt="" />
        )}
      </div>
    </div>
  );
};

export default Team;
