export default {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: {
    "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/test/__mocks__/fileMock.js",
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    "^@(components|assets|styles|contexts|hooks|utils)/(.+)$":
      "<rootDir>/src/$1/$2",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};
