import { Box, Input } from '@mui/material';
import { getPackageJSONObject } from 'apis/packages';
import { bounce } from 'constants/animations';
import type { ChangeEvent, KeyboardEvent } from 'react';
import { useState } from 'react';
import type { PackageJSONType } from 'types/packageJson';
import { allIconNames } from 'utils/allIconInfo';
import { extractDependencies, refineSkills } from 'utils/extractStacks';
import { getPackageJSONFromRepository } from 'utils/resultUrl';

interface ReadRepositoryProps {
  stackHandler: (p: string[]) => void;
  inputPopupHandler: (b: boolean) => void;
}

const ReadRepository = ({ stackHandler, inputPopupHandler }: ReadRepositoryProps) => {
  const [address, setAddress] = useState('');

  const updateAddress = (e: ChangeEvent<HTMLInputElement>) => {
    setAddress(e.currentTarget.value);
  };

  const filterExistingStacks = (data: PackageJSONType) => {
    const stacksFromPackage = refineSkills(extractDependencies(data));
    const iconNames: Set<string> = allIconNames();

    return new Set(
      [...stacksFromPackage].filter((el) => iconNames.has(el.replaceAll('-', '').toLowerCase())),
    );
  };

  const setStacks = (stacks: Set<string>) => {
    const ret: string[] = [];

    stacks.forEach((stk) => {
      ret.push(stk.substring(0, 1).toUpperCase() + stk.substring(1, stk.length));
    });

    stackHandler([...ret]);
  };

  const getStacks = async (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      inputPopupHandler(true);

      const packageJSONPath = getPackageJSONFromRepository(address);

      try {
        const response = await getPackageJSONObject(packageJSONPath);

        if (response.status === 200) {
          const extractedStacks = filterExistingStacks(response.data);

          const stackSlugs = new Set<string>();
          extractedStacks.forEach((el) => {
            stackSlugs.add(el.replaceAll('-', '').toLowerCase());
          });

          setStacks(stackSlugs);
        }
      } catch (e) {
        alert(e);
        inputPopupHandler(false);
      }

      setTimeout(() => {
        inputPopupHandler(false);
      }, 2500);
    }
  };

  return (
    <Box
      width={'330px'}
      height={'50px'}
      display={'flex'}
      alignItems={'center'}
      bgcolor={'p.6'}
      borderRadius={3}
      pl={2}
      pr={2}
      zIndex={5}
      sx={{
        transform: 'translateY(70px) translateX(280px)',
        animation: `${bounce} 1s`,
        '::before': {
          /* eslint-disable-next-line */
          content: "''",
          position: 'absolute',
          top: '-20px',
          left: '50%',
          marginTop: '-20px',
          borderTop: '20px solid transparent',
          borderRight: '20px solid transparent',
          borderBottom: '20px solid #e6f0ff',
          borderLeft: '20px solid transparent',
        },
      }}
    >
      <Input
        autoFocus
        fullWidth
        placeholder='input repository here'
        onClick={(e) => e.stopPropagation()}
        onChange={updateAddress}
        onKeyUp={getStacks}
        disableUnderline
      />
    </Box>
  );
};

export default ReadRepository;
