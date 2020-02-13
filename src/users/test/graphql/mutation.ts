export const CREATE_USER = `
  mutation createUser ($input: CreateUserDto!) {
    response: createUser (input: $input) {
      code
      success
      message
      data {
        id
        name
        email
      }
    }
  }
`;

export const VERIFY_USER = `
  mutation verifyUser ($id: String!) {
    response: verifyUser (id: $id) {
      code
      success
      message
      data {
        id
        name
        email
        isVerified
      }
    }
  }
`;
