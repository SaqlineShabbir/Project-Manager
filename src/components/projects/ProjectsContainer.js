import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Search from '../Search';
import Navigation from '../ui/Navigation';

export default function ProjectsContainer({ children, content }) {
  const { user: loggedInUser } = useSelector((state) => state.auth) || {};

  console.log(loggedInUser.photoUrl);
  return (
    <>
      <div className="flex flex-col  h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
        <Navigation projects />
        <div class="flex items-center flex-shrink-0 w-full h-16 px-10 bg-white bg-opacity-75">
          {/* search components */}
          <Search />
          <div class="ml-10">
            <Link
              class="mx-2 text-sm font-semibold text-indigo-700"
              to="/projects"
            >
              Projects
            </Link>
            <Link
              class="mx-2 text-sm font-semibold text-gray-600 hover:text-indigo-700"
              to="/teams"
            >
              Teams
            </Link>
          </div>
          <div class="flex items-center justify-center w-8 h-8 ml-auto overflow-hidden rounded-full cursor-pointer">
            <img src={loggedInUser?.photoUrl} alt="" />
          </div>
        </div>
        <div className="px-10 mt-6">
          <h1 className="text-2xl font-bold">Project Board</h1>
        </div>
        {content}
        <div className="flex flex-grow px-10 mt-4 space-x-6 overflow-auto">
          {children}
        </div>
      </div>
    </>
  );
}
