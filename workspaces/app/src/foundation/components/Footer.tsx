import { useSetAtom } from 'jotai';
import React, { useId } from 'react';
import styled from 'styled-components';

import { DialogContentAtom } from '../atoms/DialogContentAtom';
import { COMPANY } from '../constants/Company';
import { CONTACT } from '../constants/Contact';
import { OVERVIEW } from '../constants/Overview';
import { QUESTION } from '../constants/Question';
import { TERM } from '../constants/Term';
import { Color, Space, Typography } from '../styles/variables';

import { Box } from './Box';
import { Button } from './Button';
import { Flex } from './Flex';
import { Spacer } from './Spacer';
import { Text } from './Text';

const _Button = styled(Button)`
  color: ${Color.MONO_A};
`;

const _Content = styled.section`
  white-space: pre-line;
`;

export const Footer: React.FC = () => {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const termDialogA11yId = useId();
  const contactDialogA11yId = useId();
  const questionDialogA11yId = useId();
  const companyDialogA11yId = useId();
  const overviewDialogA11yId = useId();

  const updateDialogContent = useSetAtom(DialogContentAtom);

  const handleRequestToTermDialogOpen = () => {
    updateDialogContent(
      <_Content aria-labelledby={termDialogA11yId} role="dialog">
        <Text as="h2" color={Color.MONO_100} id={termDialogA11yId} typography={Typography.NORMAL16}>
          利用規約
        </Text>
        <Spacer height={Space * 1} />
        <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL12}>
          {TERM}
        </Text>
      </_Content>,
    );
  };

  const handleRequestToContactDialogOpen = () => {
    updateDialogContent(
      <_Content aria-labelledby={contactDialogA11yId} role="dialog">
        <Text as="h2" color={Color.MONO_100} id={contactDialogA11yId} typography={Typography.NORMAL16}>
          お問い合わせ
        </Text>
        <Spacer height={Space * 1} />
        <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL12}>
          {CONTACT}
        </Text>
      </_Content>,
    );
  };

  const handleRequestToQuestionDialogOpen = () => {
    updateDialogContent(
      <_Content aria-labelledby={questionDialogA11yId} role="dialog">
        <Text as="h2" color={Color.MONO_100} id={questionDialogA11yId} typography={Typography.NORMAL16}>
          Q&A
        </Text>
        <Spacer height={Space * 1} />
        <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL12}>
          {QUESTION}
        </Text>
      </_Content>,
    );
  };

  const handleRequestToCompanyDialogOpen = () => {
    updateDialogContent(
      <_Content aria-labelledby={companyDialogA11yId} role="dialog">
        <Text as="h2" color={Color.MONO_100} id={companyDialogA11yId} typography={Typography.NORMAL16}>
          運営会社
        </Text>
        <Spacer height={Space * 1} />
        <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL12}>
          {COMPANY}
        </Text>
      </_Content>,
    );
  };

  const handleRequestToOverviewDialogOpen = () => {
    updateDialogContent(
      <_Content aria-labelledby={overviewDialogA11yId} role="dialog">
        <Text as="h2" color={Color.MONO_100} id={overviewDialogA11yId} typography={Typography.NORMAL16}>
          Cyber TOONとは
        </Text>
        <Spacer height={Space * 1} />
        <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL12}>
          {OVERVIEW}
        </Text>
      </_Content>,
    );
  };

  return (
    <Box as="footer" backgroundColor={Color.Background} p={Space * 1}>
      <Flex align="flex-start" direction="column" gap={Space * 1} justify="flex-start">
        {/* logo -> */}
        <svg fill="none" height="45" viewBox="0 0 63 15" width="189" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M34.3 3.324h3.756c.128 0 .232.044.312.132.08.088.12.204.12.348V12h-1.26c-.272 0-.452-.044-.54-.132-.08-.088-.12-.272-.12-.552V4.824h-1.92c-.232 0-.348-.192-.348-.576v-.924Zm4.668 0h1.92c.232 0 .348.192.348.576v.924h-2.268v-1.5ZM54.441 3.691c.352.063.641.106.868.13.226.023.41.042.55.058.164.016.293.02.387.012H57.066c.196-.008.438-.012.727-.012.164.383.313.734.445 1.055.14.32.258.593.352.82.11.273.21.52.304.738.11.274.227.574.352.903.125.328.238.636.34.925l.27.715c.07.188.105.274.105.258l.012-.234c.008-.157.015-.348.023-.575.008-.234.016-.488.023-.761.016-.282.024-.551.024-.809.008-.266.012-.508.012-.726 0-.22-.008-.383-.024-.493a2.278 2.278 0 0 0-.14-.457 6.292 6.292 0 0 0-.715-1.242c.32.008.582.012.785.012h.492c.14 0 .25-.004.328-.012.102 0 .227-.008.375-.023.133-.016.297-.028.492-.035l.75-.06a2.962 2.962 0 0 0-.41.446c-.101.14-.183.266-.246.375-.07.125-.117.242-.14.352-.032.14-.059.37-.082.691-.016.313-.036.664-.06 1.055l-.046 1.219c-.016.421-.031.808-.047 1.16 0 .265-.008.55-.023.855-.016.258-.032.551-.047.88-.016.32-.035.644-.059.972l-1.043.023c-.304-.539-.562-1-.773-1.383-.203-.39-.371-.71-.504-.96-.148-.29-.273-.532-.375-.727a7.696 7.696 0 0 0-.34-.645 42.694 42.694 0 0 0-.445-.75 30.844 30.844 0 0 0-.621-1.02c-.024.54-.035 1-.035 1.384.007.375.02.687.035.937.023.29.05.531.082.727.039.187.093.398.164.633.062.203.136.441.222.714.094.274.208.582.34.926-.46-.023-.804-.035-1.03-.035h-.352c-.11 0-.258.012-.446.035l-.644.07c-.266.032-.598.075-.996.13.187-.227.336-.434.445-.622.117-.195.207-.36.27-.492.078-.156.132-.293.163-.41a4.67 4.67 0 0 0 .047-.645c.008-.312.008-.664 0-1.054 0-.399-.008-.817-.023-1.254-.008-.438-.02-.844-.035-1.219a21.387 21.387 0 0 0-.059-.96c-.015-.266-.027-.43-.035-.493a1.151 1.151 0 0 0-.14-.328 3.275 3.275 0 0 0-.247-.34 3.062 3.062 0 0 0-.422-.434Z"
            fill="#fff"
          />
          <path
            d="M46.5 8c0 1.007-.307 1.9-.779 2.528-.471.63-1.085.972-1.721.972-.636 0-1.25-.342-1.721-.972C41.807 9.9 41.5 9.007 41.5 8c0-1.007.307-1.9.779-2.528.471-.63 1.085-.972 1.721-.972.636 0 1.25.342 1.721.972.472.629.779 1.521.779 2.528Z"
            fill="#D8D8D8"
            stroke="#fff"
          />
          <circle cx="43.1" cy="7.3" fill="#1E1E1E" r="1" />
          <path
            d="M53.5 8c0 1.007-.307 1.9-.779 2.528-.471.63-1.085.972-1.721.972-.636 0-1.25-.342-1.721-.972C48.807 9.9 48.5 9.007 48.5 8c0-1.007.307-1.9.779-2.528.471-.63 1.085-.972 1.721-.972.636 0 1.25.342 1.721.972.472.629.779 1.521.779 2.528Z"
            fill="#D8D8D8"
            stroke="#fff"
          />
          <circle cx="50.1" cy="7.3" fill="#1E1E1E" r="1" />
          <path
            d="M5.953 5.027a1.923 1.923 0 0 0-.574-.457 1.706 1.706 0 0 0-.656-.175v-1.16c.875.038 1.609.347 2.203.925l-.973.867Zm-1.23 5.871a1.869 1.869 0 0 0 1.23-.632l.973.855c-.297.29-.63.512-.996.668-.367.156-.77.246-1.207.27v-1.16ZM.926 7.641c0-.696.082-1.309.246-1.84.172-.531.406-.98.703-1.348a3.207 3.207 0 0 1 1.043-.855 3.587 3.587 0 0 1 1.324-.364v1.172c-.258.04-.5.13-.726.27a1.851 1.851 0 0 0-.598.586c-.172.258-.309.586-.41.984a6.502 6.502 0 0 0 0 2.8c.101.392.238.72.41.985.172.266.371.469.598.61.234.14.476.226.726.257v1.149a3.433 3.433 0 0 1-1.324-.352 3.206 3.206 0 0 1-1.043-.855 4.151 4.151 0 0 1-.703-1.348C1.008 8.953.926 8.336.926 7.641Z"
            fill="#fff"
          />
          <rect fill="#fff" height="5" rx=".5" transform="matrix(-1 0 0 1 11.4 7)" width="1" />
          <path
            d="M10.182 4.768c.976.976 1.451 2.084 1.06 2.475-.39.39-1.498-.085-2.474-1.061-.977-.976-1.451-2.084-1.06-2.475.39-.39 1.498.084 2.474 1.06Z"
            fill="#fff"
          />
          <path
            d="M13.182 6.182c-.976.976-2.084 1.451-2.475 1.06-.39-.39.084-1.498 1.06-2.474.977-.977 2.085-1.451 2.476-1.06.39.39-.085 1.498-1.061 2.474Z"
            fill="#5CD376"
          />
          <path
            d="M16.75 6.264c.39-.2.781-.3 1.172-.3.394 0 .713.046.955.136.242.086.45.213.621.38.36.356.54.864.54 1.524 0 1.305-.343 2.316-1.026 3.035-.614.64-1.38.961-2.297.961H15.12l.111-.27a2.77 2.77 0 0 0 .206-.878c.019-.305.033-.582.04-.832.012-.254.022-.528.03-.82.02-.528.03-1.046.03-1.554a82.315 82.315 0 0 0-.018-1.916c-.024-.93-.063-1.494-.118-1.693a2.185 2.185 0 0 0-.152-.451 1.66 1.66 0 0 0-.164-.281l-.2-.27h2.14c-.145.516-.237 1.592-.276 3.229Zm.006 1.54-.018 2.157c0 .754.02 1.283.059 1.588.535-.117.965-.475 1.289-1.072.324-.59.486-1.317.486-2.18 0-.535-.04-.91-.123-1.125-.078-.219-.174-.377-.287-.475a.577.577 0 0 0-.398-.146.946.946 0 0 0-.405.082.914.914 0 0 0-.31.24c-.195.23-.293.541-.293.932Zm8.619 2.204c.14.094.21.258.21.492 0 .23-.03.434-.093.61-.062.175-.172.34-.328.492-.352.343-.887.515-1.605.515-.836 0-1.473-.308-1.91-.926-.387-.55-.58-1.295-.58-2.232 0-.945.261-1.688.785-2.227.496-.511 1.168-.767 2.015-.767.59 0 1.05.172 1.383.515.262.274.393.59.393.95 0 .355-.07.677-.211.966-.137.286-.34.532-.61.739-.555.43-1.33.656-2.326.68.082.785.328 1.31.738 1.576.149.093.346.14.592.14s.508-.129.785-.386c.278-.258.532-.637.762-1.137Zm-2.912-.75c1.234-.082 1.851-.68 1.851-1.793 0-.418-.125-.7-.375-.844a.71.71 0 0 0-.34-.07.833.833 0 0 0-.427.129c-.14.086-.264.226-.37.422-.226.425-.34 1.084-.34 1.974v.182ZM27.016 12c.18-.617.27-1.678.27-3.182 0-1.07-.087-1.8-.259-2.191a2.204 2.204 0 0 0-.375-.545h2.08c-.07.246-.127.584-.17 1.014.368-.461.88-.787 1.536-.979.28-.082.486-.21.615-.387.129.31.193.575.193.797 0 .223-.011.43-.035.621a4.275 4.275 0 0 1-.105.551c-.102.387-.237.688-.405.903-.144-.762-.369-1.207-.674-1.336-.351-.153-.695.054-1.03.62-.071.118-.13.243-.177.376a6.35 6.35 0 0 0-.005.275v.281c0 1.504.09 2.565.27 3.182h-1.73Z"
            fill="#fff"
          />
        </svg>
        {/* <- logo */}
        <Flex align="start" direction="row" gap={Space * 1.5} justify="center">
          <_Button disabled={!isClient} onClick={handleRequestToTermDialogOpen}>
            利用規約
          </_Button>
          <_Button disabled={!isClient} onClick={handleRequestToContactDialogOpen}>
            お問い合わせ
          </_Button>
          <_Button disabled={!isClient} onClick={handleRequestToQuestionDialogOpen}>
            Q&A
          </_Button>
          <_Button disabled={!isClient} onClick={handleRequestToCompanyDialogOpen}>
            運営会社
          </_Button>
          <_Button disabled={!isClient} onClick={handleRequestToOverviewDialogOpen}>
            Cyber TOONとは
          </_Button>
        </Flex>
      </Flex>
    </Box>
  );
};
