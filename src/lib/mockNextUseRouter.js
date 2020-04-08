/* eslint-env jest */

// Mocks useRouter
const useRouter = jest.spyOn(require("next/router"), "useRouter");

/**
 * mockNextUseRouter
 * Mocks the useRouter React hook from Next.js on a test-case by test-case basis
 */
export default function mockNextUseRouter({ route, pathname, query, asPath }) {
  useRouter.mockImplementation(() => ({
    route,
    pathname,
    query,
    asPath,
  }));
}
