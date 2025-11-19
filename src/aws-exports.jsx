const awsconfig = {
  Auth: {
    Cognito: {
      region: "us-east-1", // must match userPoolId
      userPoolId: "us-east-1_20mEvUZEU",
      userPoolClientId: "6f5niv632fsmn1lvkh2eju3ee5",
      loginWith: {
        email: true,
        name: true,
        phone: true,
        address: true,
      },
    }
  },
};

export default awsconfig;
