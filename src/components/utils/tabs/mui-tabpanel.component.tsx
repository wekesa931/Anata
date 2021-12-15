import { styled } from '@mui/material/styles'
import TabPanel from '@mui/lab/TabPanel'

const CustomizedTab = styled(TabPanel)`
  flex-grow: 0;
  font-family: 'Rubik';
  font-size: 14px;
  font-weight: 500;
  line-height: 1.29;
  letter-spacing: -0.28px;
  text-align: left;
  padding-left: 0;
  color: var(--dark-blue-50);
  text-transform: capitalize;
`

export default CustomizedTab
