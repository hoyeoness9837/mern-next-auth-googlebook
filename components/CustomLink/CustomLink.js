import { Link as MuiLink } from '@mui/material';
import { forwardRef } from 'react';

const CustomLink = forwardRef(({ onClick, href, name }, ref) => {
  return (
    <>
      <MuiLink href={href} onClick={onClick} ref={ref} target='_blank'>
        {name}
      </MuiLink>
    </>
  );
});

export default CustomLink;
