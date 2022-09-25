import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTeams } from '../features/teams/teamsSlice';

export default function useTeamCheck() {
  const dispatch = useDispatch();
  const [isTeams, setIsTeams] = useState(false);

  useEffect(() => {
    const localTeams = localStorage?.getItem('teams');

    if (localTeams) {
      const data = JSON.parse(localTeams);
      if (data.teams) {
        dispatch(
          addTeams({
            teams: data.teams,
          })
        );
      }
    }
    setIsTeams(true);
  }, [dispatch, setIsTeams]);

  return isTeams;
}
