// import * as React from 'react';
// import PropTypes from 'prop-types';
// import SwipeableViews from 'react-swipeable-views';
// import { useTheme } from '@mui/material/styles';
// import AppBar from '@mui/material/AppBar';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';
// import FriendList from "../friend_components/friend_list"
// import MyPlayList from '../show_playlist_components/my_playlist';
// import MusicSearch from '../music_search_components/MusicSearch';
// import MatchSearch from '../match_components/match_search';
// import Setting from '../setting_components/setting';
// import Match from '../song_match/Match';
// import { Link } from "react-router-dom";
// import { Button } from '@mui/material';


// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`full-width-tabpanel-${index}`}
//       aria-labelledby={`full-width-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ p: 3 }}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

// function a11yProps(index) {
//   return {
//     id: `full-width-tab-${index}`,
//     'aria-controls': `full-width-tabpanel-${index}`,
//   };
// }

// export default function FullWidthTabs() {
//   const theme = useTheme();
//   const [value, setValue] = React.useState(0);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   const handleChangeIndex = (index) => {
//     setValue(index);
//   };

//   return (
//     <Box sx={{ bgcolor: 'background.paper', width: 500 }}>
//       <AppBar position="static">
//         <Tabs
//           value={value}
//           onChange={handleChange}
//           indicatorColor="secondary"
//           textColor="inherit"
//           variant="fullWidth"
//           aria-label="full width tabs example"
//         >
//           <Tab label="My Song List " {...a11yProps(0)} />
//           <Tab label="My Play List" {...a11yProps(1)} />
//           <Tab label="Music Serch" {...a11yProps(2)} />
//           <Tab label="Match Serch" {...a11yProps(3)} />
//           <Tab label="Match" {...a11yProps(4)} />
//           <Tab label="Setting" {...a11yProps(5)} />
//         </Tabs>
//       </AppBar>
//       <SwipeableViews
//         axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
//         index={value}
//         onChangeIndex={handleChangeIndex}
//       >
//         <TabPanel value={value} index={0} dir={theme.direction}>
          
//           <FriendList/>

//         </TabPanel>
//         <TabPanel value={value} index={1} dir={theme.direction}>
//           <MyPlayList/>
//         </TabPanel>
//         <TabPanel value={value} index={2} dir={theme.direction}>
//           <MusicSearch/>
//         </TabPanel>
//         <TabPanel value={value} index={3} dir={theme.direction}>
//           <MatchSearch/>
//         </TabPanel>
//         <TabPanel value={value} index={4} dir={theme.direction}>
//           <Match/>
//         </TabPanel>
//         <TabPanel value={value} index={5} dir={theme.direction}>
//         <Setting/>
//         </TabPanel>
//       </SwipeableViews>
//     </Box>




// );
// }