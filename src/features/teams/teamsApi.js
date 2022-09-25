import { apiSlice } from '../api/apiSlice';
import { addTeams } from './teamsSlice';

export const teamsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTeams: builder.query({
      query: (email) => `/teams?members_like=${email}`,

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          localStorage.setItem(
            'teams',
            JSON.stringify({
              teams: result.data,
            })
          );
          dispatch(
            addTeams({
              teams: result.data,
            })
          );
        } catch (err) {
          // do nothing
        }
      },

      providesTags: ['teams'],
    }),

    addTeam: builder.mutation({
      query: (data) => ({
        url: '/teams',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(
            apiSlice.util.updateQueryData(
              'getTeams',
              data.creator.email,
              (draft) => {
                draft.push(data);
              }
            )
          );
        } catch {}
      },
      // invalidatesTags: ['teams'],
    }),
    editTeam: builder.mutation({
      query: ({ id, data }) => ({
        url: `/teams/${id}`,
        method: 'PATCH',
        body: data,
      }),

      invalidatesTags: ['teams'],
    }),
  }),
});

export const { useAddTeamMutation, useGetTeamsQuery, useEditTeamMutation } =
  teamsApi;
