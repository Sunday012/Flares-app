export const createProjectMutation = `
	mutation CreateProject($input: ProjectCreateInput!) {
		projectCreate(input: $input) {
			project {
				id
				title
				description
				createdBy {
					email
					name
				}
			}
		}
	}
`;

export const updateProjectMutation = `
	mutation UpdateProject($id: ID!, $input: ProjectUpdateInput!) {
		projectUpdate(by: { id: $id }, input: $input) {
			project {
				id
				title
				description
				createdBy {
					email
					name
				}
			}
		}
	}
`;

export const deleteProjectMutation = `
  mutation DeleteProject($id: ID!) {
    projectDelete(by: { id: $id }) {
      deletedId
    }
  }
`;
      
export const createUserMutation = `
	mutation CreateUser($input: UserCreateInput!) {
		userCreate(input: $input) {
			user {
				name
				email
				avatarUrl
				description
				gitHubUrl
				linkedInUrl
				id
			}
		}
	}
`;

export const projectsQuery = `
  query getProjects( $endCursor: String) {
    projectSearch(first: 8, after: $endCursor) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          title
          gitHubUrl
          description
          liveSiteUrl
          id
          image
          category
          createdBy {
            id
            email
            name
            avatarUrl
          }
        }
      }
    }
  }
`;
export const projectQuery = `
  query getProjects( $endCursor: String) {
    projectSearch(first: 8, after: $endCursor) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          title
          gitHubUrl
          description
          liveSiteUrl
          id
          image
          category
          createdBy {
            id
            email
            name
            avatarUrl
          }
        }
      }
    }
  }
`;


export const getProjectByIdQuery = `
  query GetProjectById($id: ID!) {
    project(by: { id: $id }) {
      id
      title
      description
      image
      liveSiteUrl
      gitHubUrl
      category
      createdBy {
        id
        name
        email
        avatarUrl
      }
    }
  }
`;

export const getUserQuery = `
  query GetUser($email: String!) {
    user(by: { email: $email }) {
      id
      name
      email
      avatarUrl
      description
      gitHubUrl
      linkedInUrl
    }
  }
`;
      
export const getProjectsOfUserQuery = `
  query getUserProjects($id: ID!, $last: Int = 4) {
    user(by: { id: $id }) {
      id
      name
      email
      description
      avatarUrl
      gitHubUrl
      linkedInUrl
      projects(last: $last) {
        edges {
          node {
            id
            title
            image
          }
        }
      }
    }
  }
`;