import React, { useState } from 'react';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import FeaturedProducts from './FeaturedProducts';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}


function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

const ProductTabs: React.FC = () => {
    const [value, setValue] = useState(0);

    const handleChange = (_: React.ChangeEvent<unknown>, newValue: number) => {
      setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }} className="mt-20 mb-20">
      <Box >
        <Tabs value={value} onChange={handleChange} aria-label="product details tabs" centered>
          <Tab label="Featured" />
          <Tab label="Latest" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {/* Content for Description Tab */}
        <FeaturedProducts />
      </TabPanel>
      <TabPanel value={value} index={1}>
        {/* Content for Additional Information Tab */}
        <FeaturedProducts />
      </TabPanel>
    </Box>
  );
};

export default ProductTabs;
