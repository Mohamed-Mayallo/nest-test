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
