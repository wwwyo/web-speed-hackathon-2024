import type { ComponentPropsWithoutRef, FC } from 'react';

type Props = ComponentPropsWithoutRef<'svg'>;
export const NavigationNext: FC<Props> = (props) => {
  return (
    <svg
      enableBackground="new 0 0 24 24"
      fill="currentColor"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g>
        <path d="M0,0h24v24H0V0z" fill="none" />
      </g>
      <g>
        <polygon points="6.23,20.23 8,22 18,12 8,2 6.23,3.77 14.46,12" />
      </g>
    </svg>
  );
};
