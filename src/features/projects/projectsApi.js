import { apiSlice } from '../api/apiSlice';
export const projectsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProject: builder.query({
      query: (email) => `/projects?teammembers_like=${email}`,
      providesTags: ['projects'],
    }),
    updateColumn: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/projects/${id}`,
          method: 'PATCH',
          body: data,
        };
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData(
            'getProject',
            arg.data.userEmail,
            (draft) => {
              const draftProject = draft.find((c) => c.id == arg.id);
              draftProject.column = arg.data.column;
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    addProjects: builder.mutation({
      query: (data) => ({
        url: '/projects',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          dispatch(
            apiSlice.util.updateQueryData(
              'getProject',
              data.creator.email,
              (draft) => {
                draft.push(data);
              }
            )
          );
        } catch {}
      },
    }),
    deleteProject: builder.mutation({
      query: (id) => ({
        url: `/projects/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['projects'],
    }),
  }),
});
export const {
  useGetProjectQuery,
  useUpdateColumnMutation,
  useAddProjectsMutation,
  useDeleteProjectMutation,
} = projectsApi;
