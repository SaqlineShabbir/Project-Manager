import React, { useState } from 'react';

import Modal from '../components/teams/addTeamModal';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import logoImg from '../assets/images/logo.svg';
import Team from '../components/teams/Team';
import Error from '../components/ui/Error';
import Navigation from '../components/ui/Navigation';
import { useGetTeamsQuery } from '../features/teams/teamsApi';

const Teams = () => {
  const [opened, setOpened] = useState(false);

  const { user: loggedInUser } = useSelector((state) => state.auth) || {};
  const controlModal = () => {
    setOpened((prevState) => !prevState);
  };

  const {
    data: teams,
    isLoading,
    isError,
    error,
  } = useGetTeamsQuery(loggedInUser.email);

  //decide what to rander
  let content;
  if (isLoading) {
    content = <li className="m-2 text-center">Loading</li>;
  } else if (!isLoading && isError) {
    content = (
      <li className="m-2 text-center">
        <Error message={error?.data} />
      </li>
    );
  } else if (!isLoading && !isError && teams?.length === 0) {
    content = (
      <p className="m-2 text-center text-red-600">No Teams Found Please Add</p>
    );
  } else if (!isLoading && !isError && teams?.length > 0) {
    content = teams.map((team) => (
      <>
        <Team key={team.id} team={team} />
      </>
    ));
  }
  return (
    <>
      <Navigation />
      {/* <!-- Component Start --> */}
      <div class="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
        <div class="flex items-center flex-shrink-0 w-full h-16 px-10 bg-white bg-opacity-75">
          <img src={logoImg} class="h-10 w-10" />
          <div class="ml-10">
            <Link
              class="mx-2 text-sm font-semibold  text-indigo-700"
              to="/teams"
            >
              Teams
            </Link>
            <Link
              class=" mx-2 text-sm font-semibold text-gray-600 hover:text-indigo-700"
              to="/projects"
            >
              Projects
            </Link>
          </div>
          <buton class="flex items-center justify-center w-8 h-8 ml-auto overflow-hidden rounded-full cursor-pointer">
            <img src={loggedInUser.photoUrl} alt="" />
          </buton>
        </div>
        <div class="px-10 mt-6 flex justify-between">
          <h1 class="text-2xl font-bold">Teams</h1>
          <button class="flex items-center justify-center w-6 h-6 ml-auto text-indigo-500 rounded hover:bg-indigo-500 hover:text-indigo-100">
            <svg
              class="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              onClick={controlModal}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
            </svg>
          </button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 px-10 mt-4 gap-6 overflow-auto">
          {/* // */}

          {content}
        </div>
        <Modal open={opened} control={controlModal} />
      </div>
    </>
  );
};

export default Teams;
