import { GITHUB_LINK } from 'constants/constants';

export const makeUrlIntoBracket = (url: string) => {
  return `[![stackticon](${url})](${GITHUB_LINK})`;
};

export const makeUrlIntoImgTag = (url: string) => {
  return `<a href="${GITHUB_LINK}"><img src="${url}" alt="stackticon" /></a>`;
};

export const getPackageJSONFromRepository = (url: string) => {
  const PREFIX = 'https://raw.githubusercontent.com/';
  const SUFFIX = '/package.json';

  const modifyURL = (originalURL: string, segmentAfterHEAD: string) => {
    const treeRegex = /\/tree\/[^/]+/;
    const hasTree = originalURL.match(treeRegex);

    if (!hasTree) {
      return originalURL.endsWith('/') ? `${originalURL.slice(0, -1)}/HEAD` : `${originalURL}/HEAD`;
    }

    if (originalURL.endsWith('/')) originalURL = originalURL.slice(0, -1);

    const modifiedURL = originalURL.replace(treeRegex, '/HEAD');

    if (segmentAfterHEAD) {
      const segmentRegex = /\/[^/]+/;
      return modifiedURL.replace(segmentRegex, `/${segmentAfterHEAD}`);
    }

    return modifiedURL;
  };

  let repositoryLocation = url.replace('https://github.com/', '');
  repositoryLocation = modifyURL(repositoryLocation, '');

  return PREFIX + repositoryLocation + SUFFIX;
};
